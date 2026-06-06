import React, { useState } from 'react';
import Logo from './Logo';
import { Mail, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { translations } from '../translations';

interface FooterProps {
  lang: 'RU' | 'EN';
  onScrollTo: (selector: string) => void;
  onNavigateToTerms?: (tab: 'terms' | 'platform' | 'agreement' | 'privacy' | 'dmca') => void;
  onNavigateToPromo?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToVacancies?: () => void;
  onNavigateToPartners?: () => void;
  onNavigateToArtists?: () => void;
}

export default function Footer({ lang, onScrollTo, onNavigateToTerms, onNavigateToPromo, onNavigateToAbout, onNavigateToVacancies, onNavigateToPartners, onNavigateToArtists }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const isRu = lang === 'RU';
  const t = translations[lang];

  // Configured inner-document page keys or external references
  const legalDocs = [
    { 
      label: isRu ? "Соглашение платформы" : "Platform Agreement", 
      tab: "platform" as const
    },
    { 
      label: isRu ? "Политика конфиденциальности" : "Privacy Policy", 
      tab: "privacy" as const
    },
    { 
      label: isRu ? "Политика DMCA NIGHTVOLT" : "DMCA NIGHTVOLT Policy", 
      tab: "dmca" as const
    },
    { 
      label: isRu ? "Пользовательское соглашение NIGHTVOLT" : "User Agreement NIGHTVOLT", 
      tab: "agreement" as const
    }
  ];

  const externalLinks = [
    { 
      label: isRu ? "Официальный Telegram канал" : "Official Telegram channel", 
      href: "https://t.me/Nightvolt_1" 
    },
    { 
      label: isRu ? "Каталог на Яндекс Музыке" : "Yandex Label Catalog", 
      href: "https://music.yandex.kz/label/6140254" 
    }
  ];

  return (
    <footer
      id="main-footer"
      className="bg-transparent text-neutral-900 py-16 md:py-24 px-6 md:px-12 border-t border-neutral-200 relative block font-sans"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />

      <div className="max-w-[1250px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Col 1: Brand & Slogan */}
        <div className="lg:col-span-4 space-y-6">
          <div 
            onClick={() => onScrollTo('#hero')}
            className="flex items-center gap-3 cursor-pointer group active:scale-98 transition-transform w-fit select-none"
          >
            <Logo 
              className="w-8 h-8 text-brand-orange group-hover:scale-105 transition-transform duration-300"
              stroke="var(--color-brand-orange)"
              strokeWidth={1.8}
            />
            <span className="font-display text-lg font-black tracking-[0.18em] text-neutral-900 uppercase">
              NIGHTVOLT
            </span>
          </div>

          <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-[300px]">
            {t.footerAbout}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-brand-blue font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span>{isRu ? "СТАТУС: ОНЛАЙН // ПОДДЕРЖКА АРТИСТОВ" : "STATUS: ONLINE // ARTIST SUPPORT"}</span>
          </div>
        </div>

        {/* Col 2: Legal and Navigation Links */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="font-mono text-[9px] tracking-widest text-[#7e8c9c] font-bold uppercase">
            // {isRu ? "ПРАВОВАЯ ИНФОРМАЦИЯ И ССЫЛКИ" : "LEGAL DOCUMENTS & OFFERS"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
            {/* 1. Internal Legal Applet Docs */}
            {legalDocs.map((doc) => (
              <button
                key={doc.label}
                onClick={() => onNavigateToTerms?.(doc.tab)}
                className="text-xs text-neutral-600 hover:text-brand-orange hover:translate-x-1 transition-all duration-300 font-light text-left inline-flex items-center gap-1.5 cursor-pointer pb-1 border-b border-dashed border-neutral-200 hover:border-brand-orange leading-normal select-none"
              >
                <span>{doc.label}</span>
                <ArrowRight className="w-3 h-3 text-brand-orange shrink-0" />
              </button>
            ))}

            {/* 2. External Navigation Resources */}
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-neutral-600 hover:text-brand-orange hover:translate-x-1 transition-all duration-300 font-light inline-flex items-center gap-1.5 cursor-pointer pb-1 border-b border-dashed border-neutral-200 hover:border-brand-orange leading-normal"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3 text-neutral-400 select-none group-hover:text-brand-orange shrink-0" />
              </a>
            ))}

            {/* General Applet Terms Button */}
            {onNavigateToTerms && (
              <button
                onClick={() => onNavigateToTerms('terms')}
                className="text-xs text-brand-blue font-bold hover:text-brand-orange hover:translate-x-1 transition-all duration-300 text-left cursor-pointer inline-flex items-center gap-1.5 pt-1 uppercase select-none"
              >
                <span>{isRu ? "Условия Дистрибуции NIGHTVOLT" : "NIGHTVOLT Distribution Terms"}</span>
                <ArrowRight className="w-3 h-3 text-brand-orange shrink-0 animate-pulse" />
              </button>
            )}

            {/* Promo tools link */}
            {onNavigateToPromo && (
              <button
                onClick={() => onNavigateToPromo()}
                className="text-xs text-brand-orange font-bold hover:text-brand-blue hover:translate-x-1 transition-all duration-300 text-left cursor-pointer inline-flex items-center gap-1.5 pt-1 uppercase select-none font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                <span>{isRu ? "Генератор промо-баннеров" : "Promo Assets Generator"}</span>
                <ArrowRight className="w-3 h-3 text-brand-blue shrink-0" />
              </button>
            )}

            {/* About platform link */}
            {onNavigateToAbout && (
              <button
                onClick={() => onNavigateToAbout()}
                className="text-xs text-[#7e8c9c] hover:text-brand-orange hover:translate-x-1 transition-all duration-300 text-left cursor-pointer inline-flex items-center gap-1.5 pt-1 uppercase select-none font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>{isRu ? "О платформе NIGHTVOLT" : "About NIGHTVOLT Platform"}</span>
                <ArrowRight className="w-3 h-3 text-brand-orange shrink-0" />
              </button>
            )}

            {/* Vacancies link */}
            {onNavigateToVacancies && (
              <button
                onClick={() => onNavigateToVacancies()}
                className="text-xs text-[#7e8c9c] hover:text-brand-orange hover:translate-x-1 transition-all duration-300 text-left cursor-pointer inline-flex items-center gap-1.5 pt-1 uppercase select-none font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isRu ? "Вакансии" : "Careers"}</span>
                <ArrowRight className="w-3 h-3 text-brand-orange shrink-0" />
              </button>
            )}

            {/* Partners link */}
            {onNavigateToPartners && (
              <button
                onClick={() => onNavigateToPartners()}
                className="text-xs text-[#7e8c9c] hover:text-brand-orange hover:translate-x-1 transition-all duration-300 text-left cursor-pointer inline-flex items-center gap-1.5 pt-1 uppercase select-none font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                <span>{isRu ? "Партнеры" : "Partners"}</span>
                <ArrowRight className="w-3 h-3 text-brand-orange shrink-0" />
              </button>
            )}

            {/* Artists link */}
            {onNavigateToArtists && (
              <button
                onClick={() => onNavigateToArtists()}
                className="text-xs text-[#7e8c9c] hover:text-brand-orange hover:translate-x-1 transition-all duration-300 text-left cursor-pointer inline-flex items-center gap-1.5 pt-1 uppercase select-none font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#e1222e] animate-pulse" />
                <span>{isRu ? "Наши артисты" : "Our Artists"}</span>
                <ArrowRight className="w-3 h-3 text-brand-orange shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* Col 3: Newsletter */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-mono text-[9px] tracking-widest text-[#7e8c9c] font-bold uppercase">
            // {isRu ? "ИНФОРМАЦИОННАЯ РАССЫЛКА" : "NEWSLETTER"}
          </h4>
          <p className="text-xs text-neutral-500 font-light leading-relaxed">
            {isRu 
              ? "Подпишитесь на уведомления о тарифах, новых функциях и акциях для наших артистов."
              : "Subscribe to notifications on royalty updates, features, and campaigns."}
          </p>
          
          {emailSubmitted ? (
            <div className="p-3 bg-neutral-50 border border-brand-orange/30 text-brand-blue text-xs font-mono font-bold rounded-full text-center">
              {isRu ? "ЭЛЕКТРОННАЯ ПОЧТА ЗАФИКСИРОВАНА!" : "EMAIL RECORDED SUCCESSFULLY!"}
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setEmailSubmitted(true);
              }}
              className="flex items-center border border-neutral-300 p-1.5 focus-within:border-brand-blue transition-all bg-neutral-50 rounded-full pl-4 overflow-hidden"
            >
              <Mail className="w-4 h-4 text-neutral-400 mx-1 shrink-0" />
              <input
                type="email"
                required
                placeholder="e-mail"
                className="w-full bg-transparent text-xs text-neutral-900 border-none outline-none font-mono py-1 px-1"
              />
              <button
                type="submit"
                className="w-8 h-8 bg-brand-blue hover:bg-neutral-900 text-white flex items-center justify-center shrink-0 cursor-pointer rounded-full transition-all hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="max-w-[1250px] mx-auto z-10 border-t border-neutral-200 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono text-neutral-400 tracking-wider">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span>&copy; {currentYear} NIGHTVOLT. ALL RIGHTS RESERVED.</span>
          <span className="hidden md:inline">// SAFE ONLINE MUSIC DISTRIBUTION</span>
        </div>
        <div className="flex items-center gap-1.5 uppercase font-bold text-neutral-600 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
          <span>{isRu ? 'МУЗЫКА СЕРТИФИЦИРОВАНА И ЗАЩИЩЕНА' : 'SECURED MUSIC CONTENT'}</span>
        </div>
      </div>
    </footer>
  );
}
