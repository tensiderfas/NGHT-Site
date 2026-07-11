import React from 'react';
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
      tag: isRu ? "БЕЗУПРЕЧНЫЙ ЗВУК" : "SOUND INTEGRITY",
      title: isRu ? "Оригинальное качество звука" : "Lossless Audio Delivery",
      desc: isRu 
        ? "Мы доставляем ваши оригинальные WAV и FLAC файлы на стриминговые платформы без малейшего сжатия частот или изменения динамического диапазона."
        : "We deliver your original WAV and FLAC files directly to global stores with zero frequency compression or dynamic loss."
    },
    {
      icon: Code2,
      tag: isRu ? "КОРРЕКТНЫЙ ИМПОРТ" : "METADATA VALIDITY",
      title: isRu ? "Чистая разметка метаданных" : "Accurate Contributor Metadata",
      desc: isRu
        ? "Полное сохранение информации о релизе. Предотвращает раздвоение карточек артистов на площадках и гарантирует правильный учет всех авторов."
        : "Complete store profile mapping. Fully eliminates artist profile duplication, missing co-creators, or database sync errors."
    },
    {
      icon: Radio,
      tag: isRu ? "АВТОМАТИЗАЦИЯ" : "SYSTEM INGESTION",
      title: isRu ? "Быстрое присвоение кодов" : "Automated Code Generation",
      desc: isRu
        ? "Бесплатная генерация и присвоение уникальных кодов ISRC и UPC для каждой аудиозаписи и альбома сразу при создании релиза."
        : "Complimentary generation and assignment of ISRC and UPC tags for every audio record and release album instantly."
    },
    {
      icon: Database,
      tag: isRu ? "ПРОЗРАЧНОСТЬ" : "FINANCIAL TRANSPARENCY",
      title: isRu ? "Прозрачный вывод роялти" : "Transparent Royalty Payouts",
      desc: isRu
        ? "Все заработанные роялти начисляются на ваш баланс в полном объеме (80% от сборов) без каких-либо скрытых комиссий или задержек выплат."
        : "All earned royalties are credited to your balance in full (80% of revenue) without any hidden fees or payout delays."
    },
    {
      icon: Server,
      tag: isRu ? "СКОРОСТЬ" : "DIRECT DISTRIBUTION",
      title: isRu ? "Прямые шлюзы отправки" : "High-Speed Store Delivery",
      desc: isRu
        ? "Отлаженные технологические мосты с платформами позволяют вашим релизам проходить модерацию в кратчайшие сроки."
        : "Optimized direct delivery streams ensure your releases pass moderation queues fast instead of weeks of waiting."
    },
    {
      icon: ShieldCheck,
      tag: isRu ? "ЗАЩИТА" : "CATALOG INTEGRITY",
      title: isRu ? "Охрана смежных прав" : "Active Master Rights Defense",
      desc: isRu
        ? "Препятствование несанкционированному размещению вашей музыки на других аккаунтах и перенаправление монетизации правообладателю."
        : "Prevention of unauthorized uploads of your music. Automatically safeguards catalog ownership and royalty streams."
    }
  ];

  return (
    <section
      id="tech-specs"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative block border-b border-neutral-200/40 dark:border-neutral-900/40"
    >
      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-neutral-200/60 dark:border-neutral-900/60 pb-10">
          <div>
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold text-left">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
              <span>{t.techBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 dark:text-white uppercase text-left">
              {t.techHeading}
            </h2>
          </div>
          <div className="md:text-right">
            <span className="text-xs font-mono tracking-widest text-[#7e8c9c] font-bold uppercase">{t.techSubtext}</span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specCards.map((spec, idx) => {
            const IconComponent = spec.icon;
            return (
              <div
                key={spec.tag}
                className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 p-6 md:p-8 rounded-3xl flex flex-col justify-between group hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300 text-left relative overflow-hidden"
              >
                {/* Subtle hover top bar accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />

                <div>
                  {/* Header Tag */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-[9px] tracking-widest text-[#7e8c9c] font-bold uppercase">
                      {spec.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-blue text-brand-blue group-hover:text-white">
                      <IconComponent className="w-4 h-4 transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="font-display text-base font-black text-neutral-950 dark:text-neutral-50 uppercase tracking-wide">
                    {spec.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal mt-4 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Technology Verification Banner */}
        <div className="mt-12 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-blue flex-shrink-0" />
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl">
              {t.techSecureDesc}
            </p>
          </div>
          <div className="text-[9px] font-mono tracking-widest text-[#7e8c9c] font-bold uppercase whitespace-nowrap bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 px-3 py-1.5 rounded-lg">
            {isRu ? 'СТАНДАРТ ТЕХНОЛОГИЙ' : 'TECHNOLOGY INTEGRITY'}
          </div>
        </div>

      </div>
    </section>
  );
}
