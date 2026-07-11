import React from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  DollarSign, 
  FileText,
  Clock,
  Tags,
  Music
} from 'lucide-react';
import { translations } from '../translations';

interface ServicesProps {
  lang: 'RU' | 'EN';
}

export default function Services({ lang }: ServicesProps) {
  const isRu = lang === 'RU';
  const t = translations[lang];

  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950 relative block border-b border-neutral-200/60 dark:border-neutral-900/60 overflow-hidden"
    >
      {/* Background elegant decoration */}
      <div className="absolute top-1/4 right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 dark:bg-brand-blue/10 filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header with sleek asymmetric divider */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-neutral-200/60 dark:border-neutral-900/60 pb-10">
          <div>
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.25em] mb-4 uppercase font-bold text-left">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
              <span>{t.servBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 dark:text-white uppercase text-left">
              {t.servHeading}
            </h2>
          </div>
          <div className="md:text-right">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#7e8c9c] font-bold uppercase">
              <span className="w-1 h-1 rounded-full bg-brand-turquoise" />
              {isRu ? "// СИСТЕМА И ТЕХНОЛОГИИ" : "// ARCHITECTURE & CORE TECH"}
            </span>
          </div>
        </div>

        {/* Master Bento Grid Architecture - Premium Redesign */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Global Distribution (Double Column Span: 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl p-8 md:p-10 shadow-sm relative overflow-hidden group flex flex-col justify-between hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300">
            {/* Subtle hover top bar accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
            
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-brand-blue/10 dark:bg-brand-blue/15 border border-brand-blue/20 dark:border-brand-blue/30 rounded-2xl text-brand-blue animate-pulse">
                  <Share2 className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-black text-neutral-950 dark:text-white uppercase tracking-wide">
                    {t.serv1Title}
                  </h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono uppercase mt-0.5 tracking-wider">
                    {isRu ? "ГЛОБАЛЬНАЯ ОТГРУЗКА" : "GLOBAL DISTRIBUTION SERVICE"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed max-w-[620px]">
                {t.serv1Desc}
              </p>

              {/* Delivery specifications table */}
              <div className="py-5 border-y border-neutral-200/60 dark:border-neutral-800/60 my-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-left">
                    <span className="block font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider">{isRu ? "ПЛОЩАДКИ" : "STORES"}</span>
                    <span className="block font-display text-sm font-bold text-neutral-950 dark:text-white uppercase mt-0.5">180+ Platforms</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider">{isRu ? "КАЧЕСТВО" : "AUDIO QUALITY"}</span>
                    <span className="block font-display text-sm font-bold text-neutral-950 dark:text-white uppercase mt-0.5">Lossless WAV</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider">{isRu ? "СРОК СДАЧИ" : "SPEED"}</span>
                    <span className="block font-display text-sm font-bold text-neutral-950 dark:text-white uppercase mt-0.5">From 3 Days</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[9px] text-[#7e8c9c] uppercase font-bold tracking-wider">{isRu ? "КОДЫ" : "CODES"}</span>
                    <span className="block font-display text-sm font-bold text-neutral-950 dark:text-white uppercase mt-0.5">UPC & ISRC Free</span>
                  </div>
                </div>
              </div>

              {/* Specific features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {t.serv1Details.slice(0, 4).map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-left">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/15 border border-brand-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-blue stroke-[3]" />
                    </div>
                    <span className="text-xs text-neutral-800 dark:text-neutral-300 font-normal leading-snug">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              <span>{isRu ? "СТАНДАРТ: FLAC / WAV 24BIT" : "STD: LOSSLESS WAV 24BIT"}</span>
              <span className="text-brand-blue font-bold">{isRu ? "ПРЯМАЯ ОТГРУЗКА" : "DIRECT INGEST"}</span>
            </div>
          </div>

          {/* Card 2: Metadata integrity (Column Span: 5) */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl p-8 md:p-10 shadow-sm relative overflow-hidden group flex flex-col justify-between hover:border-brand-turquoise/30 dark:hover:border-brand-turquoise/20 transition-all duration-300">
            {/* Subtle hover top bar accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-turquoise to-brand-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
            
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-brand-turquoise/10 dark:bg-brand-turquoise/15 border border-brand-turquoise/20 dark:border-brand-turquoise/30 rounded-2xl text-brand-turquoise">
                  <Tags className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-black text-neutral-950 dark:text-white uppercase tracking-wide">
                    {t.serv2Title}
                  </h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono uppercase mt-0.5 tracking-wider">
                    {isRu ? "СТАНДАРТЫ DDEX" : "CREDIT INTEGRITY SCHEMA"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
                {t.serv2Desc}
              </p>

              {/* Spec board - clean non-interactive spec list */}
              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-6 rounded-3xl space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-neutral-200/40 dark:border-neutral-850 pb-2">
                  <span className="font-mono text-neutral-500 uppercase">{isRu ? "РАСПРЕДЕЛЕНИЕ" : "ROLES SUPPORT"}</span>
                  <span className="font-bold text-neutral-900 dark:text-white uppercase">{isRu ? "Музыканты, Лирики, Авторы" : "Composers, Writers, Producers"}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-neutral-200/40 dark:border-neutral-850 pb-2">
                  <span className="font-mono text-neutral-500 uppercase">{isRu ? "ИНТЕГРАЦИЯ" : "INGESTION PROTOCOL"}</span>
                  <span className="font-bold text-neutral-900 dark:text-white uppercase">DDEX XML Release v4</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-500 uppercase">{isRu ? "МОДЕРАЦИЯ" : "INTEGRITY GATEWAY"}</span>
                  <span className="font-bold text-neutral-900 dark:text-white uppercase">{isRu ? "Ручная и автоматическая" : "Dual Human-Automated check"}</span>
                </div>
              </div>

              {/* Checklist details */}
              <div className="space-y-3 pt-2">
                {t.serv2Details.slice(0, 2).map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-left text-xs text-neutral-800 dark:text-neutral-300 font-normal">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-turquoise flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/60 flex justify-between items-center text-[10px] font-mono text-neutral-500">
              <span>{isRu ? "СТАНДАРТЫ КАТАЛОГА" : "METADATA VALIDATOR"}</span>
              <span className="text-brand-turquoise font-bold uppercase">{isRu ? "БЕЗУПРЕЧНО" : "COMPLIANT"}</span>
            </div>
          </div>

          {/* Card 3: Pitching & Promo (Column Span: 4) */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl p-8 md:p-10 shadow-sm relative overflow-hidden group flex flex-col justify-between hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300">
            {/* Subtle hover top bar accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
            
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-brand-blue/10 dark:bg-brand-blue/15 border border-brand-blue/20 dark:border-brand-blue/30 rounded-2xl text-brand-blue">
                  <Sparkles className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black text-neutral-950 dark:text-white uppercase tracking-wide">
                    {t.serv3Title}
                  </h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono uppercase mt-0.5 tracking-wider">
                    {isRu ? "ПРОДВИЖЕНИЕ РЕЛИЗОВ" : "PLAYLIST PITCHING"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
                {t.serv3Desc}
              </p>

              {/* Specifications block */}
              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-5 rounded-3xl text-left space-y-3">
                <span className="font-mono text-[8px] text-neutral-400 font-bold uppercase tracking-wider block">
                  {isRu ? "ТРЕБОВАНИЯ ДЛЯ ПИТЧИНГА" : "EDITORIAL PITCHING SPECS"}
                </span>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-neutral-200/40 dark:border-neutral-850 pb-1.5">
                    <span className="text-neutral-500">{isRu ? "Сроки подачи" : "Submission lead"}</span>
                    <span className="text-brand-blue font-bold">{isRu ? "За 14 дней" : "14 Days Prior"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200/40 dark:border-neutral-850 pb-1.5">
                    <span className="text-neutral-500">{isRu ? "Ключевые витрины" : "Key DSPs"}</span>
                    <span className="text-neutral-800 dark:text-white font-bold">{isRu ? "Яндекс, ВК, Звук" : "Yandex, VK, Zvuk"}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>{isRu ? "Стоимость услуги" : "Campaign cost"}</span>
                    <span className="text-brand-turquoise font-bold">{isRu ? "Бесплатно" : "Free"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200/50 dark:border-neutral-800/60 text-[9px] font-mono text-neutral-500 leading-normal text-left">
              {isRu ? "* Подача промо-заявки не гарантирует попадание в плейлист, но максимизирует шансы" : "* Pitching submission does not guarantee selection by editorial curators"}
            </div>
          </div>

          {/* Card 4: Copyright Protection (Column Span: 4) */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl p-8 md:p-10 shadow-sm relative overflow-hidden group flex flex-col justify-between hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300">
            {/* Subtle hover top bar accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
            
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-brand-blue/10 dark:bg-brand-blue/15 border border-brand-blue/20 dark:border-brand-blue/30 rounded-2xl text-brand-blue">
                  <ShieldCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black text-neutral-950 dark:text-white uppercase tracking-wide">
                    {t.serv4Title}
                  </h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono uppercase mt-0.5 tracking-wider">
                    {isRu ? "ЗАЩИТА АВТОРСКИХ ПРАВ" : "COPYRIGHT DEFENSE ENGINE"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
                {t.serv4Desc}
              </p>

              {/* Status specifications list */}
              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-5 rounded-3xl space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-neutral-200/40 dark:border-neutral-850 pb-1.5">
                  <span className="text-neutral-500">YouTube Content ID</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase">{isRu ? "АКТИВНО" : "ACTIVE"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-200/40 dark:border-neutral-850 pb-1.5">
                  <span className="text-neutral-500">TikTok Audio Match</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase">{isRu ? "АКТИВНО" : "ACTIVE"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Shazam Sync</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase">{isRu ? "АКТИВНО" : "ACTIVE"}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200/50 dark:border-neutral-800/60 flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase">
              <FileText className="w-4 h-4 text-brand-blue" />
              <span>{isRu ? "ОФИЦИАЛЬНЫЙ ЦИФРОВОЙ КОНТРАКТ" : "DIGITAL AGREEMENT"}</span>
            </div>
          </div>

          {/* Card 5: Lyrics Delivery (Column Span: 4) */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl p-8 md:p-10 shadow-sm relative overflow-hidden group flex flex-col justify-between hover:border-brand-turquoise/30 dark:hover:border-brand-turquoise/20 transition-all duration-300">
            {/* Subtle hover top bar accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-turquoise to-brand-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
            
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-brand-turquoise/10 dark:bg-brand-turquoise/15 border border-brand-turquoise/20 dark:border-brand-turquoise/30 rounded-2xl text-brand-turquoise">
                  <Music className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black text-neutral-950 dark:text-white uppercase tracking-wide">
                    {t.expandedPromoTitle}
                  </h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono uppercase mt-0.5 tracking-wider">
                    {isRu ? "ДОСТАВКА ТЕКСТОВ" : "LYRIC DISTRIBUTION"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
                {t.expandedPromoDesc}
              </p>

              {/* Promo Specification Features list */}
              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-850 p-5 rounded-3xl space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-neutral-200/40 dark:border-neutral-850 pb-1.5">
                  <span className="text-neutral-500">{isRu ? "СИНХРОНИЗАЦИЯ" : "KARAOKE SYNC"}</span>
                  <span className="text-neutral-950 dark:text-white font-bold uppercase">{isRu ? "ПОСТРОЧНО" : "TIME-SYNCED"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-200/40 dark:border-neutral-850 pb-1.5">
                  <span className="text-neutral-500">{isRu ? "БАЗЫ ДАННЫХ" : "GLOBAL REGISTRIES"}</span>
                  <span className="text-neutral-950 dark:text-white font-bold uppercase">Musixmatch / Genius</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">{isRu ? "ЭКРАНЫ СТРИМИНГОВ" : "DISPLAY VISIBILITY"}</span>
                  <span className="text-neutral-950 dark:text-white font-bold uppercase">{isRu ? "Яндекс, ВК, Apple" : "Yandex, VK, Apple"}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200/50 dark:border-neutral-800/60 flex justify-between items-center text-[9px] font-mono text-neutral-500">
              <span>{isRu ? "СИНХРОНИЗИРОВАННЫЙ ТЕКСТ" : "LYRICS AUTO-INGESTION"}</span>
              <Clock className="w-4 h-4 text-brand-turquoise" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
