import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  ArrowUpRight, 
  ShieldAlert 
} from 'lucide-react';
import { translations } from '../translations';

interface FAQProps {
  lang: 'RU' | 'EN';
  onViewAll?: () => void;
}

export default function FAQ({ lang, onViewAll }: FAQProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const isRu = lang === 'RU';
  const t = translations[lang];

  const faqs = [
    {
      id: "faq-1",
      question: isRu 
        ? "В какие сроки мои песни появятся на стриминговых площадках?" 
        : "How fast do my songs reach streaming platforms?",
      answer: isRu
        ? "Мы рекомендуем отправлять релиз за 14 дней до планируемой даты выхода. Это гарантирует своевременное прохождение модерации на площадках и возможность подать трек на питчинг (промо-поддержку от редакторов). В экстренных случаях подача возможна и за 3 дня до выхода."
        : "We recommend submitting your release 14 days prior to the planned release date. This guarantees timely moderation across platforms and enables pitching to editorial playlists for promo support. In urgent cases, submissions can be delivered in just 3 days."
    },
    {
      id: "faq-2",
      question: isRu 
        ? "Как начисляются выплаты роялти и от какой суммы можно выводить?" 
        : "How are royalties calculated & what is the withdrawal threshold?",
      answer: isRu
        ? "Стриминговые сервисы выгружают финансовые отчеты и присылают статистику с небольшой задержкой в 2-3 месяца (это стандарт для всех площадок). Вы забираете 80% от всех сборов. Минимальный порог вывода — всего $10, выплаты производятся поквартально на карту или расчетный счет."
        : "Streaming stores process reports and send royalty payouts with a standard delay of 2-3 months. You receive 80% of all earnings. Withdrawals are processed quarterly starting from just $10."
    },
    {
      id: "faq-3",
      question: isRu 
        ? "Как перенести свой каталог от другого дистрибьютора?" 
        : "How do I migrate my catalogue from another distributor?",
      answer: isRu
        ? "Процесс очень простой и безопасный. Загрузите файлы в NIGHTVOLT с идентичными кодами ISRC и UPC, а также с оригинальными аудиофайлами. После того, как песни появятся на площадках от нас, вы сможете деактивировать их у старого дистрибьютора, сохранив все плейлисты, прослушивания и лайки."
        : "The process is simple and completely safe. Distribute your tracks through NIGHTVOLT using identical ISRC/UPC codes and matching original audio files. Once live, take down from your previous provider. Your playlist placements, playcounts, and likes will remain untouched."
    },
    {
      id: "faq-4",
      question: isRu 
        ? "Что представляет собой сплит доходов 80 / 20?" 
        : "What does the 80/20 royalty split represent?",
      answer: isRu
        ? "NIGHTVOLT — это честный и современный дистрибьютор. Артист забирает себе 80% чистой прибыли от прослушиваний. Оставшиеся 20% уходят лейблу на поддержание работы серверов, автоматическую защиту авторских прав, а также на профессиональную клиентскую саппорт-поддержку."
        : "NIGHTVOLT works on a simple creator-focused transparent model. You retain 80% of net streaming sales. The label takes 20% to keep our server channels running, power automated rights protection, and support our personal customer care."
    },
    {
      id: "faq-5",
      question: isRu 
        ? "Взимается ли ежегодная плата за хранение треков на площадках?" 
        : "Are there periodic storage or subscription charges?",
      answer: isRu
        ? "Нет. Ваша дистрибуция полностью бессрочна и свободна от скрытых подписок, ежемесячных платежей или абонентской платы за хранение. Мы никогда не берем плату за годовой хостинг каталога или изменение обложек. Ваши треки живут на площадках всегда."
        : "Absolutely not! Our distribution services are permanent. We do not charge recurring monthly or yearly subscription fees to keep your tracks online, nor do we charge for editing metadata. Your music stays online forever."
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenId(openId === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 relative block border-b border-neutral-200/60 dark:border-neutral-900/60 overflow-hidden"
    >
      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="border-b border-neutral-200/60 dark:border-neutral-900/60 pb-10 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.25em] mb-4 uppercase font-bold text-left">
              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
              <span>{t.faqBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 dark:text-white uppercase text-left">
              {t.faqHeading}
            </h2>
          </div>
          <div className="text-left font-mono text-xs text-[#7e8c9c]">
            {isRu ? "[ ВОПРОСЫ И ОТВЕТЫ ]" : "[ FREQUENTLY ASKED ]"}
          </div>
        </div>

        {/* Dynamic Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Support Hub */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl p-8 shadow-sm relative overflow-hidden group">
              {/* Subtle hover top bar accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-black text-neutral-950 dark:text-white uppercase leading-tight">
                    {isRu ? "Связь с поддержкой" : "Direct Support Desk"}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
                    {isRu 
                      ? "Наша служба поддержки общается лично и оперативно. Мы помогаем с переносом музыкальных каталогов, решением спорных ситуаций и оформлением документов."
                      : "Our dedicated support team communicates directly with you. We personally guide you through catalog migrations, technical questions, and metadata guidelines."}
                  </p>
                </div>

                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7e8c9c] font-semibold">{isRu ? "Канал связи" : "Contact channel"}</span>
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase">{isRu ? "Активен" : "Online"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7e8c9c] font-semibold">{isRu ? "Среднее время" : "Response time"}</span>
                    <span className="text-brand-blue font-bold uppercase">{isRu ? "В течение дня" : "Within same day"}</span>
                  </div>
                </div>

                {/* Email Action button */}
                <div className="pt-2">
                  <a 
                    href="mailto:work@nightvolt.ru"
                    className="w-full py-3.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white rounded-2xl font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>work@nightvolt.ru</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick legal/copyright warning box */}
            <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 p-5 rounded-3xl flex gap-3.5 text-left">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-amber-700 dark:text-amber-500 font-black tracking-widest uppercase">
                  {isRu ? "ПРАВИЛА ОТБОРА" : "CATALOG COMPLIANCE"}
                </span>
                <p className="text-[11px] text-neutral-700 dark:text-neutral-400 font-normal leading-relaxed">
                  {isRu 
                    ? "Мы дорожим качеством каталога и строго отклоняем треки с использованием чужих нелицензированных сэмплов или неочищенных каверов."
                    : "We protect catalog reputation and strictly reject compositions with unlicensed samples or uncleared cover records."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Master Accordions lists with solid styling and high contrast */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openId === idx;
              
              return (
                <div
                  key={faq.id}
                  className="border border-neutral-200/80 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300 shadow-sm relative group"
                >
                  {/* Subtle hover top bar accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />

                  {/* Accordion Head bar */}
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-950/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <span className="font-mono text-xs text-brand-blue font-extrabold shrink-0 mt-0.5">
                        [ 0{idx + 1} ]
                      </span>
                      <span className="font-display text-sm md:text-base font-black tracking-wide text-neutral-950 dark:text-white uppercase leading-snug group-hover:text-brand-blue transition-colors">
                        {faq.question}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? 'bg-brand-blue border-brand-blue text-white' 
                        : 'bg-neutral-50 dark:bg-neutral-850 border-neutral-200/60 dark:border-neutral-750 text-neutral-500'
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Animated Accordion Body panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-left bg-neutral-50/40 dark:bg-neutral-950/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* View Full FAQ Hub Button */}
            {onViewAll && (
              <div className="pt-4 text-left">
                <button
                  type="button"
                  onClick={onViewAll}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-white hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-950 border border-brand-blue rounded-3xl text-xs font-mono font-bold tracking-widest transition-all cursor-pointer shadow-sm active:scale-95 uppercase select-none"
                >
                  <span>{isRu ? "Все вопросы и ответы" : "Explore All Questions"}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/10 group-hover:bg-brand-blue dark:group-hover:bg-brand-blue flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
