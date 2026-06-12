import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, RefreshCw, ArrowRight, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { translations } from '../translations';

interface NavbarProps {
  lang: 'RU' | 'EN';
  onToggleLang: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onScrollTo: (selector: string) => void;
  onNavigateToTerms?: (tab: 'terms' | 'platform' | 'agreement' | 'privacy' | 'dmca') => void;
  onNavigateToPromo?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToVacancies?: () => void;
  onNavigateToPartners?: () => void;
  onNavigateToArtists?: () => void;
}

export default function Navbar({ lang, onToggleLang, theme, onToggleTheme, onScrollTo, onNavigateToTerms, onNavigateToPromo, onNavigateToAbout, onNavigateToVacancies, onNavigateToPartners, onNavigateToArtists }: NavbarProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [logoGlitch, setLogoGlitch] = useState(false);

  const isRu = lang === 'RU';
  const t = translations[lang];

  useEffect(() => {
    // Clock set to Moscow Time
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('ru-RU', {
          timeZone: 'Europe/Moscow',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setCurrentTime(`${formatter.format(now)} MSK`);
      } catch (err) {
        const now = new Date();
        const hours = String((now.getUTCHours() + 3) % 24).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}:${seconds} MSK`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Automatic logo glitch effect loop (every 3.2 seconds)
    const logoInterval = setInterval(() => {
      setLogoGlitch(true);
      setTimeout(() => setLogoGlitch(false), 250);
    }, 3200);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      logoInterval && clearInterval(logoInterval);
    };
  }, []);

  const navLinks = [
    { label: t.philosophy, target: '#philosophy' },
    { label: t.services, target: '#services' },
    { label: t.pricing, target: '#pricing' },
    { label: t.artists, target: '#artists' },
    { label: t.partners, target: '#partners' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/95 dark:bg-[#0c0d0e]/95 backdrop-blur-md py-3.5 border-neutral-200/50 dark:border-neutral-800/50 shadow-sm'
          : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand Group with automated effects */}
        <div 
          onClick={() => onScrollTo('#hero')}
          className="flex items-center gap-3 cursor-pointer group active:scale-98 transition-transform select-none relative"
        >
          {/* Logo with automated micro-glitch class when logoGlitch is true */}
          <Logo 
            className={`w-11 h-11 transition-all duration-150 ${
              logoGlitch 
                ? 'text-brand-orange scale-115 rotate-12 skew-x-6 drop-shadow-[0_0_12px_rgba(225,34,46,0.85)]' 
                : scrolled ? 'text-brand-blue' : 'text-brand-blue group-hover:scale-105'
            }`} 
            animated={logoGlitch}
            stroke={logoGlitch ? 'var(--color-brand-orange)' : 'var(--color-brand-blue)'}
            strokeWidth={1.8}
          />

          {/* Label text */}
          <span className="font-display text-xl md:text-2xl font-black tracking-[0.16em] text-neutral-900 dark:text-neutral-50 transition-colors uppercase">
            NIGHTVOLT
          </span>
        </div>

        {/* Center Navigation Links - Desktop Only */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (link.target === '#partners' && onNavigateToPartners) {
                  onNavigateToPartners();
                } else if (link.target === '#artists' && onNavigateToArtists) {
                  onNavigateToArtists();
                } else {
                  onScrollTo(link.target);
                }
              }}
              className="text-[10px] font-mono font-bold tracking-[0.16em] text-neutral-500 dark:text-neutral-400 hover:text-brand-blue dark:hover:text-brand-orange transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-orange after:transition-all hover:after:w-full cursor-pointer uppercase"
            >
              {link.label}
            </button>
          ))}
          {onNavigateToPromo && (
            <button
              onClick={() => onNavigateToPromo()}
              className="text-[10px] font-mono font-bold tracking-[0.16em] text-brand-orange hover:text-brand-blue transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-blue after:transition-all hover:after:w-full cursor-pointer uppercase flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span>{isRu ? 'ПРОМО' : 'PROMO'}</span>
            </button>
          )}

          {onNavigateToTerms && (
            <button
              onClick={() => onNavigateToTerms('terms')}
              className="text-[10px] font-mono font-bold tracking-[0.16em] text-brand-blue dark:text-brand-turquoise hover:text-brand-orange dark:hover:text-brand-orange transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-orange after:transition-all hover:after:w-full cursor-pointer uppercase"
            >
              {isRu ? 'УСЛОВИЯ' : 'TERMS'}
            </button>
          )}
        </nav>

        {/* Right Action Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Active Ru / EN Language Toggle Switcher Badge */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-full text-[10px] font-mono font-bold tracking-wider text-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-800/80 dark:border-neutral-800 dark:text-neutral-200 transition-all cursor-pointer group active:scale-95"
            title={isRu ? 'Switch to English' : 'Переключить на Русский'}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isRu ? 'bg-brand-orange animate-pulse' : 'bg-brand-blue'}`} />
            <span>{isRu ? 'RU' : 'EN'}</span>
            <RefreshCw className="w-2.5 h-2.5 text-neutral-400 group-hover:rotate-180 transition-transform duration-500 ml-0.5" />
          </button>

          {/* Active Dark / Light Mode Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center p-1.5 md:p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-full text-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-800/80 dark:border-neutral-800 dark:text-neutral-200 transition-all cursor-pointer group active:scale-95"
            title={theme === 'dark' ? (isRu ? 'Включить светлую тему' : 'Switch to Light theme') : (isRu ? 'Включить темную тему' : 'Switch to Dark theme')}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-brand-blue" />
            )}
          </button>

          {/* Simple clock */}
          <div className="hidden sm:flex flex-col text-right font-mono text-[9px] tracking-wider text-neutral-400 select-none">
            <span className="flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
              <span>{isRu ? 'ОНЛАЙН' : 'ONLINE'}</span>
            </span>
            <span className="text-neutral-900 dark:text-neutral-100 font-bold">{currentTime || '00:00:00 MSK'}</span>
          </div>

          {/* Core CTA */}
          <button
            onClick={() => onScrollTo('#submit-demo')}
            className="px-4.5 py-2 md:px-5 md:py-2.5 bg-brand-blue text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-neutral-950 rounded-full text-[11px] font-mono font-bold tracking-widest transition-all duration-300 active:scale-97 cursor-pointer hover:shadow-lg hover:shadow-brand-blue/15 hover:-translate-y-0.5 flex items-center gap-1.5 group font-bold"
          >
            <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
            <span>{t.sendSingle.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
