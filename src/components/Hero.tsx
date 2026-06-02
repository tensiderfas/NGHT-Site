import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { translations } from '../translations';

interface HeroProps {
  lang: 'RU' | 'EN';
  onScrollTo: (selector: string) => void;
}

export default function Hero({ lang, onScrollTo }: HeroProps) {
  const isRu = lang === 'RU';
  const t = translations[lang];

  const [glitchState, setGlitchState] = useState<'pristine' | 'stutter' | 'heavy-lag' | 'recovery'>('pristine');

  // Periodic automatic lag-then-recover sequences for analog television style glitching
  useEffect(() => {
    const mainInterval = setInterval(() => {
      // 1. Enter stutter (minor shake / jitter)
      setGlitchState('stutter');
      
      // 2. Transition to complete freeze-frame heavy lag
      const t1 = setTimeout(() => {
        setGlitchState('heavy-lag');
      }, 450);

      // 3. Flicker reboot recovery (temporary breakdown)
      const t2 = setTimeout(() => {
        setGlitchState('recovery');
      }, 1500);

      // 4. Fully unlagged back to clean status
      const t3 = setTimeout(() => {
        setGlitchState('pristine');
      }, 1900);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, 6200);

    return () => {
      clearInterval(mainInterval);
    };
  }, []);

  // Playful manual cursor lag trigger on hovering the branding name
  const triggerManualLag = () => {
    if (glitchState !== 'pristine') return;
    setGlitchState('stutter');
    setTimeout(() => setGlitchState('heavy-lag'), 250);
    setTimeout(() => setGlitchState('recovery'), 1000);
    setTimeout(() => setGlitchState('pristine'), 1300);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 bg-transparent bg-grid-lines overflow-hidden"
    >
      {/* Structural layout outlines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/10 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/10 pointer-events-none hidden md:block" />

      {/* Atmospheric Orange and Red glowing background mesh */}
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/[0.03] filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-orange/[0.025] filter blur-[100px] pointer-events-none" />

      {/* Main branding core */}
      <div className="max-w-[1250px] mx-auto w-full flex-grow flex flex-col justify-center relative z-10 py-12 text-center">
        <div className="flex flex-col items-center gap-6">
          
          {/* Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-50/80 border border-neutral-200 rounded-full font-mono text-[9px] font-bold tracking-[0.25em] text-neutral-600 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-orange fill-brand-orange animate-pulse" />
            <span className="text-neutral-800">{t.labelBadge}</span>
          </motion.div>

          {/* Glitch heading (lags and unlags, with manual preview trigger on hover) */}
          <div 
            onMouseEnter={triggerManualLag}
            className="group cursor-pointer relative"
          >
            <h1 
              className="font-display text-7xl sm:text-8xl md:text-9xl tracking-[0.04em] font-black leading-[0.85] flex flex-col items-center mb-6 relative select-none cursor-default"
            >
              {/* Title Part 1: NIGHT */}
              <span className="relative block">
                {/* Chromatic Split Left Overlays during lag phases */}
                {glitchState !== 'pristine' && (
                  <span className="absolute inset-0 text-brand-orange/80 mix-blend-screen select-none pointer-events-none translate-x-1 translate-y-[-2px] animate-lag-slice-1">
                    {t.heroTitlePart1}
                  </span>
                )}
                {glitchState !== 'pristine' && (
                  <span className="absolute inset-0 text-[#06b6d4]/80 mix-blend-screen select-none pointer-events-none translate-x-[-2px] translate-y-1 animate-lag-slice-2">
                    {t.heroTitlePart1}
                  </span>
                )}
                {/* Main foreground word with dynamic lag classes */}
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`block transition-all duration-75 ${
                    glitchState === 'stutter' ? 'animate-vhs-shake text-brand-blue/80' :
                    glitchState === 'heavy-lag' ? 'skew-x-12 translate-x-3 text-brand-orange filter brightness-110 drop-shadow-[3px_0_0_#06b6d4]' :
                    glitchState === 'recovery' ? 'opacity-40 blur-[1px] text-neutral-800 translate-y-1' :
                    'text-brand-blue'
                  }`}
                >
                  {t.heroTitlePart1}
                </motion.span>
              </span>

              {/* Title Part 2: VOLT */}
              <span className="relative block">
                {/* Outlined Chromatic Overlays during lag phases */}
                {glitchState !== 'pristine' && (
                  <span className="absolute inset-0 text-outline-orange mix-blend-screen select-none pointer-events-none translate-x-[-1.5px] translate-y-[1.5px] animate-lag-slice-2 uppercase">
                    {t.heroTitlePart2}
                  </span>
                )}
                {glitchState !== 'pristine' && (
                  <span className="absolute inset-0 text-outline-cyan mix-blend-screen select-none pointer-events-none translate-x-[2px] translate-y-[-1px] animate-lag-slice-1 uppercase">
                    {t.heroTitlePart2}
                  </span>
                )}
                {/* Main Outlined foreground word with dynamic lag classes */}
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`block text-outline-blue uppercase transition-all duration-75 ${
                    glitchState === 'stutter' ? 'animate-vhs-shake scale-98 translate-x-[-2px]' :
                    glitchState === 'heavy-lag' ? 'skew-y-3 -translate-x-2 text-outline-orange stroke-[3.5] drop-shadow-[-3px_0_0_rgba(6,182,212,0.8)]' :
                    glitchState === 'recovery' ? 'opacity-30 blur-[1px] translate-y-[-1px]' :
                    ''
                  }`}
                >
                  {t.heroTitlePart2}
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Subtitle brief */}
          <motion.p
            key={lang + "-sub"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-500 text-sm md:text-base font-light tracking-wide max-w-[640px] leading-relaxed mx-auto px-4"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Interaction area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center items-center gap-6 mt-8"
          >
            <button
              onClick={() => onScrollTo('#submit-demo')}
              className="px-8 py-3.5 bg-brand-blue text-white font-mono text-xs font-bold tracking-widest rounded-full hover:bg-neutral-900 transition-all duration-300 transform active:scale-97 cursor-pointer hover:shadow-xl hover:shadow-brand-blue/20 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <ArrowRight className="w-3.5 h-3.5 text-white" />
              <span>{t.sendDemo}</span>
            </button>

            <button
              onClick={() => onScrollTo('#philosophy')}
              className="px-6 py-3 bg-transparent text-neutral-800 hover:text-brand-blue font-mono text-xs font-bold tracking-widest transition-all cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-neutral-200 hover:after:bg-brand-blue uppercase font-bold"
            >
              {t.philosophy}
            </button>
          </motion.div>

        </div>
      </div>

      {/* Roster splits overview */}
      <div className="max-w-[1250px] mx-auto w-full z-10 border-t border-neutral-200/70 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-12">
        
        {/* Simple indicators */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-wider text-neutral-500">
          <span className="flex items-center gap-1.5 font-bold text-neutral-900 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
            {isRu ? 'ЧЕСТНЫЙ СПЛИТ 80/20' : 'FAIR 80/20 SPLIT'}
          </span>
          <span className="flex items-center gap-1.5 font-bold text-neutral-900 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
            {isRu ? 'ПРОЗРАЧНЫЕ УСЛОВИЯ СЛУЖБЫ' : 'TRANSPARENT VALUE ALLIANCE'}
          </span>
          <span className="flex items-center gap-1.5 font-bold text-neutral-900 uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
            {isRu ? 'ОТПРАВКА НА ВСЕ ПЛОЩАДКИ' : 'COMPLETE STORES DELIVERY'}
          </span>
        </div>

        {/* Dynamic metrics */}
        <div key={lang + "-metrics"} className="flex gap-12 font-mono text-left">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] tracking-wider text-neutral-400 uppercase">{t.royaltyDesc}</span>
            <span className="text-xs font-black tracking-widest text-brand-orange">{t.royaltyDistribution}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] tracking-wider text-neutral-400 uppercase">{t.supplyDesc}</span>
            <span className="text-xs font-black tracking-widest text-neutral-900">{t.supplyChannels}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] tracking-wider text-neutral-400 uppercase">{t.deliveryDesc}</span>
            <span className="text-xs font-black tracking-widest text-neutral-900">{t.deliverySpeed}</span>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[8px] tracking-[0.3em] font-mono text-[#7e8c9c] z-10 uppercase">
        <span>{t.scrollIndicator}</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3 h-3 text-brand-orange" />
        </motion.div>
      </div>
    </section>
  );
}
