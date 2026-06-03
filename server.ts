import express from "express";
import path from "path";
import fs from "fs";
import https from "https";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded parsers with large limit for image uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Firebase Auth Proxy for seamless custom domain authentication without third-party cookie blocks
  app.all("/__/auth/*", (req, res) => {
    const targetUrl = `https://strange-abacus-cv8b6.firebaseapp.com${req.originalUrl}`;
    
    // Forward headers, but rewrite host to match the Firebase app target domain
    const headers = { ...req.headers };
    headers.host = "strange-abacus-cv8b6.firebaseapp.com";
    
    // Remove connection header to let Node manage connection pooling
    delete headers.connection;

    const proxyReq = https.request(
      targetUrl,
      {
        method: req.method,
        headers: headers,
      },
      (proxyRes) => {
        // Forward response status and original headers back to client
        res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    );

    proxyReq.on("error", (err) => {
      console.error("Firebase Auth Proxy connection error:", err);
      res.status(500).send("Firebase Auth Proxy Connection Failed");
    });

    // Pipe client's original request body (if any) directly to the proxy request
    req.pipe(proxyReq, { end: true });
  });

  // API endpoint for uploading partner logo
  app.post("/api/upload-logo", async (req, res) => {
    try {
      const { filename, base64 } = req.body;
      if (!filename || !base64) {
        return res.status(400).json({ error: "Missing filename or base64 data" });
      }

      // Extract raw base64 data (strip data:image/png;base64, etc.)
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');

      // Sanitize filename to contain purely alphanumeric, dots, hyphens, and underscores (prevent directory traversal)
      const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_\-\.]/g, "_");

      // Set target paths:
      // 1. src/assets/images/ (as requested by user)
      // 2. public/images/ (for reliable runtime static serving)
      const srcImagesDir = path.join(process.cwd(), "src", "assets", "images");
      const publicImagesDir = path.join(process.cwd(), "public", "images");

      // Verify directories exist
      fs.mkdirSync(srcImagesDir, { recursive: true });
      fs.mkdirSync(publicImagesDir, { recursive: true });

      const srcFilePath = path.join(srcImagesDir, sanitizedFilename);
      const publicFilePath = path.join(publicImagesDir, sanitizedFilename);

      // Write files
      fs.writeFileSync(srcFilePath, buffer);
      fs.writeFileSync(publicFilePath, buffer);

      console.log(`Saved file to ${srcFilePath} and ${publicFilePath}`);

      // Return the public URL path
      return res.json({ 
        success: true, 
        url: `/images/${sanitizedFilename}` 
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  // Serve static public images folder directly
  app.use("/images", express.static(path.join(process.cwd(), "public", "images")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
