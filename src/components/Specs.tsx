import React from 'react';
import { motion } from 'motion/react';
import { Server, ShieldCheck, Database, Radio, Code2, HeadphonesIcon } from 'lucide-react';
import { translations } from '../translations';

interface SpecsProps {
  lang: 'RU' | 'EN';
}

export default function Specs({ lang }: SpecsProps) {
  const isRu = lang === 'RU';
  const t = translations[lang];

  const specCards = [
    {
      icon: HeadphonesIcon,
      tag: isRu ? "ЗАПИСЬ И ЗВУК // SOUND QUALITY" : "SOUND QUALITY // INGEST",
      title: isRu ? "Высокое Качество Звука" : "High Quality Sound Support",
      desc: isRu 
        ? "Мы аккуратно переносим ваши оригинальные WAV и FLAC Lossless файлы на стриминги без малейших потерь в качестве и сжатия частот."
        : "We deliver your original WAV and FLAC Lossless files directly to global stores with zero compression or quality loss."
    },
    {
      icon: Code2,
      tag: isRu ? "БЕЗ ОШИБОК // ACCURATE RELEASES" : "ACCURATE DATA // SYSTEM",
      title: isRu ? "Чистые Метаданные и Карточки" : "Accurate Metadata Profiles",
      desc: isRu
        ? "Полное сохранение данных о релизе. Исключает потерю соавторов или случайное создание пустых дублей карточек артистов на площадках."
        : "Accurate store delivery. Fully eliminates profile errors, missing co-creators, or duplicate artist pages."
    },
    {
      icon: Radio,
      tag: isRu ? "ИСКАТЬ В СЕТИ // FINGERPRINTS" : "FINGERPRINTS // CONTENT SECURITY",
      title: isRu ? "Автоматический Content ID" : "Automated Content ID",
      desc: isRu
        ? "Быстрое присвоение кодов ISRC / UPC и передача треков в системы детекции YouTube, VK, TikTok и Instagram Reels для сбора монетизации с видео."
        : "Quick allocation of ISRC/UPC tags and prompt distribution to YouTube, TikTok, and Instagram Reels copyright databases."
    },
    {
      icon: Database,
      tag: isRu ? "ЧЕСТНЫЙ СПЛИТ // TRANSFERS" : "FAIR PAYMENTS // TRANSFERS",
      title: isRu ? "Мгновенные выплаты авторам" : "Instant Payments Dispatch",
      desc: isRu
        ? "Доходы делятся автоматически согласно указанным долям релиза (наш сплит 80/20). Каждый соавтор может выводить деньги лично."
        : "Streaming revenues are automatically divided between team members based on selected rates. Everyone can withdraw their share."
    },
    {
      icon: Server,
      tag: isRu ? "БЫСТРАЯ СЪЕМКА // RAPID DELIVERY" : "FAST DELIVERY // UPLOAD",
      title: isRu ? "Скоростная отгрузка на витрины" : "High-speed Content Delivery",
      desc: isRu
        ? "Прямые настроенные каналы доставки. Ваша музыка проходит модерацию в среднем за 12-24 часа вместо недель ожидания."
        : "Direct delivery streams. Your releases pass store review in just 12-24 hours instead of weeks of waiting."
    },
    {
      icon: ShieldCheck,
      tag: isRu ? "ЗАЩИТА ПРАВ // GUARANTEED COPYRIGHT" : "RIGHTS PROTECTION // LEGAL",
      title: isRu ? "Мониторинг авторских прав" : "Active Copyright Monitoring",
      desc: isRu
        ? "Автоматическое отслеживание несанкционированных перезаливов ваших треков и перенаправление всей прибыли обратно на ваш баланс."
        : "Background tracking of duplicate uploads across services. Re-routes streaming revenue back to your catalog profile."
    }
  ];

  return (
    <section
      id="tech-specs"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative block border-b border-neutral-200"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />

      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
              <span>{t.techBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 uppercase">
              {t.techHeading}
            </h2>
          </div>
          <div className="md:text-right">
            <span className="text-xs font-mono tracking-widest text-[#7e8c9c] font-bold uppercase">{t.techSubtext}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
          {specCards.map((spec, idx) => {
            const IconComponent = spec.icon;
            return (
              <motion.div
                key={spec.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-8 border border-transparent hover:border-neutral-200 md:p-10 flex flex-col justify-between group hover:bg-[#fafafc] transition-colors duration-300 rounded-2xl md:rounded-none"
              >
                <div>
                  {/* Header Tag */}
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[9px] tracking-widest text-[#7e8c9c] font-bold group-hover:text-neutral-800 uppercase">
                      {spec.tag}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-blue text-brand-blue group-hover:text-white">
                      <IconComponent className="w-5 h-5 transition-colors duration-300" />
                    </div>
                  </div>

                <h3 className="font-display text-base font-black text-neutral-950 uppercase tracking-wide">
                  {spec.title}
                </h3>
                
                <p className="text-xs md:text-sm text-neutral-500 font-light mt-4 leading-relaxed">
                  {spec.desc}
                </p>
              </div>

              {/* Minimal Bottom border transition with orange-red accent */}
              <div className="w-0 group-hover:w-full h-[1.5px] bg-brand-orange transition-all duration-500 mt-8" />
            </motion.div>
          );
        })}
      </div>

        {/* Simplified technology verification banner */}
        <div className="mt-16 bg-[#fafafc] border border-neutral-200 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-brand-orange animate-pulse shrink-0" />
            <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
              {t.techSecureDesc}
            </p>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-[#7e8c9c] font-bold uppercase whitespace-nowrap">
            {isRu ? 'СТАТУС СЕРВИСА: РАБОТАЕТ СТАБИЛЬНО' : 'PLATFORM STATUS: FULLY ONLINE'}
          </div>
        </div>

      </div>
    </section>
  );
}
