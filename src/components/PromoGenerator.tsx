import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Download, 
  Upload, 
  Layers, 
  Maximize2, 
  Image as ImageIcon,
  Check, 
  Play, 
  Info,
  RefreshCw,
  TrendingUp,
  Sliders,
  AlertCircle
} from 'lucide-react';

interface PromoGeneratorProps {
  lang: 'RU' | 'EN';
}

type AspectRatio = '1:1' | '9:16' | '16:9';

interface BadgeOption {
  id: string;
  name: string;
  color: string;
}

export default function PromoGenerator({ lang }: PromoGeneratorProps) {
  const isRu = lang === 'RU';

  // State Management
  const [trackTitle, setTrackTitle] = useState<string>(isRu ? 'ПОЛУНОЧНЫЙ ДРАЙВ' : 'MIDNIGHT DRIVE');
  const [artistName, setArtistName] = useState<string>('NIGHTVOLT ARTIST');
  const [releaseDate, setReleaseDate] = useState<string>(isRu ? 'ДОСТУПНО СЕЙЧАС' : 'OUT NOW');
  const [aspect, setAspect] = useState<AspectRatio>('1:1');
  const [bgColor, setBgColor] = useState<string>('cyber-crimson'); // cyber-crimson, ultraviolet, chrome-dark, acid-grid
  const [customLogoText, setCustomLogoText] = useState<string>('NIGHTVOLT');
  const [glowIntensity, setGlowIntensity] = useState<number>(75); // 0 to 100
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  // Platform badges state
  const [showYandex, setShowYandex] = useState(true);
  const [showVk, setShowVk] = useState(true);
  const [showSpotify, setShowSpotify] = useState(true);
  const [showApple, setShowApple] = useState(true);
  const [showYoutube, setShowYoutube] = useState(false);

  const [exporting, setExporting] = useState(false);
  const [exportInProgres, setExportInProgres] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Background gradient map for the live preview
  const getGradientClass = () => {
    switch (bgColor) {
      case 'cyber-crimson':
        return 'bg-radial from-neutral-900 via-neutral-950 to-black border-red-950/40 text-white';
      case 'ultraviolet':
        return 'bg-gradient-to-br from-indigo-950 via-purple-950 to-black border-indigo-950 text-white';
      case 'chrome-dark':
        return 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-neutral-800 text-white';
      case 'acid-grid':
        return 'bg-gradient-to-tr from-[#121214] via-[#1a1c22] to-[#2c1a12] border-neutral-800 text-white';
      default:
        return 'bg-black text-white';
    }
  };

  // Cover image action helper
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg(isRu ? "Файл слишком большой! Ограничение 5MB." : "File too large! Max size is 5MB.");
        return;
      }
      setErrorMsg(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCoverImage = () => {
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Generate random cool music title
  const handleRandomize = () => {
    const trackSuggestionsRu = ["НЕОНОВЫЙ ЗАКАДЫКА", "ИМПУЛЬС СТИХИИ", "КРАСНЫЕ КРЫЛЬЯ", "ВЕЧНЫЙ ДВИГАТЕЛЬ", "СТАТИКА В СЕТИ", "ЗВУКОВАЯ ВОЛНА", "КИБЕРПАНК СОЛО"];
    const trackSuggestionsEn = ["SILENT HORIZON", "VOLTAGE SPLIT", "CARBON ECHO", "ACID SUNRISE", "GRIDRUNNER", "HYPERLIGHT", "ECHOES OF TOMORROW"];
    const artistSuggestions = ["DEX MULTIPLEX", "KRAFT & DRUCK", "CYBER GLITCH", "STAS VOLT", "RED SIGNAL", "ANALOG DISCHARGE"];
    
    if (isRu) {
      setTrackTitle(trackSuggestionsRu[Math.floor(Math.random() * trackSuggestionsRu.length)]);
    } else {
      setTrackTitle(trackSuggestionsEn[Math.floor(Math.random() * trackSuggestionsEn.length)]);
    }
    setArtistName(artistSuggestions[Math.floor(Math.random() * artistSuggestions.length)]);
  };

  // Export to Image on HTML Canvas
  const handleDownload = async () => {
    setExportInProgres(true);
    setErrorMsg(null);

    // Give state/spinner time to mount
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // Define export dimensions according to aspect ratios
      let width = 1080;
      let height = 1080;
      if (aspect === '9:16') {
        width = 1080;
        height = 1920;
      } else if (aspect === '16:9') {
        width = 1920;
        height = 1080;
      }

      // Create a new canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not acquire 2D context");

      // Enable font anti-aliasing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Draw Background Gradient
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) * 0.7);
      if (bgColor === 'cyber-crimson') {
        grad.addColorStop(0, '#1c0505');
        grad.addColorStop(0.5, '#0c0202');
        grad.addColorStop(1, '#000000');
      } else if (bgColor === 'ultraviolet') {
        grad.addColorStop(0, '#15053b');
        grad.addColorStop(0.5, '#09021c');
        grad.addColorStop(1, '#000000');
      } else if (bgColor === 'acid-grid') {
        grad.addColorStop(0, '#261405');
        grad.addColorStop(0.5, '#120d05');
        grad.addColorStop(1, '#000000');
      } else {
        grad.addColorStop(0, '#121212');
        grad.addColorStop(1, '#000000');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw cyber Grid overlay if selected
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.04;
      const gridSize = width / 15;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Draw custom glow spheres based on glow intensity Slider
      if (glowIntensity > 0) {
        ctx.globalAlpha = (glowIntensity / 100) * 0.35;
        const glowColor = bgColor === 'cyber-crimson' ? '#ff3c00' : bgColor === 'ultraviolet' ? '#8b5cf6' : bgColor === 'acid-grid' ? '#eab308' : '#3b82f6';
        const radialGlow = ctx.createRadialGradient(width / 2, height / 2 - 100, 10, width / 2, height / 2 - 100, Math.min(width, height) * 0.45);
        radialGlow.addColorStop(0, glowColor);
        radialGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1.0;
      }

      // Helper function to draw circular or square cover art
      const drawCover = async () => {
        const coverSize = Math.min(width, height) * 0.42;
        const cx = width / 2 - coverSize / 2;
        // Position changes slightly depending on format
        let cy = height / 2 - coverSize / 2 - (aspect === '9:16' ? 240 : 100);
        if (aspect === '16:9') {
          cy = height / 2 - coverSize / 2; // centered
        }

        if (coverImage) {
          const img = new Image();
          img.src = coverImage;
          await new Promise((resolve) => {
            img.onload = () => {
              // Draw image shadow
              ctx.shadowColor = bgColor === 'cyber-crimson' ? 'rgba(255, 60, 0, 0.4)' : 'rgba(0, 0, 0, 0.6)';
              ctx.shadowBlur = 60;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 15;

              // Draw image rounded border
              ctx.beginPath();
              ctx.roundRect(cx, cy, coverSize, coverSize, 24);
              ctx.fillStyle = '#000000';
              ctx.fill();
              
              ctx.save();
              ctx.beginPath();
              ctx.roundRect(cx, cy, coverSize, coverSize, 24);
              ctx.clip();
              ctx.drawImage(img, cx, cy, coverSize, coverSize);
              ctx.restore();
              
              // Reset shadow
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
              resolve(null);
            };
            img.onerror = () => {
              // fallback if failed
              drawDefaultCover(cx, cy, coverSize);
              resolve(null);
            };
          });
        } else {
          drawDefaultCover(cx, cy, coverSize);
        }

        return { cx, cy, coverSize };
      };

      const drawDefaultCover = (cx: number, cy: number, size: number) => {
        // Aesthetic dark default cover art with glow
        ctx.save();
        ctx.shadowColor = 'rgba(255, 60, 0, 0.2)';
        ctx.shadowBlur = 40;
        
        ctx.beginPath();
        ctx.roundRect(cx, cy, size, size, 24);
        ctx.fillStyle = '#17171c';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.stroke();

        // Draw central neon lightning bolt logo inside default cover
        ctx.beginPath();
        const centerX = cx + size / 2;
        const centerY = cy + size / 2;
        const boltScale = size / 100;

        // Custom points for the brand lightning bolt scaled nicely
        // points="90,28 58,45 70,60 10,72 46,50 34,35"
        const points = [
          { x: 90, y: 28 },
          { x: 58, y: 45 },
          { x: 70, y: 60 },
          { x: 10, y: 72 },
          { x: 46, y: 50 },
          { x: 34, y: 35 }
        ];

        ctx.translate(centerX - 50 * boltScale, centerY - 50 * boltScale);
        ctx.beginPath();
        ctx.moveTo(points[0].x * boltScale, points[0].y * boltScale);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x * boltScale, points[i].y * boltScale);
        }
        ctx.closePath();
        ctx.fillStyle = '#ff3c00';
        ctx.fill();
        ctx.restore();
      };

      // 2. Resolve cover art render
      const { cy: coverY, coverSize } = await drawCover();

      // 3. Write Typography Metadata
      ctx.textAlign = 'center';
      
      // Top Label (NIGHTVOLT BRAND BADGE)
      ctx.fillStyle = '#ff3c00';
      ctx.font = 'bold 15px monospace';
      if (aspect === '9:16') {
        ctx.fillText(`// ${customLogoText.toUpperCase()} PRESENTATION`, width / 2, 160);
      } else {
        ctx.fillText(`// ${customLogoText.toUpperCase()} DISTRO`, width / 2, 80);
      }

      // Track Title (Big Bold Display font)
      let textTitleY = coverY + coverSize + 90;
      if (aspect === '16:9') {
        // Landscape can put text left or right, but let's keep it centered & lower down
        textTitleY = coverY + coverSize + 70;
      }
      ctx.fillStyle = '#ffffff';
      ctx.font = `black ${Math.round(width * 0.055)}px "Inter", sans-serif`;
      ctx.fillText(trackTitle.toUpperCase(), width / 2, textTitleY);

      // Artist Name
      let textArtistY = textTitleY + 45;
      ctx.fillStyle = '#7e8c9c';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(`BY ${artistName.toUpperCase()}`, width / 2, textArtistY);

      // Release Tags / Date
      let textReleaseY = textArtistY + 45;
      ctx.fillStyle = '#ff3c00';
      ctx.font = 'black 14px monospace';
      ctx.fillText(`[ ${releaseDate.toUpperCase()} ]`, width / 2, textReleaseY);

      // 4. Draw Badges on bottom
      let badgesY = textReleaseY + 50;
      if (aspect === '9:16') {
        badgesY = height - 200;
      } else if (aspect === '16:9') {
        badgesY = height - 100;
      }

      // Draw horizontal distribution platforms badges dynamically
      const activePlatforms = [];
      if (showYandex) activePlatforms.push('Yandex Music');
      if (showVk) activePlatforms.push('VK Mus');
      if (showSpotify) activePlatforms.push('Spotify');
      if (showApple) activePlatforms.push('Apple');
      if (showYoutube) activePlatforms.push('YouTube');

      if (activePlatforms.length > 0) {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.font = '9px monospace';
        ctx.fillText(isRu ? 'ДОСТУПНО НА ВСЕХ ПЛАТФОРМАХ:' : 'STREAMING WORLDWIDE:', width / 2, badgesY - 20);

        const badgeWidth = 140;
        const totalBadgesWidth = activePlatforms.length * badgeWidth + (activePlatforms.length - 1) * 20;
        let startX = (width - totalBadgesWidth) / 2;

        activePlatforms.forEach((platform) => {
          // Draw a pill container
          ctx.beginPath();
          ctx.roundRect(startX, badgesY, badgeWidth, 32, 8);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.stroke();

          // Write Platform Text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(platform.toUpperCase(), startX + badgeWidth / 2, badgesY + 19);

          startX += badgeWidth + 20;
        });
      }

      // 5. Build trigger download
      const dataUri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `nightvolt_${artistName.toLowerCase().replace(/\s+/g, '_')}_${trackTitle.toLowerCase().replace(/\s+/g, '_')}.png`;
      link.href = dataUri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(isRu ? "Не удалось сгенерировать холст. Пожалуйста, попробуйте другую картинку." : "Failed to generate canvas graphic. Try an alternative cover.");
    } finally {
      setExportInProgres(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 text-white">
      
      {/* Upper Description Box */}
      <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-3xl">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-xl shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-black text-white uppercase tracking-wider mb-2">
              {isRu ? "ГЕНЕРАТОР ПРОМО-БАННЕРОВ" : "PROMO CARD DESIGN FACTORY"}
            </h3>
            <p className="font-sans text-xs text-[#7e8c9c] leading-relaxed">
              {isRu 
                ? "Создавайте профессиональные обложки и рекламные баннеры для ваших релизов самостоятельно. Меняйте параметры на ходу: настраивайте фоновые градиенты, добавляйте или скрывайте плашки стриминговых сервисов, загружайте свои изображения и выгружайте готовые файлы в разрешениях 1080x1080 (лента), 1080x1920 (сторис) или 1920x1080 (баннер)."
                : "Equip your releases with professional high-quality social graphics without hiring designers. Instantly generate social banners to size. Tune glowing atmospheric ambient shades, customize copy text, upload cover images, toggle streaming platform badges and download clear high-res PNG outputs instantly."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Configuration Panel (5 Columns) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6 bg-neutral-900/40 border border-neutral-800 p-6 sm:p-8 rounded-3xl backdrop-blur-sm">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-orange" />
                <span className="font-mono text-xs uppercase font-extrabold text-neutral-300">
                  {isRu ? "Настройки карточки" : "Asset Controls"}
                </span>
              </div>
              <button 
                onClick={handleRandomize} 
                className="font-mono text-[10px] bg-neutral-800 hover:bg-neutral-700 hover:text-white px-2.5 py-1 text-neutral-300 rounded transition-colors uppercase flex items-center gap-1.5"
                title={isRu ? "Случайный заголовок" : "Randomize details"}
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isRu ? "Рандом" : "Random"}</span>
              </button>
            </div>

            {/* ERROR MESSAGE NOTIFICATION */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-900 text-red-400 font-mono text-[10px] rounded-xl flex items-center gap-2 uppercase">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Input 1: Track Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {isRu ? "Название трека:" : "Release Title:"}
              </label>
              <input 
                type="text"
                value={trackTitle}
                onChange={(e) => setTrackTitle(e.target.value)}
                maxLength={32}
                className="px-4 py-2.5 bg-neutral-950 border border-neutral-800 font-mono text-xs rounded-xl focus:border-brand-orange focus:outline-none uppercase"
              />
            </div>

            {/* Input 2: Artist Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {isRu ? "Имя Исполнителя / Проект:" : "Artist / Team Name:"}
              </label>
              <input 
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                maxLength={32}
                className="px-4 py-2.5 bg-neutral-950 border border-neutral-800 font-mono text-xs rounded-xl focus:border-brand-orange focus:outline-none uppercase"
              />
            </div>

            {/* Input 3: Subtitle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {isRu ? "Статус / Дата:" : "Release Subtitle / Date:"}
              </label>
              <input 
                type="text"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                maxLength={20}
                className="px-4 py-2.5 bg-neutral-950 border border-neutral-800 font-mono text-xs rounded-xl focus:border-brand-orange focus:outline-none uppercase"
              />
            </div>

            {/* Grid 4: Formats aspect ratios */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {isRu ? "Формат (Размер):" : "Size Form Ratio:"}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['1:1', '9:16', '16:9'] as AspectRatio[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setAspect(r)}
                    className={`py-2 px-3 border rounded-xl font-mono text-10px uppercase flex flex-col items-center justify-center transition-all cursor-pointer ${
                      aspect === r 
                        ? 'border-brand-orange bg-brand-orange/10 text-brand-orange font-bold' 
                        : 'border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <span>{r}</span>
                    <span className="text-[8px] opacity-65 font-normal">
                      {r === '1:1' ? (isRu ? 'КВАДРАТ' : 'SQUARE') : r === '9:16' ? 'STORY' : 'BANNER'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Theme style presets */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {isRu ? "Стилизация обоев:" : "Theme Canvas Backdrop:"}
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'cyber-crimson', name: isRu ? 'Кибер-Красный' : 'Cyber Crimson', dot: 'bg-red-600' },
                  { id: 'ultraviolet', name: isRu ? 'Ультрафиолет' : 'Ultraviolet', dot: 'bg-violet-600' },
                  { id: 'acid-grid', name: isRu ? 'Световой Луч' : 'Amber Flare', dot: 'bg-amber-500' },
                  { id: 'chrome-dark', name: isRu ? 'Техно-Хром' : 'Chrome Stealth', dot: 'bg-neutral-400' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setBgColor(th.id)}
                    className={`p-2.5 border rounded-xl font-mono text-[10px] uppercase flex items-center gap-2 transition-all cursor-pointer ${
                      bgColor === th.id 
                        ? 'border-brand-orange bg-brand-orange/5 text-brand-orange font-bold' 
                        : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${th.dot}`} />
                    <span>{th.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* File upload cover art */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {isRu ? "Обложка релиза:" : "Cover Image File:"}
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-3 px-4 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
                >
                  <Upload className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{coverImage ? (isRu ? 'ОБНОВИТЬ ОБЛОЖКУ' : 'CHANGE COVER') : (isRu ? 'ЗАГРУЗИТЬ ОБЛОЖКУ' : 'UPLOAD COVER')}</span>
                </button>
                
                {coverImage && (
                  <button
                    onClick={clearCoverImage}
                    className="p-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-red-500 rounded-xl font-mono text-[10px] font-bold cursor-pointer transition-colors"
                    title={isRu ? "Сбросить обложку" : "Clear Cover"}
                  >
                    ✕
                  </button>
                )}
              </div>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleCoverUpload}
                accept="image/*"
                className="hidden"
              />
              <span className="font-mono text-[8px] text-[#7e8c9c] leading-none uppercase">
                {isRu ? "* ПО УМОЛЧАНИЮ ИСПОЛЬЗУЕТСЯ ЛОГОТИП NIGHTVOLT" : "* INTEGRATES OUR NATIVE LIGHTNING VOLT IF OMITTED"}
              </span>
            </div>

            {/* Slider glow intensity */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase">
                <span>{isRu ? "Интенсивность свечения:" : "Ambient Glow Power:"}</span>
                <span className="text-brand-orange font-bold">{glowIntensity}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(Number(e.target.value))}
                className="w-full accent-brand-orange"
              />
            </div>

            {/* Platform Badges toggles checklist */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                {isRu ? "Показать платформы:" : "Platform Badge Toggles:"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Yandex", active: showYandex, setter: setShowYandex },
                  { label: "VK Music", active: showVk, setter: setShowVk },
                  { label: "Spotify", active: showSpotify, setter: setShowSpotify },
                  { label: "Apple Music", active: showApple, setter: setShowApple },
                  { label: "YouTube", active: showYoutube, setter: setShowYoutube },
                ].map((badg) => (
                  <button
                    key={badg.label}
                    onClick={() => badg.setter(!badg.active)}
                    className={`py-1.5 px-3 rounded-lg font-mono text-[9px] uppercase transition-all cursor-pointer border select-none ${
                      badg.active 
                        ? 'bg-neutral-100 text-neutral-950 border-neutral-100 font-black' 
                        : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                    }`}
                  >
                    {badg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* EXPORT ACTION TRIGGER BUTTON */}
            <button
              id="export-promo-canvas-asset-btn"
              onClick={handleDownload}
              disabled={exportInProgres}
              className="w-full mt-3 py-4 bg-brand-orange hover:bg-neutral-100 font-mono text-xs font-black text-white hover:text-neutral-950 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-orange/15 hover:scale-[1.01] uppercase select-none"
            >
              {exportInProgres ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>{isRu ? "ГЕНЕРАЦИЯ И ВЫГРУЗКА..." : "EXPORTING HIGH-FI IMAGE..."}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isRu ? "СКАЧАТЬ BANNER / SAVING" : "EXPORT IMAGE DOWNLOAD"}</span>
                </>
              )}
            </button>

          </div>

          {/* RIGHT: Live WYSIWYG Interactive Canvas PREVIEW Frame (7 Columns) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-4">
            
            <div className="flex justify-between items-center font-mono text-[10px] text-[#7e8c9c]">
              <span>{isRu ? "ИНТЕРАКТИВНЫЙ ПРОСМОТР ЖИВОГО ХОЛСТА (WYSIWYG):" : "LIVE PREVIEW WYSIWYG SCREEN:"}</span>
              <div className="flex items-center gap-1.5 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span className="uppercase">{aspect === '1:1' ? '1080x1080' : aspect === '9:16' ? '1080x1920' : '1920x1080'} PX</span>
              </div>
            </div>

            {/* Preview Framing Box */}
            <div className="bg-[#0b0c0f] border border-neutral-800 rounded-3xl p-6 sm:p-12 flex items-center justify-center min-h-[460px] relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={aspect}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  ref={previewContainerRef}
                  className={`relative border aspect-square w-full rounded-2xl overflow-hidden transition-all shadow-2xl flex flex-col justify-between p-6 md:p-10 ${getGradientClass()}`}
                  style={{
                    aspectRatio: aspect === '1:1' ? '1/1' : aspect === '9:16' ? '9/16' : '16/9',
                    maxWidth: aspect === '1:1' ? '440px' : aspect === '9:16' ? '300px' : '580px',
                  }}
                >
                  {/* Backdrop glow aura based on glow Slider */}
                  {glowIntensity > 0 && (
                    <div 
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto rounded-full w-[240px] h-[240px] pointer-events-none transition-all duration-300 blur-3xl opacity-35"
                      style={{
                        backgroundColor: bgColor === 'cyber-crimson' ? '#ff3c00' : bgColor === 'ultraviolet' ? '#8b5cf6' : bgColor === 'acid-grid' ? '#eab308' : '#3b82f6',
                        transform: `scale(${glowIntensity / 75}) translate(-50%, -50%)`,
                        left: '50%',
                        top: '40%'
                      }}
                    />
                  )}

                  {/* Top Branding label */}
                  <div className="relative z-10 flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="font-mono text-[9px] text-[#ff3c00] tracking-widest uppercase font-black">
                      // {customLogoText} DISP
                    </span>
                    <span className="font-mono text-[7px] text-white/40 tracking-normal uppercase">
                      ST.CODE v3.12
                    </span>
                  </div>

                  {/* Central Body Content Frame */}
                  <div className="flex flex-col items-center justify-center flex-1 my-4 gap-4 relative z-10">
                    
                    {/* Cover art image preview element */}
                    <div 
                      className="aspect-square relative flex items-center justify-center rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl transition-all duration-300 group"
                      style={{
                        width: aspect === '16:9' ? '110px' : aspect === '9:16' ? '140px' : '170px'
                      }}
                    >
                      {coverImage ? (
                        <img 
                          src={coverImage} 
                          alt="Cover upload" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 text-[#ff3c00] hover:scale-110 transition-transform">
                          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                            <polygon points="90,28 58,45 70,60 10,72 46,50 34,35" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Metadata block text */}
                    <div className="text-center flex flex-col gap-1 w-full px-2">
                      <h4 className="font-display font-black tracking-tight text-white uppercase leading-none break-all"
                        style={{
                          fontSize: aspect === '16:9' ? '14px' : aspect === '9:16' ? '16px' : '20px'
                        }}
                      >
                        {trackTitle || 'UNTITLED'}
                      </h4>
                      
                      <p className="font-mono text-[9px] text-neutral-400 font-bold uppercase truncate">
                        BY {artistName || 'UNKNOWN ARTIST'}
                      </p>

                      <p className="font-mono text-[8px] tracking-widest text-[#ff3c00] font-black uppercase mt-1">
                        [ {releaseDate || 'OUT NOW'} ]
                      </p>
                    </div>

                  </div>

                  {/* Bottom Badges lists inside card */}
                  <div className="relative z-10 border-t border-white/5 pt-3 flex flex-col gap-2 items-center justify-center text-center">
                    <span className="font-mono text-[7px] text-white/30 uppercase tracking-widest leading-none">
                      {isRu ? 'ДОСТУПНО НА ПЛАТФОРМАХ' : 'LISTEN ONLINE ON DIRECT PORTS'}
                    </span>
                    
                    <div className="flex flex-wrap justify-center gap-1.5 w-full">
                      {showYandex && (
                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[7px] font-mono text-white/95 uppercase tracking-wide leading-none select-none">
                          Yandex Music
                        </span>
                      )}
                      {showVk && (
                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[7px] font-mono text-white/95 uppercase tracking-wide leading-none select-none">
                          VK Mus
                        </span>
                      )}
                      {showSpotify && (
                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[7px] font-mono text-white/95 uppercase tracking-wide leading-none select-none">
                          Spotify
                        </span>
                      )}
                      {showApple && (
                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[7px] font-mono text-white/95 uppercase tracking-wide leading-none select-none">
                          Apple
                        </span>
                      )}
                      {showYoutube && (
                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[7px] font-mono text-white/95 uppercase tracking-wide leading-none select-none">
                          Youtube
                        </span>
                      )}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>

            {/* Help/Specs footnote */}
            <div className="p-5 bg-neutral-900/35 border border-neutral-950 rounded-2xl flex items-start gap-4">
              <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange mt-0.5 select-none shrink-0 text-xs font-mono font-bold">
                i
              </div>
              <p className="font-sans text-xs text-[#7e8c9c] leading-relaxed">
                {isRu 
                  ? "Сгенерированная промо-карточка полностью готова к размещению. Высокое разрешение 1080p подходит для публикаций (Instagram, VK, Telegram). Используйте встроенные цветовые схемы NIGHTVOLT для поддержки единого стиля релиза."
                  : "Every generated promotional asset produces true high-fidelity 1080p resolution matching social specs (Instagram Stories, Feed, Telegram channels). Leverage our branded colors for clean label cohesion."}
              </p>
            </div>

          </div>

        </div>

    </div>
  );
}
