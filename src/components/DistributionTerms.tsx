import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ArrowLeft, DollarSign, Scale, FileSignature, CheckCircle2, ShieldAlert, Lock, BookOpen } from 'lucide-react';
import { legalTexts } from '../data/legalTexts';

export type LegalTabId = 'terms' | 'platform' | 'agreement' | 'privacy' | 'dmca';

interface DistributionTermsProps {
  lang: 'RU' | 'EN';
  onBack: () => void;
  initialTab?: LegalTabId;
}

export default function DistributionTerms({ lang, onBack, initialTab = 'terms' }: DistributionTermsProps) {
  const isRu = lang === 'RU';
  const [activeTab, setActiveTab] = useState<LegalTabId>(initialTab);

  // Sync active tab if initialTab changed from parent triggers
  useEffect(() => {
    setActiveTab(initialTab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [initialTab]);

  // Scroll to top when tab changes
  const handleTabChange = (tab: LegalTabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = {
    RU: {
      title: "Условия дистрибуции NIGHTVOLT",
      subtitle: "Официальный регламент, права сторон и финансовая структура взаимодействия",
      termsIntro: "Настоящие Условия определяют порядок использования платформы цифровой дистрибуции NIGHTVOLT. Мы стремимся создать честные и понятные условия для независимых авторов, музыкальных коллективов и продюсерских центров.",
      payoutTitle: "1. Распределение Доходов (80 / 20)",
      payoutDesc: "Артист является ключевым звеном музыкальной индустрии. Именно поэтому мы сохраняем прозрачную схему сплита, защищающую права творца:",
      payoutPoints: [
        "Артист всегда получает 80% от всех чистых доходов, собираемых со стриминг-платформ (Яндекс.Музыка, VK Музыка, Spotify, Apple, и др.).",
        "Комиссия NIGHTVOLT составляет фиксированные 20% и покрывает затраты на прямую цифровую доставку треков на витрины, хранение файлов и автоматическую сверку Content ID.",
        "Выплаты рассчитываются ежеквартально по достижении минимального порога в системе — без лишних или скрытых комиссий за транзакции."
      ],
      rightsTitle: "2. Интеллектуальная Собственность & Права",
      rightsDesc: "NIGHTVOLT — это удобный сервис дистрибуции контента, а не кабальный контракт. Ваша свобода абсолютна:",
      rightsPoints: [
        "Вы сохраняете за собой 100% авторских и смежных прав на все загружаемые фонограммы и обложки.",
        "NIGHTVOLT получает исключительно неисключительное право на размещение и монетизацию вашего материала на выбранных вами площадках.",
        "Вы вправе в любой момент инициировать процедуру снятия и удаления вашего релиза со всех витрин, предупредив поддержку за 14 рабочих дней."
      ],
      rulesTitle: "3. Требования к Аудиоматериалам & Модерация",
      rulesDesc: "Все релизы проходят обязательную модерацию перед отправкой на площадки для соответствия высоким стандартам качества стриминга:",
      rulesPoints: [
        "Категорически запрещено использование неочищенных сэмплов, заимствованных плейбеков, чужого вокала без письменного согласия правообладателей.",
        "Аудиофайлы должны быть надлежащего качества (минимально: Stereo WAV 16-bit / 44.1kHz, оптимально: FLAC Lossless).",
        "Обложки релизов не должны содержать логотипы посторонних брендов, ссылки на сайты или контакты, а также быть размытыми или иметь низкое разрешение."
      ],
      linksTitle: "Официальные соглашения и правовая документация:",
      backBtn: "Вернуться на главную",
      disclaimer: "В случае нарушения правил (жалоба на авторские права DMCA, накрутка прослушиваний, плагиат) NIGHTVOLT оставляет за собой право приостановить обслуживание учетной записи до выяснения всех обстоятельств правообладателем."
    },
    EN: {
      title: "NIGHTVOLT Distribution Terms",
      subtitle: "Official rules, stakeholder rights, and financial structure of our alliance",
      termsIntro: "These terms define the guidelines of using the NIGHTVOLT digital distribution platform. We strive to provide the most transparent and fair environment for independent creators, musicians, and label management.",
      payoutTitle: "1. Income Division (80 / 20 Split)",
      payoutDesc: "The artist is the focal point of the music industry. Hence, we implement a pristine split model that prioritizes the artist's earnings:",
      payoutPoints: [
        "The Artist retains 80% of all Net Receipts collected from global streaming stores (Spotify, Apple Music, VK Music, Yandex Music, etc.).",
        "NIGHTVOLT retains a fixed 20% commission fee to cover stores upload costs, cloud storage, Content ID protection, and client support services.",
        "Payouts are calculated on a quarterly timeline upon reaching the standard minimum threshold — clear of hidden fees or transfer penalties."
      ],
      rightsTitle: "2. Intellectual Property & Masters Ownership",
      rightsDesc: "NIGHTVOLT functions as a software-enabled distribution platform, not an invasive label. Your freedom is absolute:",
      rightsPoints: [
        "You always retain 100% of master and publishing rights for all distributed recordings, artworks, and lyrics.",
        "NIGHTVOLT is granted a strictly non-exclusive right to distribute, monetize, and stream your materials in global digital stores.",
        "You retain the right to request a complete take-down of any releases at any moment by providing a standard 14-day advance notice."
      ],
      rulesTitle: "3. Ingestion Quality & Store Requirements",
      rulesDesc: "Because we deliver directly to major stores, our moderation queues enforce clear standards to avoid platform rejections:",
      rulesPoints: [
        "Unlicensed samples, bootlegs, or uncleared cover versions are strictly subject to immediate rejection during moderation.",
        "Submitted tracks must meet high quality parameters (minimum of Stereo WAV 16-bit/44.1kHz or FLAC Lossless files).",
        "Artworks must not feature third-party trademarks, social media links, barcodes, telephone numbers, or pixelated stock imagery."
      ],
      linksTitle: "Official documents and legal agreements:",
      backBtn: "Return to home",
      disclaimer: "Under material breach of copyright rules (such as fraudulent streaming, DMCA reports, or sample piracy), NIGHTVOLT stores the absolute right to freeze accounts until clear arbitration."
    }
  };

  const activeContent = isRu ? content.RU : content.EN;

  // Render list of available document tabs
  const tabItems = [
    { id: 'terms' as LegalTabId, label: isRu ? 'Условия Дистрибуции' : 'Distribution Terms', icon: DollarSign },
    { id: 'platform' as LegalTabId, label: isRu ? 'Соглашение Платформы' : 'Platform Agreement', icon: FileSignature },
    { id: 'agreement' as LegalTabId, label: isRu ? 'Пользовательское Соглашение' : 'User Agreement', icon: BookOpen },
    { id: 'privacy' as LegalTabId, label: isRu ? 'Конфиденциальность' : 'Privacy Policy', icon: Lock },
    { id: 'dmca' as LegalTabId, label: isRu ? 'Политика DMCA' : 'DMCA Policy', icon: ShieldAlert },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="py-24 md:py-32 px-6 md:px-12 bg-[#fafafc] relative min-h-screen text-neutral-900"
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-x-0 top-0 h-[500px] opacity-[0.02] bg-grid-lines pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Navigation Back Button and Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-4 border-b border-neutral-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-neutral-50 shadow-sm border border-neutral-200 text-neutral-700 text-[10px] font-mono font-bold tracking-widest rounded-full transition-all cursor-pointer w-fit active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-orange" />
            <span>{activeContent.backBtn.toUpperCase()}</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#7e8c9c]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
            <span>NIGHTVOLT PLATFORM DOCUMENT HUB</span>
          </div>
        </div>

        {/* Dynamic Legal Tabs Switcher Header */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-5 gap-2 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200/60 max-w-full overflow-hidden">
          {tabItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center gap-2 text-[10px] sm:text-xs font-mono tracking-wider font-bold rounded-xl transition-all select-none cursor-pointer text-center ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md shadow-neutral-950/10'
                    : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-orange' : 'text-neutral-400'}`} />
                <span>{tab.label.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* tab render switcher */}
        <AnimatePresence mode="wait">
          {activeTab === 'terms' ? (
            <motion.div
              key="tab-terms-view"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              <div className="pb-8 mb-8 border-b border-neutral-200">
                <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight text-neutral-950">
                  {activeContent.title}
                </h1>
                <p className="text-sm md:text-md text-[#7e8c9c] font-light mt-3">
                  {activeContent.subtitle}
                </p>
              </div>

              <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed border-l-2 border-brand-orange pl-6 my-8">
                {activeContent.termsIntro}
              </p>

              {/* Terms Content List */}
              <div className="space-y-10">
                <div className="p-8 bg-white border border-neutral-200/70 rounded-3xl shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-wide text-neutral-950">
                      {activeContent.payoutTitle}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-500 font-light mb-6">
                    {activeContent.payoutDesc}
                  </p>
                  <div className="space-y-4">
                    {activeContent.payoutPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs md:text-sm text-neutral-700 leading-relaxed font-light">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-white border border-neutral-200/70 rounded-3xl shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                      <Scale className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-wide text-neutral-950">
                      {activeContent.rightsTitle}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-500 font-light mb-6">
                    {activeContent.rightsDesc}
                  </p>
                  <div className="space-y-4">
                    {activeContent.rightsPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs md:text-sm text-neutral-700 leading-relaxed font-light">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-white border border-neutral-200/70 rounded-3xl shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                      <FileSignature className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-wide text-neutral-950">
                      {activeContent.rulesTitle}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-500 font-light mb-6">
                    {activeContent.rulesDesc}
                  </p>
                  <div className="space-y-4">
                    {activeContent.rulesPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs md:text-sm text-neutral-700 leading-relaxed font-light">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simple Document Switching Grid within Content */}
              <div className="mt-12 p-8 bg-neutral-100 border border-neutral-200 rounded-3xl">
                <p className="font-mono text-xs font-bold text-neutral-900 mb-4">{activeContent.linksTitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleTabChange('platform')}
                    className="p-3 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-brand-orange rounded-xl text-xs font-mono font-bold text-neutral-700 hover:text-brand-orange flex items-center justify-between transition-all select-none cursor-pointer"
                  >
                    <span>{isRu ? 'СОГЛАШЕНИЕ ПЛАТФОРМЫ' : 'PLATFORM AGREEMENT'}</span>
                    <FileText className="w-4 h-4 shrink-0 text-brand-orange" />
                  </button>
                  <button
                    onClick={() => handleTabChange('agreement')}
                    className="p-3 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-brand-orange rounded-xl text-xs font-mono font-bold text-neutral-700 hover:text-brand-orange flex items-center justify-between transition-all select-none cursor-pointer"
                  >
                    <span>{isRu ? 'ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ' : 'USER AGREEMENT'}</span>
                    <FileText className="w-4 h-4 shrink-0 text-brand-orange" />
                  </button>
                  <button
                    onClick={() => handleTabChange('privacy')}
                    className="p-3 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-brand-orange rounded-xl text-xs font-mono font-bold text-neutral-700 hover:text-brand-orange flex items-center justify-between transition-all select-none cursor-pointer"
                  >
                    <span>{isRu ? 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ' : 'PRIVACY POLICY'}</span>
                    <FileText className="w-4 h-4 shrink-0 text-brand-orange" />
                  </button>
                  <button
                    onClick={() => handleTabChange('dmca')}
                    className="p-3 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-brand-orange rounded-xl text-[10px] sm:text-xs font-mono font-bold text-neutral-700 hover:text-brand-orange flex items-center justify-between transition-all select-none cursor-pointer"
                  >
                    <span>{isRu ? 'ПОЛИТИКА DMCA' : 'DMCA POLICY'}</span>
                    <FileText className="w-4 h-4 shrink-0 text-brand-orange" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`tab-legal-render-${activeTab}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 bg-white p-8 md:p-12 border border-neutral-200/80 rounded-3xl shadow-xs"
            >
              {/* Individual Legal Document header */}
              <div className="pb-6 border-b border-neutral-150">
                <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight uppercase leading-tight text-neutral-900">
                  {legalTexts[lang][activeTab].title}
                </h2>
                <p className="text-xs md:text-sm font-mono text-neutral-400 mt-2 uppercase tracking-widest">
                  {legalTexts[lang][activeTab].subtitle}
                </p>
              </div>

              {/* Exact Text Content Rendered Elegantly */}
              <div className="space-y-6 text-neutral-800 text-sm md:text-base leading-relaxed font-light">
                {legalTexts[lang][activeTab].content.map((paragraph, index) => {
                  // If paragraph looks like a list item or title, let's style it with a slightly enhanced weight/design
                  const isTitleLike = paragraph.match(/^[0-9]\.\s+[A-ZА-Я]+/);
                  const isBulletLike = paragraph.startsWith('-');
                  
                  if (isTitleLike) {
                    return (
                      <h4 key={index} className="font-display font-bold text-neutral-950 uppercase tracking-wide pt-4 pb-1 text-sm md:text-base border-b border-neutral-100">
                        {paragraph}
                      </h4>
                    );
                  }

                  if (isBulletLike) {
                    return (
                      <div key={index} className="pl-4 border-l-2 border-brand-orange/30 italic text-xs md:text-sm text-neutral-600 my-2">
                        {paragraph}
                      </div>
                    );
                  }

                  return (
                    <p key={index} className="font-light whitespace-pre-line text-neutral-700 tracking-wide text-[13px] md:text-sm">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Official Seal / Status Box */}
              <div className="mt-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold text-neutral-900 uppercase tracking-widest leading-none">
                      {isRu ? "СТАТУС: ЮРИДИЧЕСКИЙ ДОКУМЕНТ" : "STATUS: LEGAL DOCUMENT"}
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-1 leading-none">
                      {isRu ? "Действует автоматически при акцепте" : "Binding automatically upon electronic accept"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleTabChange('terms')}
                  className="px-4 py-2 bg-neutral-900 text-white hover:bg-brand-orange text-[9px] font-mono font-bold tracking-widest rounded-full transition-all cursor-pointer active:scale-95 uppercase"
                >
                  {isRu ? "К условиям дистрибуции" : "To Distribution Terms"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Disclaimer Footer */}
        <p className="mt-16 font-mono text-[10px] text-[#7e8c9c] leading-relaxed uppercase tracking-wider text-center border-t border-neutral-200/80 pt-8">
          *{activeContent.disclaimer}
        </p>

      </div>
    </motion.div>
  );
}
