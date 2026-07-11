import React from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  Radio 
} from 'lucide-react';
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
      className="py-24 md:py-32 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden border-t border-neutral-200/60 dark:border-neutral-900/60"
    >
      <div className="max-w-[1250px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left column: Text headings & Stats Indicator */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.25em] mb-4 uppercase font-bold text-left">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
            <span>{isRu ? 'ПАРТНЕРСТВО // СЕТЬ' : 'SYNDICATE NETWORK'}</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight text-neutral-950 dark:text-white uppercase">
            {isRu ? 'ПАРТНЕРСКИЕ ЛЕЙБЛЫ' : 'COLLABORATING LABELS'}
          </h2>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed max-w-[480px]">
            {isRu 
              ? 'С нашей музыкальной платформой сотрудничают современные музыкальные лейблы и дистрибьюторские объединения. Мы кооперируемся для совместного издания каталогов, взаимного продвижения релизов и расширения дистрибьюторской сети.'
              : 'Independent music labels and world-class digital groups collaborate with the NIGHTVOLT ecosystem. Together, we work on joint catalog releases, run campaign collaborations, and expand overall reach.'}
          </p>

          {/* Mini matrix statistics panel */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-neutral-200 dark:border-neutral-800 my-6 max-w-[440px]">
            <div>
              <span className="block font-display text-2xl font-black text-neutral-950 dark:text-white">12+</span>
              <span className="block font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider mt-1">
                {isRu ? "Лейблов" : "Active Labels"}
              </span>
            </div>
            <div>
              <span className="block font-display text-2xl font-black text-neutral-950 dark:text-white">180+</span>
              <span className="block font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider mt-1">
                {isRu ? "Каналов" : "Ingest Outlets"}
              </span>
            </div>
            <div>
              <span className="block font-display text-2xl font-black text-neutral-950 dark:text-white">80%</span>
              <span className="block font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider mt-1">
                {isRu ? "Выплаты" : "Direct Payouts"}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onViewAll}
              className="px-8 py-4 bg-brand-blue text-white hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-950 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer inline-flex items-center gap-2.5 group uppercase shadow-sm"
            >
              <span>{isRu ? 'ОТКРЫТЬ ПАРТНЕРСКУЮ СЕТЬ' : 'EXPLORE PARTNERS NETWORK'}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right column: High-fidelity clean partner console card */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300 flex flex-col justify-between min-h-[360px]">
            {/* Subtle hover top bar accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
            
            <div>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-8">
                {/* Genuine Logo frame */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl shadow-sm">
                  <MediaVisionLogo />
                </div>
                
                {/* Active connection metrics */}
                <div className="flex items-center gap-4">
                  <span className="px-3.5 py-1 bg-brand-blue/10 dark:bg-brand-blue/15 text-brand-blue text-[9px] font-mono font-black rounded-full tracking-widest uppercase">
                    {isRu ? 'ОСНОВНОЙ ПАРТНЕР' : 'KEY COLLABORATOR'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-black text-neutral-950 dark:text-white tracking-tight group-hover:text-brand-blue transition-colors uppercase">
                    Media Vision Group
                  </h3>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-500 font-bold uppercase tracking-wider">
                    <Radio className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{isRu ? 'МУЗЫКАЛЬНЫЙ ЛЕЙБЛ И КРЕАТИВНОЕ АГЕНТСТВО' : 'MUSIC LABEL & CREATIVE AGENCY'}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-[540px]">
                  {isRu 
                    ? 'Современный музыкальный лейбл и креативное агентство, активно сотрудничающее с NIGHTVOLT для совместной дистрибуции каталогов, синергетического промоушена и реализации масштабных проектов артистов нового поколения.'
                    : 'A progressive music label and creative agency collaborating with NIGHTVOLT to co-publish catalogs, drive synergistic release promotions, and expand overall artist reach.'}
                </p>
              </div>
            </div>

            {/* Ingress status footer with website link */}
            <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-[9px] text-neutral-500 uppercase font-bold">
                <Layers className="w-3.5 h-3.5 text-brand-blue" />
                <span>{isRu ? "СТАТУС ИНТЕГРАЦИИ // СВЯЗАН" : "INTEGRATION STATUS // CONNECTED"}</span>
              </div>
              
              <a
                href="https://mediavisiongroup.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-500 hover:text-brand-blue dark:hover:text-brand-turquoise transition-colors uppercase group/link"
              >
                <span>mediavisiongroup.agency</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover/link:text-brand-blue transition-transform duration-200" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
