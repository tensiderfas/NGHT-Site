import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Sparkles, BarChart3, ShieldCheck, Share2, DollarSign } from 'lucide-react';
import { translations } from '../translations';

interface ServicesProps {
  lang: 'RU' | 'EN';
}

export default function Services({ lang }: ServicesProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const isRu = lang === 'RU';
  const t = translations[lang];

  const services = [
    {
      title: t.serv1Title,
      description: t.serv1Desc,
      icon: Share2,
      details: t.serv1Details,
      metaCode: isRu ? "ДИСТРИБУЦИЯ // WEB DELIVERY" : "DISTRIBUTION // WEB DELIVERY"
    },
    {
      title: t.serv2Title,
      description: t.serv2Desc,
      icon: BarChart3,
      details: t.serv2Details,
      metaCode: isRu ? "СТАТИСТИКА // DETAILED ANALYTICS" : "ANALYTICS // DETAILED STATS"
    },
    {
      title: t.serv3Title,
      description: t.serv3Desc,
      icon: DollarSign,
      details: t.serv3Details,
      metaCode: isRu ? "АВТОМАТ СПЛИТОВ // REVENUE SPLITS" : "REVENUE SPLITS // AUTOMATION"
    },
    {
      title: t.serv4Title,
      description: t.serv4Desc,
      icon: ShieldCheck,
      details: t.serv4Details,
      metaCode: isRu ? "ЗАЩИТА ПРАВ // CONTENT PROTECTION" : "COPYRIGHT // RIGHTS PROTECTION"
    },
    {
      title: t.expandedPromoTitle,
      description: t.expandedPromoDesc,
      icon: Sparkles,
      details: t.expandedPromoDetails,
      metaCode: isRu ? "ПРОДВИЖЕНИЕ // MUSIC PROMOTION" : "PROMOTION // MUSIC PROMOTION"
    }
  ];

  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative block border-b border-neutral-200/50"
    >
      {/* Decorative vertical architectural line overlays */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/10 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/10 pointer-events-none hidden md:block" />

      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.2em] mb-4 uppercase">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
              <span>{t.servBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-none text-neutral-950 uppercase">
              {t.servHeading}
            </h2>
          </div>
          <div className="md:text-right">
            <span className="text-xs font-mono tracking-widest text-[#7e8c9c] font-bold uppercase">{t.servSubtext}</span>
          </div>
        </div>

        {/* Bento Service Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Left Column - Service Selector Tabs */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-3 justify-center">
            {services.map((service, idx) => {
              const isActive = activeIdx === idx;
              const IconComponent = service.icon;
              return (
                <button
                  key={service.title}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`w-full p-5 text-left border rounded-3xl transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/15'
                      : 'bg-[#fafafc] border-neutral-200/80 text-neutral-800 hover:border-brand-blue/30 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[9px] tracking-wider text-[#7e8c9c] font-bold uppercase">
                      {service.metaCode}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'translate-x-0 opacity-100 text-brand-orange' : '-translate-x-2 opacity-0 text-[#7e8c9c]'
                    }`} />
                  </div>
                  
                  <div className="flex items-center gap-2.5 mt-3 pointer-events-none">
                    <div className={`p-1.5 rounded-lg transition-colors duration-350 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-blue/10 text-brand-blue'
                    }`}>
                      <IconComponent className="w-4 h-4 stroke-[2.25]" />
                    </div>
                    <h3 className="font-display text-sm md:text-base font-black tracking-wide uppercase leading-none">
                      {service.title}
                    </h3>
                  </div>

                  <p className={`text-xs mt-2.5 leading-relaxed pointer-events-none ${
                    isActive ? 'text-neutral-300 font-light' : 'text-neutral-500 font-light'
                  }`}>
                    {service.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column - Active Service details */}
          <div className="lg:col-span-12 xl:col-span-7 bg-[#fafafc] border border-neutral-200/80 rounded-4xl p-8 md:p-12 flex flex-col justify-between relative min-h-[440px] overflow-hidden">
            
            <div className="absolute top-0 right-0 w-28 h-24 border-b border-l border-neutral-200/40 pointer-events-none flex items-center justify-center font-mono text-[8px] text-neutral-400 font-bold uppercase rounded-bl-3xl bg-white/50">
              NIGHTVOLT
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-grow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-brand-orange rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-brand-orange tracking-widest uppercase font-bold">
                      {t.servDetailBlueprint}
                    </span>
                  </div>

                  <h3 className="font-display text-lg md:text-3xl font-black text-neutral-950 mt-6 tracking-wide uppercase leading-none">
                    {services[activeIdx].title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-neutral-500 font-light tracking-wide mt-3.5 leading-relaxed max-w-[520px]">
                    {services[activeIdx].description}
                  </p>

                  <div className="h-[1px] bg-neutral-200/70 my-6" />

                  {/* Bullet speculative points */}
                  <div className="flex flex-col gap-3.5">
                    {services[activeIdx].details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                        </div>
                        <span className="text-xs md:text-sm text-neutral-700 tracking-wide font-normal">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simplified micro footnotes */}
                <div className="mt-12 flex items-center justify-between font-mono text-[9px] text-[#7e8c9c] border-t border-neutral-200/60 pt-6">
                  <span>{isRu ? 'ОТПРАВКА НА ПЛОЩАДКИ // IMMEDIATE DELIVERY' : 'STORES INGEST // IMMEDIATE DELIVERY'}</span>
                  <span>{isRu ? 'БЕЗСКРЫТЫХ ПЛАТЕЖЕЙ // NO EXTRA FEES' : 'NO EXTRA CHARGES // SECURE VALUE'}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
