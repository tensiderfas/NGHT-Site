import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Image as ImageIcon 
} from 'lucide-react';
import PromoGenerator from './PromoGenerator';

interface MarketingSuiteProps {
  lang: 'RU' | 'EN';
  onBack: () => void;
}

export default function MarketingSuite({ lang, onBack }: MarketingSuiteProps) {
  const isRu = lang === 'RU';

  return (
    <section 
      id="nightvolt-marketing-suite" 
      className="min-h-screen pt-28 pb-24 bg-neutral-950 text-white relative overflow-hidden bg-grid-lines"
    >
      
      {/* Visual glowing aura elements */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Navigation Breadcrumb Line */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-neutral-800/60">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-mono text-xs font-bold rounded-full transition-all cursor-pointer group select-none uppercase active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-brand-orange group-hover:-translate-x-0.5 transition-transform" />
            <span>{isRu ? "ГЛАВНАЯ СТРАНИЦА" : "RETURN HOME"}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider">
              {isRu ? "ГЕНЕРАТОР ПРОМО // NIGHTVOLT" : "NIGHTVOLT PROMO ASSETS DESIGN FACTORY"}
            </span>
          </div>
        </div>

        {/* Header Introduction */}
        <div className="flex flex-col gap-4 mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#7e8c9c] font-extrabold uppercase">
              {isRu ? "ЦЕНТР ПРОДВИЖЕНИЯ РЕЛИЗОВ // PUBLICITY MODULE" : "ARTIST GRAPHICS ENGINE // VISUAL CELL"}
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none">
            {isRu ? "Промо Генератор" : "Promo Assets Generator"}
          </h2>
          <p className="text-xs sm:text-sm text-[#7e8c9c] font-mono uppercase tracking-wide leading-relaxed">
            {isRu 
              ? "// Эксклюзивный инструмент для артистов Nightvolt. Генерируйте профессиональные обложки, квадратные промо-посты, сторис и социальные баннеры для ваших релизов мгновенно."
              : "// Tactical visual builder for independent Nightvolt creators. Forge high-resolution social promotional graphics, cover variants, stories, and showcase banners instantly."}
          </p>
        </div>

        {/* Main promo builder embedded directly for immediate action */}
        <div className="mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <PromoGenerator lang={lang} />
          </motion.div>
        </div>

        {/* Bottom footer footnote info banner */}
        <div className="mt-20 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <span>
            {isRu ? "© NIGHTVOLT DIGITAL LABS // ВСЕ ИНСТРУМЕНТЫ БЕСПЛАТНЫДЛЯ НАШИХ АРТИСТОВ" : "© NIGHTVOLT DIGITAL LABS // ZERO COST GRAPHICS ENGINE FOR INDEPENDENTS"}
          </span>
          <div className="flex gap-2 items-center text-neutral-400">
            <ImageIcon className="w-3.5 h-3.5 text-brand-orange" />
            <span>{isRu ? "ГЕНЕРАТОР КАРТОЧЕК v1.5" : "PROMO CARDS BUILDER v1.5"}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
