import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Zap, Coins, Music, FileText, Info, X } from 'lucide-react';
import { translations } from '../translations';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, collection, query, getDocs, orderBy } from 'firebase/firestore';

interface PricingProps {
  lang: 'RU' | 'EN';
}

type Currency = 'RUB' | 'KZT' | 'USD' | 'EUR';
type BillingCycle = 'monthly' | 'yearly';

export default function Pricing({ lang }: PricingProps) {
  const [currency, setCurrency] = useState<Currency>('RUB');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [dbConfig, setDbConfig] = useState<any>(null);
  const [dbExtras, setDbExtras] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic script loader for Yandex Embed Form to trigger proper resizing/initialization inside iframe
  useEffect(() => {
    if (isModalOpen) {
      const script = document.createElement('script');
      script.src = "https://forms.yandex.ru/_static/embed.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        try {
          document.body.removeChild(script);
        } catch (e) {
          // script might have been removed already
        }
      };
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchPricingConfigAndExtras = async () => {
      try {
        const docRef = doc(db, 'pricing_configs', 'config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDbConfig(docSnap.data());
        }

        const extraRef = collection(db, 'extra_services');
        const q = query(extraRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        const loaded: any[] = [];
        querySnapshot.forEach((d) => {
          loaded.push({ id: d.id, ...d.data() });
        });
        setDbExtras(loaded);
      } catch (err) {
        console.error('Error loading pricing layout parameters:', err);
        handleFirestoreError(err, OperationType.GET, 'pricing_configs/config or extra_services');
      }
    };
    fetchPricingConfigAndExtras();
  }, []);

  const isRu = lang === 'RU';
  const t = translations[lang];

  // Currency configuration
  const currencies: { code: Currency; symbol: string; label: string }[] = [
    { code: 'RUB', symbol: '₽', label: 'RUB (₽)' },
    { code: 'KZT', symbol: '₸', label: 'KZT (₸)' },
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  ];

  // Advanced price structure matching user request
  const pricingData: Record<Currency, { monthly: number; yearly: number; symbol: string; prefix?: string; suffix?: string }> = {
    RUB: { 
      monthly: dbConfig?.prices?.RUB?.monthly ?? 100, 
      yearly: dbConfig?.prices?.RUB?.yearly ?? 1000, 
      symbol: '₽', 
      suffix: '₽' 
    },
    KZT: { 
      monthly: dbConfig?.prices?.KZT?.monthly ?? 500, 
      yearly: dbConfig?.prices?.KZT?.yearly ?? 5000, 
      symbol: '₸', 
      suffix: '₸' 
    },
    USD: { 
      monthly: dbConfig?.prices?.USD?.monthly ?? 1.49, 
      yearly: dbConfig?.prices?.USD?.yearly ?? 14.99, 
      symbol: '$', 
      prefix: '$' 
    },
    EUR: { 
      monthly: dbConfig?.prices?.EUR?.monthly ?? 1.29, 
      yearly: dbConfig?.prices?.EUR?.yearly ?? 12.99, 
      symbol: '€', 
      prefix: '€' 
    },
  };

  const currentPrice = pricingData[currency];

  const getFormattedPrice = (amount: number, curr: Currency) => {
    const data = pricingData[curr];
    if (data.prefix) {
      return `${data.prefix}${amount}`;
    }
    return `${amount} ${data.suffix}`;
  };

  const getPeriodText = () => {
    if (billingCycle === 'monthly') {
      return `/${t.pricingPeriodMonth}`;
    }
    return `/${t.pricingPeriodYear}`;
  };

  return (
    <section 
      id="pricing" 
      className="py-24 relative overflow-hidden border-t border-neutral-200/40 dark:border-neutral-800/40 transition-colors duration-500 bg-neutral-50/50 dark:bg-transparent"
    >
      {/* Decorative dark vector accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/8 text-brand-blue dark:bg-brand-blue/10 dark:text-[#38bdf8] text-xs font-mono tracking-wider select-none mb-4 uppercase border border-brand-blue/15"
          >
            <Coins className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.pricingBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-4"
          >
            {t.pricingHeading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest"
          >
            {t.pricingSubtext}
          </motion.p>
        </div>

        {/* Dynamic Controls Switchers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          
          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/50 dark:border-neutral-800/60 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {t.pricingBillingMonthly}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {t.pricingBillingYearly}
              <span className="text-[10px] bg-green-500/15 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-md font-mono">
                {`-${dbConfig?.yearlyDiscount ?? 16}%`}
              </span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/50 dark:border-neutral-800/60 p-1 rounded-xl">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => setCurrency(curr.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 ${
                  currency === curr.code
                    ? 'bg-white dark:bg-neutral-800 text-brand-blue dark:text-sky-400 shadow-sm font-bold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {curr.code}
              </button>
            ))}
          </div>

        </div>

        {/* Tariffs Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: Basic Plan (FREE) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-900 p-8 relative overflow-hidden shadow-sm dark:shadow-none hover:border-neutral-300 dark:hover:border-neutral-800/80 transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {t.basicPlanTitle}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 min-h-[40px]">
                {t.basicPlanDesc}
              </p>
            </div>

            <div className="flex items-baseline mb-8">
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {t.basicPlanPrice}
              </span>
            </div>

            <div className="border-t border-neutral-100 dark:border-neutral-900/60 my-6" />

            {/* Benefits list */}
            <ul className="space-y-4 flex-grow mb-8 text-sm text-neutral-600 dark:text-neutral-300">
              {t.basicPlanFeatures.map((feat: string, idx: number) => {
                const basicTooltips = isRu ? [
                  "Ваш релиз будет доставлен на все крупнейшие стриминговые платформы СНГ.",
                  "Условия площадки для новых авторов. Вы получаете 70% от всех чистых доходов с прослушиваний.",
                  "Мы принимаем только файлы высокого разрешения без сжатия звука (WAV | FLAC) для безупречного звучания.",
                  "Обычно модерация длится быстрее, но площадки рекомендуют закладывать запас во времени.",
                  "Автоматически сформируем уникальные коды ведения дистрибуции для отслеживания релиза бесплатно."
                ] : [
                  "Your release will be delivered to the largest streaming platforms in the CIS region.",
                  "Standard percentage tier for newly registered artists. You retain a wholesome 70% of earnings.",
                  "We accept only high-resolution lossless audio assets (WAV | FLAC) to guard perfect reproduction standards.",
                  "Moderation checks are normally fast, but stores recommend a comfortable advance window.",
                  "We generate and assign the required global commercial identifiers completely free."
                ];
                const tooltipText = basicTooltips[idx] || "";

                return (
                  <li key={idx} className="flex items-start gap-3 justify-between group/item select-none">
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-neutral-400 dark:text-neutral-500 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>

                    <div className="relative group shrink-0 ml-1 mt-0.5 inline-flex">
                      <span className="text-neutral-400 hover:text-neutral-600 dark:hover:text-[#38bdf8] cursor-help p-0.5 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                      
                      {/* Elegant floating tooltip */}
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-lg bg-neutral-950 dark:bg-neutral-900 border border-neutral-200/10 dark:border-neutral-800 text-white text-[11px] font-sans font-normal leading-relaxed shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50 text-left">
                        {tooltipText}
                        <div className="absolute top-full right-2 border-4 border-transparent border-t-neutral-950 dark:border-t-neutral-900" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button 
              id="pricing-btn-free"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-800 dark:text-white text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer"
            >
              {t.pricingGetStarted}
            </button>
          </motion.div>

          {/* Card 2: Advanced Plan (Paid) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col rounded-2xl bg-white dark:bg-neutral-950 border-2 border-brand-blue/40 dark:border-brand-blue/30 p-8 relative overflow-hidden shadow-xl dark:shadow-none transition-all duration-300 hover:border-brand-blue/70 dark:hover:border-brand-blue/50"
          >
            {/* Highly visible background gradient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Tag mark */}
            <div className="absolute top-4 right-4 bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/15 dark:text-sky-300 text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md uppercase border border-brand-blue/20 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-brand-blue dark:text-sky-300" />
              <span>POPULAR</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {t.advPlanTitle}
                </h3>
                <Zap className="w-4 h-4 text-brand-blue dark:text-[#38bdf8] fill-brand-blue/20" />
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 min-h-[40px]">
                {t.advPlanPriceDesc}
              </p>
            </div>

            <div className="flex items-baseline mb-8">
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {getFormattedPrice(
                  billingCycle === 'monthly' ? currentPrice.monthly : currentPrice.yearly,
                  currency
                )}
              </span>
              <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 ml-1">
                {getPeriodText()}
              </span>
            </div>

            <div className="border-t border-neutral-100 dark:border-neutral-900/60 my-6" />

            {/* Benefits list */}
            <ul className="space-y-4 flex-grow mb-8 text-sm text-neutral-600 dark:text-neutral-300">
              {t.advPlanFeatures.map((feat: string, idx: number) => {
                const advTooltips = isRu ? [
                  "Полноценный партнерский процент — вы забираете 80% от мировых сборов за прослушивания.",
                  "Синхронная выгрузка релиза во все известные стриминг-сервисы, включая соцсети и мировые каталоги.",
                  "Зависит от пропускной способности модерации площадок, но мы отдаем наивысший приоритет вашему релизу.",
                  "Разместите статический текст вашей песни на витринах в один клик. Идеально для караоке-режима.",
                  "Для подачи заявки у артиста должно быть не менее 4 000 ежемесячных слушателей на Яндекс Музыке.",
                  "Детальные наглядные графики популярности, структуры слушателей и источников трафика вашего каталога.",
                  "Персональное решение любых вопросов и ответов модерации в приоритенном порядке в удобном чате.",
                  "Сроки вывода средств зависят от внутренней политики банка, страны получателя и выбранного платежного метода."
                ] : [
                  "Maximize your revenue share margins and retain 80% from all streams globally.",
                  "Simultaneous submission to 150+ music sites, catalogs, and streaming platforms broad-scale.",
                  "Accelerated verification checks by senior metadata teams prior to instant platform export.",
                  "Publish static text lines to target platforms directly for synchronized system readability.",
                  "Pitches require at least 4,000 monthly listeners on Yandex Music.",
                  "Deep graphical insights tracking trends, listener locations, and playlist reach every day.",
                  "Direct personal manager line in Telegram/Live Chat handles metadata or payout tickets.",
                  "Actual payout turnaround depends on recipient country database and regional bank processing."
                ];
                const tooltipText = advTooltips[idx] || "";

                return (
                  <li key={idx} className="flex items-start gap-3 justify-between group/item select-none">
                    <div className="flex items-start gap-3">
                      <span className="p-0.5 rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-sky-400 mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className={idx === 1 ? 'font-medium text-neutral-900 dark:text-white' : ''}>
                        {feat}
                      </span>
                    </div>

                    <div className="relative group shrink-0 ml-1 mt-0.5 inline-flex">
                      <span className="text-neutral-400 hover:text-neutral-600 dark:hover:text-[#38bdf8] cursor-help p-0.5 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                      
                      {/* Elegant floating tooltip */}
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-lg bg-neutral-950 dark:bg-neutral-900 border border-neutral-200/10 dark:border-neutral-800 text-white text-[11px] font-sans font-normal leading-relaxed shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50 text-left">
                        {tooltipText}
                        <div className="absolute top-full right-2 border-4 border-transparent border-t-neutral-950 dark:border-t-neutral-900" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button 
              id="pricing-btn-premium"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-hover dark:bg-brand-blue dark:hover:bg-sky-500 text-white text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all duration-300 uppercase font-mono cursor-pointer"
            >
              {t.pricingUpgrade}
            </button>
          </motion.div>

        </div>

        {/* Extra Services block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-5xl mx-auto rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/60 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-brand-blue dark:text-[#38bdf8] font-bold uppercase block mb-1">
                {isRu ? "ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ" : "EXTRA OPTIONS"}
              </span>
              <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                {t.extraServiceTitle}
              </h4>
            </div>
            
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
              {isRu 
                ? "Вы можете добавить отдельные опции независимо от выбранного тарифного пакета" 
                : "Add optional features easily alongside any standard release tariff package"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {dbExtras.length === 0 ? (
              <div className="p-5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200/40 dark:border-neutral-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-brand-blue/8 text-brand-blue dark:bg-brand-blue/10 dark:text-[#38bdf8] shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      {t.extraServiceLyricsSync}
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {isRu ? "Для всех планов" : "All plans"}
                      </span>
                    </h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl">
                      {t.extraServiceLyricsDesc}
                    </p>
                  </div>
                </div>
                
                <div className="text-left sm:text-right shrink-0">
                  <span className="block text-2xl font-bold font-mono text-neutral-950 dark:text-white">
                    {currency === 'RUB' ? '50 ₽' : currency === 'KZT' ? '250 ₸' : currency === 'USD' ? '$0.75' : '€0.69'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block uppercase">
                    {isRu ? "за релиз" : "per release"}
                  </span>
                </div>
              </div>
            ) : (
              dbExtras.map((es) => {
                const formattedPrice = currency === 'RUB' 
                  ? `${es.priceRub} ₽` 
                  : currency === 'KZT' 
                    ? `${es.priceKzt} ₸` 
                    : currency === 'USD' 
                      ? `$${es.priceUsd}` 
                      : `€${es.priceEur}`;

                return (
                  <div key={es.id} className="p-5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200/40 dark:border-neutral-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300 text-left">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-brand-blue/8 text-brand-blue dark:bg-brand-blue/10 dark:text-[#38bdf8] shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-grow text-left">
                        <h5 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2 flex-wrap text-left">
                          {isRu ? es.titleRu : es.titleEn}
                          {(es.badgeRu || es.badgeEn) && (
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              {isRu ? es.badgeRu : es.badgeEn}
                            </span>
                          )}
                        </h5>
                        {(es.descRu || es.descEn) && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl text-left">
                            {isRu ? es.descRu : es.descEn}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-left sm:text-right shrink-0">
                      <span className="block text-2xl font-bold font-mono text-neutral-950 dark:text-white">
                        {formattedPrice}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block uppercase">
                        {isRu ? "за релиз" : "per release"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

      </div>

      {/* Modern Dialog/Modal for Yandex Forms Integration */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            id="pricing-modal-overlay"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              id="pricing-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 35 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/85 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh] max-h-[850px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div 
                id="pricing-modal-header"
                className="flex items-center justify-between px-6 py-4 border-b border-neutral-150 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950/40 select-none"
              >
                <div className="text-left">
                  <h3 className="font-sans font-bold text-lg text-neutral-900 dark:text-white">
                    {isRu ? 'Оформление заявки' : 'Distribution Application'}
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {isRu ? 'Яндекс Формы // Подача демо на лейбл' : 'Yandex Forms // Demo submission'}
                  </p>
                </div>
                <button
                  id="pricing-modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body with Scrollable Embed */}
              <div 
                id="pricing-modal-body"
                className="flex-grow p-4 md:p-6 bg-white dark:bg-neutral-950 flex flex-col h-full min-h-0 overflow-hidden"
              >
                <div className="relative w-full h-full rounded-2xl overflow-y-auto border border-neutral-200/60 dark:border-neutral-900 bg-white shadow-inner flex-grow">
                  <iframe 
                    id="pricing-iframe-yandex"
                    src="https://forms.yandex.ru/cloud/6995f94eeb614637b4790bb7?iframe=1" 
                    frameBorder="0" 
                    scrolling="yes"
                    name="ya-form-6995f94eeb614637b4790bb7" 
                    className="w-full border-0 bg-white block overflow-y-auto"
                    style={{ minHeight: '980px', height: '1050px' }}
                    title="Yandex Form"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
