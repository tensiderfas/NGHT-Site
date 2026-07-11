import React from 'react';
import { Calendar, ArrowRight, Award } from 'lucide-react';

interface AboutTeaserProps {
  lang: 'RU' | 'EN';
  onReadFull: () => void;
}

export default function AboutTeaser({ lang, onReadFull }: AboutTeaserProps) {
  const isRu = lang === 'RU';

  return (
    <section
      id="about-platform"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative block border-b border-neutral-200/40 dark:border-neutral-900/40 overflow-hidden"
    >
      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-neutral-200/60 dark:border-neutral-900/60 pb-10">
          <div>
            <div className="flex items-center gap-2 text-brand-blue font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold text-left">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
              <span>{isRu ? "О ПЛАТФОРМЕ // МИССИЯ" : "PLATFORM ORIGINS // MISSION"}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 dark:text-white uppercase text-left">
              {isRu ? "НАШ ОРИЕНТИР И ИСТОРИЯ" : "OUR VISION & ROOTS"}
            </h2>
          </div>
          <div className="md:text-right text-left">
            <span className="text-xs font-mono tracking-widest text-[#7e8c9c] font-bold uppercase">
              {isRu ? "ОСНОВАН 30 МАЯ 2025" : "FOUNDED MAY 30, 2025"}
            </span>
          </div>
        </div>

        {/* Teaser content block layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 p-8 md:p-12 rounded-4xl relative overflow-hidden group hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300">
          {/* Subtle hover top bar accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
          
          <div className="lg:col-span-7 flex flex-col justify-between z-10 text-left">
            <div>
              <div className="flex items-center gap-2.5 mb-6 text-brand-blue">
                <Calendar className="w-4 h-4" />
                <span className="font-mono text-[11px] font-black tracking-wider uppercase">
                  {isRu ? "ВЕСНА 2025 ГОДА" : "SPRING 2025 GENESIS"}
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3.5xl font-black text-neutral-950 dark:text-white uppercase mb-6 leading-[1.1] tracking-tight">
                {isRu 
                  ? "СВОБОДНЫЙ ЛЕЙБЛ ДЛЯ СВОБОДНЫХ ХУДОЖНИКОВ" 
                  : "SOVEREIGN LAUNCH SYSTEM FOR HONEST MUSICIANS"}
              </h3>

              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed mb-6 max-w-xl">
                {isRu
                  ? "Мы запустились весной — 30 мая 2025 года. NIGHTVOLT создавался как понятное и надежное место, где музыку ценят, оперативно доставляют на стриминговые платформы и не накладывают лишних юридических ограничений. Все условия сотрудничества честны и прозрачны."
                  : "We launched in Spring — on May 30th, 2025. NIGHTVOLT was crafted to be an honest, simple haven where your tracks are valued, shipped to global stores efficiently, and your master rights remain entirely yours. Full clarity."}
              </p>

              <div className="font-mono text-xs text-[#7e8c9c] font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>{isRu ? "ОСНОВАТЕЛЬ: ИЛЬЯ // NIGHTVOLT" : "FOUNDED BY ILYA // NIGHTVOLT"}</span>
              </div>
            </div>

            {/* Read Button */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-6">
              <button
                onClick={onReadFull}
                className="group flex items-center gap-3 px-6 py-3 bg-brand-blue hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-950 text-white font-mono text-[11px] font-bold tracking-widest rounded-full transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
              >
                <span>{isRu ? "ПОДРОБНЕЕ О МИССИИ" : "OPEN PLATFORM MISSION STORY"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950 text-white rounded-3xl border border-neutral-800 p-8 relative overflow-hidden z-10 shadow-sm text-left">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <span className="font-mono text-[9px] tracking-widest text-brand-turquoise font-bold uppercase block mb-1">
                {isRu ? "ОСНОВНОЕ ПРАВИЛО" : "OUR COMMITMENT"}
              </span>
              <h4 className="font-display text-lg font-black text-white uppercase tracking-wide mb-4">
                {isRu ? "ПОЛНАЯ СВОБОДА ПРАВ" : "TOTAL RIGHTS OWNERSHIP"}
              </h4>

              <p className="text-xs text-neutral-400 font-normal leading-relaxed mb-6">
                {isRu 
                  ? "Мы никогда не забираем права на ваши произведения. Никаких кабальных долгосрочных обязательств, скрытых комиссий или сложных барьеров. Только музыка и прямая поддержка на каждом шаге."
                  : "We never take away your original songs. No long-term restrictive agreements, no hidden deductions, and no complicated barriers. Only clean music and direct support on every stage."}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-neutral-900">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-turquoise">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[8px] tracking-widest text-neutral-500 uppercase block font-bold">
                  {isRu ? "ПРОЗРАЧНЫЙ ПОДХОД" : "AUDITED SYSTEM"}
                </span>
                <span className="font-display text-[11px] uppercase font-bold text-neutral-200">
                  {isRu ? "100% ПРАВА У ВАС" : "100% RIGHTS GUARANTEED"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
