import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Mail } from 'lucide-react';
import { translations } from '../translations';

interface FAQProps {
  lang: 'RU' | 'EN';
}

export default function FAQ({ lang }: FAQProps) {
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
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent text-neutral-900 relative block border-b border-neutral-200/50"
    >
      {/* Background visual lines styled with brand color */}
      <div className="absolute inset-0 opacity-[0.012] bg-[linear-gradient(to_right,var(--color-brand-blue)_1.5px,transparent_1.5px),linear-gradient(to_bottom,var(--color-brand-blue)_1.5px,transparent_1.5px)] bg-[size:45px_45px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="border-b border-neutral-200 pb-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
              <span>{t.faqBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 uppercase">
              {t.faqHeading}
            </h2>
          </div>
        </div>

        {/* Accordions Group */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === idx;
            return (
              <div
                key={faq.id}
                className="border border-neutral-200 bg-white rounded-3xl overflow-hidden shadow-xs hover:border-brand-blue/30 transition-all duration-300"
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-neutral-50/50 transition-colors cursor-pointer"
                >
                  <span className="font-display text-sm md:text-base font-bold tracking-wide text-neutral-950 uppercase leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-brand-blue border-brand-blue text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Animated Body panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="p-6 pt-0 border-t border-neutral-100 text-xs md:text-sm text-neutral-500 leading-relaxed font-light bg-neutral-50/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic support notice */}
        <div className="mt-16 text-center text-[11px] font-mono text-[#7e8c9c] uppercase flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>{isRu ? "ОСТАЛИСЬ ВОПРОСЫ ПО ОФОРМЛЕНИЮ ПРАВ И ДИСТРИБУЦИИ?" : "HAVE EXTRA COVENANT OR LICENSING INQUIRIES?"}</span>
          <a href="mailto:work@nightvolt.ru" className="text-brand-blue font-bold tracking-wide underline hover:text-brand-orange transition-colors">
            work@nightvolt.ru
          </a>
        </div>

      </div>
    </section>
  );
}
