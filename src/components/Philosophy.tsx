import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Scale, Globe, ArrowUpRight, TrendingUp } from 'lucide-react';
import { translations } from '../translations';

interface PhilosophyProps {
  lang: 'RU' | 'EN';
}

export default function Philosophy({ lang }: PhilosophyProps) {
  const isRu = lang === 'RU';
  const t = translations[lang];

  const tenets = [
    {
      number: "01",
      icon: ShieldCheck,
      colorClass: "text-[#ff3c00]",
      containerClass: "bg-[#ff3c00]/10 border-[#ff3c00]/20 text-[#ff3c00]",
      hoverClass: "group-hover:bg-[#ff3c00] group-hover:border-[#ff3c00] group-hover:text-white",
      title: t.phil1Title,
      description: t.phil1Desc
    },
    {
      number: "02",
      icon: Scale,
      colorClass: "text-brand-blue",
      containerClass: "bg-brand-blue/10 border-brand-blue/20 text-brand-blue",
      hoverClass: "group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white",
      title: t.phil2Title,
      description: t.phil2Desc
    },
    {
      number: "03",
      icon: Flame,
      colorClass: "text-[#ff3c00]",
      containerClass: "bg-[#ff3c00]/10 border-[#ff3c00]/20 text-[#ff3c00]",
      hoverClass: "group-hover:bg-[#ff3c00] group-hover:border-[#ff3c00] group-hover:text-white",
      title: t.phil3Title,
      description: t.phil3Desc
    },
    {
      number: "04",
      icon: Globe,
      colorClass: "text-brand-blue",
      containerClass: "bg-brand-blue/10 border-brand-blue/20 text-brand-blue",
      hoverClass: "group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white",
      title: t.phil4Title,
      description: t.phil4Desc
    }
  ];

  return (
    <section
      id="philosophy"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent text-neutral-900 dark:text-neutral-100 overflow-hidden relative border-b border-neutral-200/60 dark:border-neutral-800/60"
    >
      {/* Background Grid Lines Pattern matching orange/red themed grid */}
      <div className="absolute inset-0 opacity-[0.012] bg-[linear-gradient(to_right,var(--color-brand-blue)_1.5px,transparent_1.5px),linear-gradient(to_bottom,var(--color-brand-blue)_1.5px,transparent_1.5px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
              <span>{t.philBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-[1.1] text-neutral-950 dark:text-neutral-50 uppercase">
              {t.philHeading}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-brand-blue font-mono text-xs tracking-wider uppercase font-bold">
              {t.philSubtextIntro}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm font-light mt-2 max-w-[340px] lg:ml-auto leading-relaxed">
              {t.philSubtextDesc}
            </p>
          </div>
        </div>

        {/* 80/20 Splitting Display Callout */}
        <div className="mb-16 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-neutral-100 dark:border-neutral-800 pointer-events-none rounded-bl-3xl bg-neutral-50/50 dark:bg-neutral-900/50 flex items-center justify-center font-mono text-[10px] text-neutral-300 dark:text-neutral-750">
            80/20 SPLIT
          </div>

          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue shrink-0 border border-brand-blue/10 pink-glow">
              <TrendingUp className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-widest text-[#7e8c9c] uppercase font-bold">
                {isRu ? "ПРОЗРАЧНЫЕ УСЛОВИЯ" : "ROSTER SPLIT CONDITIONS"}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-black text-neutral-950 dark:text-neutral-50 uppercase mt-1">
                {isRu ? "80% ПОЛУЧАЕТ АРТИСТ / 20% ЛЕЙБЛ РОЯЛТИ" : "80% TO ARTIST / 20% TO THE LABEL"}
              </h3>
              <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light mt-1.5 max-w-[650px] leading-relaxed">
                {isRu 
                  ? "Право на ваше творчество полностью принадлежит вам. Мы берем за дистрибуцию, сбор Content ID и личную поддержку ровную прозрачную долю 20%, выплачивая вам 80% роялти со всех стримингов." 
                  : "All original author rights belong fully to you. We take a minimal transparent share of 20% for distribution, catalog management, and personal support, giving you 80% of earnings."}
              </p>
            </div>
          </div>
          <div className="shrink-0 z-10">
            <div className="px-6 py-3 bg-brand-blue text-white font-mono text-[11px] font-bold tracking-widest uppercase rounded-full flex items-center gap-2">
              <span>{isRu ? 'ОТЛИЧНЫЕ УСЛОВИЯ' : 'FAIR SPLIT'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Philosophy Stagger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800">
          {tenets.map((tenet, idx) => {
            const IconComponent = tenet.icon;
            return (
              <motion.div
                key={tenet.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-[#121315] p-8 md:p-10 flex flex-col justify-between group hover:bg-[#faf9fc] dark:hover:bg-[#151619] transition-colors duration-300 relative border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-mono text-xs text-[#7e8c9c] group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors uppercase font-bold">
                      РАЗДЕЛ {tenet.number}
                    </span>
                    <div className={`p-2.5 border rounded-xl flex items-center justify-center transition-all duration-300 ${tenet.containerClass} ${tenet.hoverClass}`}>
                      <IconComponent className="w-[22px] h-[22px] stroke-[2.25] transition-all duration-300" />
                    </div>
                  </div>

                <h3 className="font-display text-base md:text-lg font-black tracking-wide text-neutral-950 dark:text-neutral-50 uppercase mb-4 leading-tight">
                  {tenet.title}
                </h3>
              </div>

              <p className="text-xs md:text-sm text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors leading-relaxed font-light mt-6">
                {tenet.description}
              </p>
            </motion.div>
          );
        })}
      </div>

        {/* Beautiful info bar */}
        <div className="mt-16 border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono text-[#7e8c9c] tracking-wider uppercase">
          <span>{isRu ? 'БЕЗСКРЫТЫХ ПЛАТЕЖЕЙ И СЛОЖНЫХ СХЕМ' : 'NO HIDDEN PAYMENTS OR COMPLEX PLANS'}</span>
          <span>{isRu ? 'ПРОСТОЙ ДОГОВОР НА ДИСТРИБУЦИЮ' : 'SIMPLIFIED DISTRIBUTION AGREEMENT'}</span>
        </div>

      </div>
    </section>
  );
}
