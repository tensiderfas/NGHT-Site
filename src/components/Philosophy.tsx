import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Scale, Globe, ArrowUpRight, Database, Sparkles } from 'lucide-react';
import { translations } from '../translations';

interface PhilosophyProps {
  lang: 'RU' | 'EN';
  onScrollTo?: (selector: string) => void;
}

export default function Philosophy({ lang, onScrollTo }: PhilosophyProps) {
  const isRu = lang === 'RU';
  const t = translations[lang];

  const tenets = [
    {
      number: "01",
      icon: ShieldCheck,
      colorClass: "text-brand-blue",
      containerClass: "bg-brand-blue/10 border-brand-blue/20 dark:border-brand-blue/30 text-brand-blue",
      hoverClass: "group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white",
      title: t.phil1Title,
      description: t.phil1Desc
    },
    {
      number: "02",
      icon: Scale,
      colorClass: "text-brand-turquoise",
      containerClass: "bg-brand-turquoise/10 border-brand-turquoise/20 dark:border-brand-turquoise/30 text-brand-turquoise",
      hoverClass: "group-hover:bg-brand-turquoise group-hover:border-brand-turquoise group-hover:text-neutral-950",
      title: t.phil2Title,
      description: t.phil2Desc
    },
    {
      number: "03",
      icon: Flame,
      colorClass: "text-brand-blue",
      containerClass: "bg-brand-blue/10 border-brand-blue/20 dark:border-brand-blue/30 text-brand-blue",
      hoverClass: "group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white",
      title: t.phil3Title,
      description: t.phil3Desc
    },
    {
      number: "04",
      icon: Globe,
      colorClass: "text-brand-turquoise",
      containerClass: "bg-brand-turquoise/10 border-brand-turquoise/20 dark:border-brand-turquoise/30 text-brand-turquoise",
      hoverClass: "group-hover:bg-brand-turquoise group-hover:border-brand-turquoise group-hover:text-neutral-950",
      title: t.phil4Title,
      description: t.phil4Desc
    }
  ];

  return (
    <section
      id="philosophy"
      className="py-24 md:py-32 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden relative border-b border-neutral-200/60 dark:border-neutral-900/60"
    >
      {/* Absolute Grid overlay background matching clean tech lines */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.015] pointer-events-none" />

      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-neutral-200/60 dark:border-neutral-900/60 pb-12 mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold text-left">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
              <span>{t.philBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-[1.1] text-neutral-950 dark:text-white uppercase text-left">
              {t.philHeading}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right text-left">
            <p className="text-brand-blue font-mono text-xs tracking-wider uppercase font-bold">
              {t.philSubtextIntro}
            </p>
            <p className="text-neutral-600 dark:text-neutral-450 text-sm font-normal mt-2 max-w-[340px] lg:ml-auto leading-relaxed">
              {t.philSubtextDesc}
            </p>
          </div>
        </div>

        {/* Master Bento Layout Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 80/20 Staggered Bento Cell */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800/80 rounded-4xl p-8 md:p-10 shadow-xl relative overflow-hidden group">
            
            <div className="relative z-10 space-y-8 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#7e8c9c] uppercase font-bold flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-brand-blue" />
                  {isRu ? "ФОРМУЛА ДОХОДА" : "REVENUE MODEL"}
                </span>
                <span className="font-mono text-[9px] text-brand-turquoise font-black uppercase">
                  SECURE SPLIT
                </span>
              </div>

              {/* Spectacular Large Percentages Composition */}
              <div className="flex items-baseline gap-1 py-4 select-none">
                <span className="font-display text-8xl md:text-9xl font-black text-neutral-950 dark:text-white tracking-tighter leading-none">
                  80
                </span>
                <span className="text-brand-blue font-display text-4xl md:text-5xl font-black mr-4">/</span>
                <span className="font-display text-5xl md:text-6xl font-black text-neutral-400 dark:text-neutral-600 tracking-tight leading-none">
                  20
                </span>
              </div>

              {/* Dynamic Range Line representing 80/20 Ratio split */}
              <div className="space-y-2">
                <div className="h-2.5 w-full bg-neutral-100 dark:bg-neutral-950 rounded-full overflow-hidden flex">
                  <div className="h-full w-[80%] bg-gradient-to-r from-brand-blue to-brand-turquoise" />
                  <div className="h-full w-[20%] bg-neutral-300 dark:bg-neutral-800" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase font-bold">
                  <span>{isRu ? "80% Артисту" : "80% To Artist"}</span>
                  <span>{isRu ? "20% Платформе" : "20% To Platform"}</span>
                </div>
              </div>

              <div className="text-left space-y-3 pt-2">
                <h3 className="text-xl font-display font-black text-neutral-950 dark:text-neutral-50 uppercase leading-snug">
                  {isRu ? "Честная дистрибуция без подводных камней" : "Pure distribution without hidden traps"}
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
                  {isRu 
                    ? "Все авторские права остаются полностью вашими. Мы осуществляем прозрачную доставку на площадки, Content ID администрирование и оказываем прямую помощь за фиксированные 20% комиссии." 
                    : "All rights belong completely to you. We take a transparent 20% cut solely for distribution service, playlist submission, and manual technical support."}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-850/60 flex items-center justify-between relative z-10">
              <button 
                onClick={() => onScrollTo ? onScrollTo('#submit-demo') : undefined}
                className="group px-6 py-3.5 bg-brand-blue hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-950 text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md"
              >
                <span>{isRu ? 'ОТПРАВИТЬ СИНГЛ' : 'SUBMIT TRACK'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Tenets Grid with Fine Architectural Styling and unconditionally readable text */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {tenets.map((tenet, idx) => {
              const IconComponent = tenet.icon;
              return (
                <div
                  key={tenet.title}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800/80 p-6 md:p-8 rounded-3xl flex flex-col justify-between group hover:border-brand-blue/30 dark:hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 text-left relative overflow-hidden"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-[10px] text-neutral-500 group-hover:text-brand-blue transition-colors uppercase font-bold">
                        {isRu ? `РАЗДЕЛ // ${tenet.number}` : `SECTION // ${tenet.number}`}
                      </span>
                      <div className={`p-2 border rounded-xl flex items-center justify-center transition-all duration-300 ${tenet.containerClass} ${tenet.hoverClass}`}>
                        <IconComponent className="w-5 h-5 stroke-[2] transition-colors duration-300" />
                      </div>
                    </div>

                    <h3 className="font-display text-sm md:text-base font-black tracking-wide text-neutral-950 dark:text-neutral-50 uppercase mb-3 leading-tight">
                      {tenet.title}
                    </h3>
                  </div>

                  {/* Unconditionally highly-readable text contrast */}
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal mt-4">
                    {tenet.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* High-tech simple info footer banner */}
        <div className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800/80 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[9px] font-mono text-neutral-500 tracking-widest uppercase font-bold text-left">
          <span>{isRu ? 'ОТКРЫТЫЙ ЛИЦЕНЗИОННЫЙ ДОГОВОР' : '100% INTELLECTUAL PROPERTY GUARANTEED'}</span>
          <span>{isRu ? 'БЕЗ СКРЫТЫХ ПЛАТЕЖЕЙ И ШТРАФОВ' : 'NO HIDDEN PENALTIES OR FEES'}</span>
        </div>

      </div>
    </section>
  );
}
