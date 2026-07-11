import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Layers, Globe, Radio } from 'lucide-react';
import { translations } from '../translations';

interface HeroProps {
  lang: 'RU' | 'EN';
  onScrollTo: (selector: string) => void;
}

export default function Hero({ lang, onScrollTo }: HeroProps) {
  const isRu = lang === 'RU';
  const t = translations[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950 overflow-hidden border-b border-neutral-200/60 dark:border-neutral-900/60"
    >
      {/* Pristine subtle background layout lines */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.015] dark:opacity-[0.025] pointer-events-none" />
      
      {/* Light soft background ambient blur for subtle depth (kept away from text bounds to ensure absolute contrast) */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 dark:bg-brand-blue/10 filter blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1250px] mx-auto w-full flex-grow flex items-center relative z-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Asymmetrical typography & CTA */}
          <div className="lg:col-span-7 text-left flex flex-col items-start gap-8">
            
            {/* Super Legible Crisp Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-blue/10 dark:bg-brand-blue/15 border border-brand-blue/20 dark:border-brand-blue/30 rounded-full font-mono text-[9px] font-black tracking-[0.2em] text-brand-blue uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue fill-brand-blue/20" />
                <span>{t.labelBadge}</span>
              </div>
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-full font-mono text-[9px] font-bold text-neutral-600 dark:text-neutral-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="tracking-wider text-neutral-800 dark:text-neutral-200">NIGHTVOLT HUB v3.1</span>
              </div>
            </div>

            {/* Title: High Contrast Display Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-neutral-950 dark:text-white uppercase">
                <span className="block text-neutral-950 dark:text-white">
                  {t.heroTitlePart1}
                </span>
                <span className="block text-brand-blue">
                  {t.heroTitlePart2}
                </span>
              </h1>
            </div>

            {/* Description: Extremely legible text block with optimal contrast */}
            <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base font-normal tracking-wide max-w-[620px] leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* High Contrast Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onScrollTo('#submit-demo')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-mono text-xs font-black tracking-widest rounded-full hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-300 active:scale-97 cursor-pointer hover:shadow-xl hover:shadow-brand-blue/20 inline-flex items-center justify-center gap-2.5 uppercase"
              >
                <ArrowRight className="w-4 h-4" />
                <span>{t.sendDemo}</span>
              </button>

              <button
                onClick={() => onScrollTo('#philosophy')}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 hover:text-brand-blue dark:hover:text-brand-blue font-mono text-xs font-bold tracking-widest transition-all cursor-pointer border border-neutral-250 dark:border-neutral-800 rounded-full hover:border-brand-blue/40 uppercase text-center"
              >
                {t.philosophy}
              </button>
            </div>

            {/* Clear Contacts block */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-200/60 dark:border-neutral-850/60 w-full">
              <span className="font-bold text-neutral-900 dark:text-neutral-200">{isRu ? "ОФИЦИАЛЬНАЯ ПОЧТА:" : "OFFICIAL CHANNELS:"}</span>
              <a href="mailto:nightvolt@internet.ru" className="hover:text-brand-blue transition-colors underline decoration-brand-blue/30 underline-offset-2">nightvolt@internet.ru</a>
              <span>•</span>
              <a href="mailto:label@nightvolt.ru" className="hover:text-brand-blue transition-colors underline decoration-brand-blue/30 underline-offset-2">label@nightvolt.ru</a>
            </div>

          </div>

          {/* Right Column: Spec Speculative Grid Matrix (Redesigned from spinning visualizer) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-850/90 rounded-4xl p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Solid layout header */}
              <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/80 pb-5 mb-6">
                <span className="font-mono text-[9px] text-[#7e8c9c] font-black uppercase tracking-widest">
                  {isRu ? "ТЕХНИЧЕСКИЙ РЕГЛАМЕНТ // NIGHTVOLT" : "CORE SYSTEM SPECS // NIGHTVOLT"}
                </span>
                <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 font-mono text-[9px] font-extrabold uppercase rounded-lg">
                  ISO-24
                </span>
              </div>

              {/* Specs Stack: Simple, elegant, high contrast table lines */}
              <div className="space-y-4">
                
                {/* Spec item 1 */}
                <div className="py-2.5 flex items-center justify-between border-b border-neutral-150 dark:border-neutral-800/50">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    {isRu ? "ФОРМАТ АУДИО" : "AUDIO CODEC"}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-950 dark:text-white">
                    WAV 24-Bit / FLAC (Lossless)
                  </span>
                </div>

                {/* Spec item 2 */}
                <div className="py-2.5 flex items-center justify-between border-b border-neutral-150 dark:border-neutral-800/50">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    {isRu ? "ЗАДЕРЖКА МОДЕРАЦИИ" : "MODERATION SPEED"}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-950 dark:text-white">
                    12 - 24 {isRu ? "часа" : "Hours"}
                  </span>
                </div>

                {/* Spec item 3 */}
                <div className="py-2.5 flex items-center justify-between border-b border-neutral-150 dark:border-neutral-800/50">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    {isRu ? "КОМИССИЯ ПЛАТФОРМЫ" : "REVENUE MODEL"}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-blue">
                    80% {isRu ? "Артисту" : "To Artist"} / 20% {isRu ? "Платформе" : "To Platform"}
                  </span>
                </div>

                {/* Spec item 4 */}
                <div className="py-2.5 flex items-center justify-between border-b border-neutral-150 dark:border-neutral-800/50">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    {isRu ? "АВТОРСКИЕ ПРАВА" : "INTELLECTUAL PROPERTY"}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-500">
                    100% {isRu ? "Сохраняются за вами" : "Retained by Artist"}
                  </span>
                </div>

                {/* Spec item 5 */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    {isRu ? "ГЛОБАЛЬНАЯ ДИСТРИБУЦИЯ" : "GLOBAL CHANNELS"}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-950 dark:text-white">
                    180+ {isRu ? "Цифровых площадок" : "Digital Outlets"}
                  </span>
                </div>

              </div>

              {/* Status footer inside card */}
              <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span className="flex items-center gap-1.5 uppercase">
                  <Layers className="w-3.5 h-3.5 text-brand-blue" />
                  {isRu ? "Канал дистрибуции активен" : "Distribution channel online"}
                </span>
                <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase">
                  {isRu ? "СТАТУС: АКТИВЕН" : "SYS_ACTIVE"}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Specs and Highlights bar */}
      <div className="max-w-[1250px] mx-auto w-full z-10 border-t border-neutral-200/80 dark:border-neutral-900/80 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-8">
        
        {/* Core highlight criteria with excellent color visibility */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-wider text-neutral-600 dark:text-neutral-400">
          <span className="flex items-center gap-1.5 font-extrabold text-neutral-900 dark:text-neutral-200 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
            {isRu ? 'ЧЕСТНЫЙ СПЛИТ 80/20' : 'FAIR 80/20 SPLIT'}
          </span>
          <span className="flex items-center gap-1.5 font-extrabold text-neutral-900 dark:text-neutral-200 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
            {isRu ? 'ПРОЗРАЧНЫЕ УСЛОВИЯ СЛУЖБЫ' : 'TRANSPARENT VALUE ALLIANCE'}
          </span>
          <span className="flex items-center gap-1.5 font-extrabold text-neutral-900 dark:text-neutral-200 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
            {isRu ? 'ОТПРАВКА НА ВСЕ ПЛОЩАДКИ' : 'COMPLETE STORES DELIVERY'}
          </span>
        </div>

        {/* Real-time statistics summaries */}
        <div className="flex gap-8 sm:gap-10 font-mono text-left">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] tracking-wider text-neutral-500 uppercase">{t.royaltyDesc}</span>
            <span className="text-xs font-black tracking-widest text-brand-blue">{t.royaltyDistribution}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] tracking-wider text-neutral-500 uppercase">{t.supplyDesc}</span>
            <span className="text-xs font-black tracking-widest text-neutral-900 dark:text-neutral-100">{t.supplyChannels}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] tracking-wider text-neutral-500 uppercase">{t.deliveryDesc}</span>
            <span className="text-xs font-black tracking-widest text-neutral-900 dark:text-neutral-100">{t.deliverySpeed}</span>
          </div>
        </div>

      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[8px] tracking-[0.25em] font-mono text-[#7e8c9c] z-10 uppercase pointer-events-none">
        <span>{t.scrollIndicator}</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3 h-3 text-brand-blue" />
        </motion.div>
      </div>
    </section>
  );
}
