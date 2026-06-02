import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface AboutTeaserProps {
  lang: 'RU' | 'EN';
  onReadFull: () => void;
}

export default function AboutTeaser({ lang, onReadFull }: AboutTeaserProps) {
  const isRu = lang === 'RU';

  return (
    <section
      id="about-platform"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative block border-b border-neutral-200 overflow-hidden"
    >
      {/* Design alignment grids */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />

      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
              <span>{isRu ? "О ПЛАТФОРМЕ // CHRONICLES" : "PLATFORM ORIGINS // MISSION"}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 uppercase">
              {isRu ? "НАШ ОРИЕНТИР И ИСТОРИЯ" : "OUR VISION & ROOTS"}
            </h2>
          </div>
          <div className="md:text-right">
            <span className="text-xs font-mono tracking-widest text-[#7e8c9c] font-bold uppercase">
              {isRu ? "ОСНОВАН 30 МАЯ 2025" : "FOUNDED MAY 30, 2025"}
            </span>
          </div>
        </div>

        {/* Teaser content block layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-neutral-200 p-8 md:p-14 rounded-3xl relative overflow-hidden group hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300">
          
          {/* Subtle light background glowing blue orb */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-blue/10 transition-all duration-500" />
          
          <div className="lg:col-span-7 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-6 text-brand-blue">
                <Calendar className="w-4 h-4" />
                <span className="font-mono text-[11px] font-black tracking-wider uppercase">
                  {isRu ? "ВЕСНА 2025 ГОДА" : "SPRING 2025 GENESIS"}
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3.5xl font-black text-neutral-950 uppercase mb-6 leading-[1.1] tracking-tight">
                {isRu 
                  ? "СВОБОДНЫЙ ЛЕЙБЛ ДЛЯ СВОБОДНЫХ ХУДОЖНИКОВ" 
                  : "SOVEREIGN LAUNCH SYSTEM FOR HONEST MUSICIANS"}
              </h3>

              <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed mb-6 max-w-xl">
                {isRu
                  ? "Мы запустились весной — 30 мая 2025 года. NIGHTVOLT создавался как простое и понятное место, где твою музыку ценят, быстро отправляют на стриминги и не пытаются забрать права на твои песни. Всё честно и прозрачно."
                  : "We launched in Spring — on May 30th, 2025. NIGHTVOLT was crafted to be an honest, simple haven where your tracks are valued, shipped to global stores instantly, and your master rights remain entirely yours. Full clarity."}
              </p>

              <div className="font-mono text-xs text-[#7e8c9c] font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{isRu ? "ЕДИНОЛИЧНЫЙ ОСНОВАТЕЛЬ: ИЛЬЯ // CEO" : "FOUNDED & DIRECTED ONLY BY ILYA // CEO"}</span>
              </div>
            </div>

            {/* Read Button */}
            <div className="pt-4 border-t border-neutral-100 mt-6">
              <button
                onClick={onReadFull}
                className="group flex items-center gap-3 px-6 py-3 bg-brand-blue hover:bg-neutral-950 text-white font-mono text-[11px] font-bold tracking-widest rounded-full transition-all duration-300 active:scale-95 cursor-pointer shadow-md hover:shadow-brand-blue/15"
              >
                <span>{isRu ? "ПОДРОБНЕЕ О МИССИИ" : "OPEN PLATFORM MISSION STORY"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-950 text-white rounded-2xl border border-neutral-800 p-8 relative overflow-hidden z-10 shadow-lg">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <span className="font-mono text-[9px] tracking-widest text-brand-orange font-bold uppercase block mb-1">
                {isRu ? "ГЛАВНОЕ ОБЕЩАНИЕ" : "GUARANTEE"}
              </span>
              <h4 className="font-display text-lg font-black text-white uppercase tracking-wide mb-4">
                {isRu ? "ПОЛНАЯ СВОБОДА" : "TOTAL SOVEREIGNTY"}
              </h4>

              <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                {isRu 
                  ? "Мы никогда не заберём твои песни. Никаких долгосрочных кабальных договоров, никаких скрытых удержаний и сложных барьеров. Только музыка и прямая поддержка на каждом этапе."
                  : "We will never lock your catalog down. No long restricting contracts, no hidden commissions, and no technical blockages. Just pure music and live companion help."}
              </p>
            </div>

            {/* Quick value assertion button look */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[11px] text-[#a3bdf0] font-mono font-bold leading-relaxed flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand-orange" />
              <span>
                {isRu 
                  ? "Права остаются у тебя на 100%."
                  : "100% control belongs to you."}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
