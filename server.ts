import express from "express";
import path from "path";
import fs from "fs";
import https from "https";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  collection, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON and URL-encoded parsers with large limit for image uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Native CORS logic to support cross-origin logins from custom domains like nightvolt.ru or verification frames
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      // Allow nightvolt.ru, its subdomains, Cloud Run links, and local testing origins
      if (
        origin === "https://nightvolt.ru" ||
        origin.endsWith(".nightvolt.ru") ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.includes("run.app") ||
        origin.includes("aistudio") ||
        origin.includes("webcontainer")
      ) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

    // Handle OPTIONS preflight requests
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Load Firebase Config
  let firebaseConfig: any = {};
  try {
    firebaseConfig = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "firebase-applet-config.json"), "utf8")
    );
  } catch (err) {
    console.error("Failed to load firebase-applet-config.json:", err);
  }

  let adminDb: any = null;
  let initError: string | null = null;

  try {
    const firebaseApp = initializeFirebaseApp(firebaseConfig);
    adminDb = firebaseConfig.firestoreDatabaseId 
      ? getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId)
      : getFirestore(firebaseApp);
    console.log("Successfully connected to Firestore with Web client SDK.");
  } catch (err: any) {
    console.error("Firebase initializing failed:", err);
    initError = err?.message || String(err);
  }

  // Debug status endpoint
  app.get("/api/debug-status", (req, res) => {
    res.json({
      initialized: !!adminDb,
      error: initError,
      firebaseConfig: {
        projectId: firebaseConfig.projectId,
        firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
      }
    });
  });

  const AUTHORIZED_EMAILS = [
    "ggg274415@gmail.com", 
    "kajdaila17@gmail.com",
    "ilakajda45@gmail.com",
    "nightvolt@internet.ru"
  ];

  // Helper function to hash passwords safely
  function hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  // Authentication middleware for custom Express endpoints
  const authenticateSession = async (req: any, res: any, next: any) => {
    try {
      if (!adminDb) {
        return res.status(500).json({ error: "Server database not available" });
      }
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Missing administrative token" });
      }
      const token = authHeader.split("Bearer ")[1];
      
      // Fetch session from Firestore
      const sessionDocRef = doc(adminDb, "admin_sessions", token);
      const sessionDoc = await getDoc(sessionDocRef);
      
      if (!sessionDoc.exists()) {
        return res.status(401).json({ error: "Unauthorized: Invalid administrative session" });
      }
      
      const sessionData = sessionDoc.data();
      if (!sessionData || sessionData.expiresAt < Date.now()) {
        // Clean up expired session asynchronously
        await deleteDoc(sessionDocRef).catch(() => {});
        return res.status(401).json({ error: "Unauthorized: Session expired" });
      }
      
      req.adminEmail = sessionData.email;
      next();
    } catch (err: any) {
      console.error("Auth middleware error:", err);
      res.status(500).json({ error: "Internal Auth Error" });
    }
  };

  // --- Admin Custom Auth API Routes ---

  // Custom Admin Registration
  app.post("/api/admin/register", async (req, res) => {
    try {
      if (!adminDb) {
        return res.status(500).json({ error: "Server database not available" });
      }
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      const cleanEmail = email.toLowerCase().trim();
      if (!AUTHORIZED_EMAILS.includes(cleanEmail)) {
        return res.status(403).json({ 
          error: `Registration is exclusively allowed for official admins: ${AUTHORIZED_EMAILS.join(", ")}` 
        });
      }
      
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      
      const passwordHash = hashPassword(password);
      
      // Check if admin is already registered in the custom database
      const userRef = doc(adminDb, "admins", cleanEmail);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return res.status(400).json({ error: "Admin email already registered. Please sign in instead." });
      }

      // Save user to admins collection
      await setDoc(userRef, {
        email: cleanEmail,
        passwordHash,
        createdAt: serverTimestamp(),
      });
      
      return res.json({ success: true, message: "Registered successfully" });
    } catch (err: any) {
      console.error("Admin registration error:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Custom Admin Login
  app.post("/api/admin/login", async (req, res) => {
    try {
      if (!adminDb) {
        return res.status(500).json({ error: "Server database not available" });
      }
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      const cleanEmail = email.toLowerCase().trim();
      if (!AUTHORIZED_EMAILS.includes(cleanEmail)) {
        return res.status(403).json({ error: "Access denied: Unauthorized email." });
      }
      
      const userRef = doc(adminDb, "admins", cleanEmail);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists) {
        return res.status(401).json({ 
          error: "Account not registered yet. Please click on 'Register' first to set up your password." 
        });
      }
      
      const userData = userDoc.data();
      const inputHash = hashPassword(password);
      
      if (userData?.passwordHash !== inputHash) {
        return res.status(401).json({ error: "Invalid email or password." });
      }
      
      // Create session
      const token = crypto.randomBytes(32).toString("hex");
      const sessionRef = doc(adminDb, "admin_sessions", token);
      
      await setDoc(sessionRef, {
        email: cleanEmail,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days session lifetime
      });
      
      return res.json({ 
        success: true, 
        token, 
        email: cleanEmail 
      });
    } catch (err: any) {
      console.error("Admin login error:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Verify custom token validation
  app.get("/api/admin/me", async (req, res) => {
    try {
      if (!adminDb) {
        return res.json({ authenticated: false });
      }
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({ authenticated: false });
      }
      const token = authHeader.split("Bearer ")[1];
      const sessionDocRef = doc(adminDb, "admin_sessions", token);
      const sessionDoc = await getDoc(sessionDocRef);
      
      if (!sessionDoc.exists()) {
        return res.json({ authenticated: false });
      }
      
      const sessionData = sessionDoc.data();
      if (!sessionData || sessionData.expiresAt < Date.now()) {
        return res.json({ authenticated: false });
      }
      
      return res.json({ authenticated: true, email: sessionData.email });
    } catch (err) {
      return res.json({ authenticated: false });
    }
  });

  // Custom Admin Logout
  app.post("/api/admin/logout", async (req, res) => {
    try {
      if (!adminDb) {
        return res.json({ success: true });
      }
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split("Bearer ")[1];
        await deleteDoc(doc(adminDb, "admin_sessions", token)).catch(() => {});
      }
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
  });

  // --- Submissions Data Endpoints (Protected by custom session) ---
  app.get("/api/admin/submissions", authenticateSession, async (req, res) => {
    try {
      const submissionsSnap = await getDocs(
        query(collection(adminDb, "submissions"), orderBy("createdAt", "desc"))
      );
        
      const results: any[] = [];
      submissionsSnap.forEach((docSnap) => {
        const data = docSnap.data();
        results.push({
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt ? {
            seconds: data.createdAt.seconds || Math.floor(Date.now() / 1000),
            nanoseconds: data.createdAt.nanoseconds || 0
          } : null
        });
      });
      return res.json(results);
    } catch (err: any) {
      console.error("Error retrieving submissions:", err);
      return res.status(500).json({ error: err.message || "Failed retrieving submissions" });
    }
  });

  app.delete("/api/admin/submissions/:id", authenticateSession, async (req, res) => {
    try {
      const { id } = req.params;
      await deleteDoc(doc(adminDb, "submissions", id));
      return res.json({ success: true });
    } catch (err: any) {
      console.error("Error deleting submission:", err);
      return res.status(500).json({ error: err.message || "Failed deleting submission" });
    }
  });

  // --- Partners Data Endpoints (CRUD) ---
  app.get("/api/admin/partners", async (req, res) => {
    try {
      if (!adminDb) {
        return res.json([]);
      }
      const partnersSnap = await getDocs(
        query(collection(adminDb, "partners"), orderBy("createdAt", "desc"))
      );
        
      const results: any[] = [];
      partnersSnap.forEach((docSnap) => {
        const data = docSnap.data();
        results.push({
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt ? {
            seconds: data.createdAt.seconds || Math.floor(Date.now() / 1000),
            nanoseconds: data.createdAt.nanoseconds || 0
          } : null
        });
      });
      return res.json(results);
    } catch (err: any) {
      console.error("Error retrieving partners:", err);
      return res.status(500).json({ error: err.message || "Failed retrieving partners" });
    }
  });

  app.post("/api/admin/partners", authenticateSession, async (req, res) => {
    try {
      const partner = req.body;
      if (!partner.name || !partner.descriptionRu || !partner.descriptionEn) {
        return res.status(400).json({ error: "Name and descriptions are required" });
      }
      
      const docId = partner.id || doc(collection(adminDb, "partners")).id;
      const ref = doc(adminDb, "partners", docId);
      
      await setDoc(ref, {
        id: docId,
        name: partner.name.trim(),
        websiteUrl: partner.websiteUrl?.trim() || "",
        descriptionRu: partner.descriptionRu.trim(),
        descriptionEn: partner.descriptionEn.trim(),
        logoSvg: partner.logoSvg?.trim() || "",
        logoUrl: partner.logoUrl?.trim() || "",
        createdAt: serverTimestamp(),
      });
      
      return res.json({ success: true, id: docId });
    } catch (err: any) {
      console.error("Error saving partner:", err);
      return res.status(500).json({ error: err.message || "Failed saving partner" });
    }
  });

  app.delete("/api/admin/partners/:id", authenticateSession, async (req, res) => {
    try {
      const { id } = req.params;
      await deleteDoc(doc(adminDb, "partners", id));
      return res.json({ success: true });
    } catch (err: any) {
      console.error("Error deleting partner:", err);
      return res.status(500).json({ error: err.message || "Failed deleting partner" });
    }
  });

  // --- Firebase Auth Proxy ---
  app.all("/__/auth/*", (req, res) => {
    const targetUrl = `https://strange-abacus-cv8b6.firebaseapp.com${req.originalUrl}`;
    const headers = { ...req.headers };
    headers.host = "strange-abacus-cv8b6.firebaseapp.com";
    delete headers.connection;

    const proxyReq = https.request(
      targetUrl,
      {
        method: req.method,
        headers: headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    );

    proxyReq.on("error", (err) => {
      console.error("Firebase Auth Proxy connection error:", err);
      res.status(500).send("Firebase Auth Proxy Connection Failed");
    });

    req.pipe(proxyReq, { end: true });
  });

  // --- API endpoint for uploading partner logo ---
  app.post("/api/upload-logo", async (req, res) => {
    try {
      const { filename, base64 } = req.body;
      if (!filename || !base64) {
        return res.status(400).json({ error: "Missing filename or base64 data" });
      }

      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_\-\.]/g, "_");

      const srcImagesDir = path.join(process.cwd(), "src", "assets", "images");
      const publicImagesDir = path.join(process.cwd(), "public", "images");

      fs.mkdirSync(srcImagesDir, { recursive: true });
      fs.mkdirSync(publicImagesDir, { recursive: true });

      const srcFilePath = path.join(srcImagesDir, sanitizedFilename);
      const publicFilePath = path.join(publicImagesDir, sanitizedFilename);

      fs.writeFileSync(srcFilePath, buffer);
      fs.writeFileSync(publicFilePath, buffer);

      return res.json({ 
        success: true, 
        url: `/images/${sanitizedFilename}` 
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

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
