import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import { MediaVisionLogo } from './Partners';

interface PartnersTeaserProps {
  lang: 'RU' | 'EN';
  onViewAll: () => void;
}

export default function PartnersTeaser({ lang, onViewAll }: PartnersTeaserProps) {
  const isRu = lang === 'RU';

  return (
    <section 
      id="partners-teaser-section" 
      className="py-20 md:py-28 px-6 md:px-12 bg-white relative overflow-hidden border-t border-neutral-100"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/40 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/40 pointer-events-none hidden md:block" />

      <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Text headings */}
        <div className="lg:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/5 border border-brand-orange/15 text-brand-orange rounded-full text-[9px] font-mono font-black tracking-[0.2em] uppercase select-none">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-brand-orange" />
            <span>NIGHTVOLT // {isRu ? 'ПАРТНЕРСТВО' : 'COLLABORATIONS'}</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 uppercase">
            {isRu ? 'ПАРТНЕРСКИЕ ЛЕЙБЛЫ' : 'COLLABORATING LABELS'}
          </h2>

          <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            {isRu 
              ? 'С нашей музыкальной платформой и сообществом NIGHTVOLT сотрудничают современные музыкальные лейблы и глобальные дистрибьюторы. Мы кооперируемся для совместного издания релизов, синергетического промоушена независимой сцены и расширения дистрибьюторской сети.'
              : 'Independent music labels and world-class digital distributors collaborate with the NIGHTVOLT ecosystem. Together, we work on joint catalog releases, manage high-impact campaign syndicates, and expand overall promotional reach.'}
          </p>

          <div className="pt-4">
            <button
              onClick={onViewAll}
              className="px-6 py-3.5 bg-brand-orange text-white hover:bg-neutral-900 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer active:scale-97 hover:shadow-lg hover:shadow-brand-orange/15 hover:-translate-y-0.5 inline-flex items-center gap-2 group uppercase"
            >
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              <span>{isRu ? 'ОТКРЫТЬ ПАРТНЕРСКУЮ СЕТЬ' : 'EXPLORE PARTNERS NETWORK'}</span>
            </button>
          </div>
        </div>

        {/* Right column: Beautifully featured partner layoutcard */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-50 border border-neutral-200/90 rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-brand-orange/40 duration-300">
            {/* Ambient overlay details */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/[0.015] rounded-bl-full pointer-events-none group-hover:bg-brand-orange/[0.03] transition-all" />
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-6">
              <div className="p-3 bg-white border border-neutral-200/60 rounded-xl shadow-xs">
                <MediaVisionLogo />
              </div>
              <span className="px-3 py-1 bg-brand-orange text-white text-[9px] font-mono font-bold rounded-full tracking-widest uppercase select-none">
                {isRu ? 'ЛЕЙБЛ-ПАРТНЕР' : 'PARTNER LABEL'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-black text-neutral-900 tracking-tight group-hover:text-brand-orange transition-colors uppercase">
                  Media Vision Group
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  <span>{isRu ? 'МУЗЫКАЛЬНЫЙ ЛЕЙБЛ И ДИСТРИБЬЮТОР' : 'MUSIC LABEL & DISTRIBUTOR'}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
                {isRu 
                  ? 'Прогрессивный музыкальный лейбл и дистрибьютор, сотрудничающий с NIGHTVOLT в целях совместного издания каталогов, взаимного продвижения новейших музыкальных релизов и расширения аудиторного охвата наших артистов по всему миру.'
                  : 'A progressive music label and distributor collaborating with NIGHTVOLT to co-publish catalogs, drive synergistic release promotions, and expand overall artist reach across streaming networks globally.'}
              </p>

              <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between gap-4">
                <a
                  href="https://mediavisiongroup.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 hover:text-brand-orange transition-colors uppercase group/link"
                >
                  <span>mediavisiongroup.agency</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-brand-orange transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
