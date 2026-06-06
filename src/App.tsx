import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Specs from './components/Specs';
import AboutPlatform from './components/AboutPlatform';
import AboutTeaser from './components/AboutTeaser';
import ContractSubmission from './components/ContractSubmission';
import MarketingSuite from './components/MarketingSuite';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DistributionTerms from './components/DistributionTerms';
import CustomCursor from './components/CustomCursor';
import Vacancies from './components/Vacancies';
import AdminPanel from './components/AdminPanel';
import Partners from './components/Partners';
import PartnersTeaser from './components/PartnersTeaser';
import ArtistsPage from './components/ArtistsPage';
import ArtistsTeaser from './components/ArtistsTeaser';

export default function App() {
  const [siteLoaded, setSiteLoaded] = useState(false);
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [viewTerms, setViewTerms] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'terms' | 'platform' | 'agreement' | 'privacy' | 'dmca'>('terms');
  const [viewPromoTools, setViewPromoTools] = useState(false);
  const [viewAbout, setViewAbout] = useState(false);
  const [viewVacancies, setViewVacancies] = useState(false);
  const [viewAdmin, setViewAdmin] = useState(false);
  const [viewPartners, setViewPartners] = useState(false);
  const [viewArtists, setViewArtists] = useState(false);

  // Sync state with DOM element of html
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Listen for hash-based hidden routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#nightvolt-admin') {
        setViewAdmin(true);
        setViewTerms(false);
        setViewPromoTools(false);
        setViewAbout(false);
        setViewVacancies(false);
        setViewPartners(false);
        setViewArtists(false);
      } else if (hash === '' || hash === '#') {
        setViewAdmin(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToTerms = (tab: 'terms' | 'platform' | 'agreement' | 'privacy' | 'dmca' = 'terms') => {
    setActiveLegalTab(tab);
    setViewTerms(true);
    setViewPromoTools(false);
    setViewAbout(false);
    setViewVacancies(false);
    setViewPartners(false);
    setViewArtists(false);
  };

  const handleNavigateToPromo = () => {
    setViewPromoTools(true);
    setViewTerms(false);
    setViewAbout(false);
    setViewVacancies(false);
    setViewPartners(false);
    setViewArtists(false);
  };

  const handleNavigateToAbout = () => {
    setViewAbout(true);
    setViewTerms(false);
    setViewPromoTools(false);
    setViewVacancies(false);
    setViewPartners(false);
    setViewArtists(false);
  };

  const handleNavigateToVacancies = () => {
    setViewVacancies(true);
    setViewTerms(false);
    setViewPromoTools(false);
    setViewAbout(false);
    setViewPartners(false);
    setViewArtists(false);
  };

  const handleNavigateToPartners = () => {
    setViewPartners(true);
    setViewTerms(false);
    setViewPromoTools(false);
    setViewAbout(false);
    setViewVacancies(false);
    setViewArtists(false);
  };

  const handleNavigateToArtists = () => {
    setViewArtists(true);
    setViewTerms(false);
    setViewPromoTools(false);
    setViewAbout(false);
    setViewVacancies(false);
    setViewPartners(false);
  };

            {/* Global smooth navigation scroll assistance */}
  const handleScrollTo = (selector: string) => {
    if (viewTerms || viewPromoTools || viewAbout || viewVacancies || viewAdmin || viewPartners || viewArtists) {
      setViewTerms(false);
      setViewPromoTools(false);
      setViewAbout(false);
      setViewVacancies(false);
      setViewAdmin(false);
      setViewPartners(false);
      setViewArtists(false);
      window.location.hash = '';
      // Wait minor duration for component unmount/mount to complete, then slide
      setTimeout(() => {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return;
    }

    const targetElement = document.querySelector(selector);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'RU' ? 'EN' : 'RU'));
  };

  // Auto scroll to top when changing sub-views or active tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [viewTerms, activeLegalTab, viewPromoTools, viewAbout, viewVacancies, viewAdmin, viewPartners, viewArtists]);

  return (
    <div id="site-root-container" className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 selection:bg-brand-blue selection:text-white ${theme === 'dark' ? 'dark bg-[#0c0d0e] text-neutral-100' : 'bg-[#fafafc] text-neutral-800'}`}>
      
      {/* VHS Background Noise & Scanline simulation overlays */}
      <div className="vhs-bg-grain" />
      <div className="vhs-bg-scanlines" />
      <div className="vhs-bg-tracking" />

      {/* 0. Custom Circular Tracking Cursor Option */}
      <CustomCursor />

      {/* 1. Page Preloader */}
      <AnimatePresence mode="wait">
        {!siteLoaded && (
          <Preloader key="app-preloader" onComplete={() => setSiteLoaded(true)} />
        )}
      </AnimatePresence>

      {/* 2. Main Site content */}
      <AnimatePresence mode="sync">
        {siteLoaded && (
          <motion.div
            key="main-portal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col relative z-10"
          >
            {/* Unique Navbar with Localized toggles and Direct Legal Links */}
            <Navbar 
              lang={lang} 
              onToggleLang={handleToggleLang} 
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onScrollTo={handleScrollTo} 
              onNavigateToTerms={handleNavigateToTerms}
              onNavigateToPromo={handleNavigateToPromo}
              onNavigateToAbout={handleNavigateToAbout}
              onNavigateToVacancies={handleNavigateToVacancies}
              onNavigateToPartners={handleNavigateToPartners}
              onNavigateToArtists={handleNavigateToArtists}
            />

            {/* Structured Page Content routing */}
            <main className="flex-grow pt-[1px]">
              <AnimatePresence mode="wait">
                {viewAdmin ? (
                  <motion.div
                    key="admin-subpage"
                    initial={{ opacity: 0, scale: 0.99, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AdminPanel 
                      lang={lang} 
                      onClose={() => {
                        window.location.hash = '';
                        setViewAdmin(false);
                      }} 
                    />
                  </motion.div>
                ) : viewTerms ? (
                  <motion.div
                    key="terms-subpage"
                    initial={{ opacity: 0, scale: 0.99, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <DistributionTerms 
                      lang={lang} 
                      onBack={() => setViewTerms(false)} 
                      initialTab={activeLegalTab}
                    />
                  </motion.div>
                ) : viewPromoTools ? (
                  <motion.div
                    key="promo-subpage"
                    initial={{ opacity: 0, scale: 0.99, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <MarketingSuite 
                      lang={lang} 
                      onBack={() => setViewPromoTools(false)} 
                    />
                  </motion.div>
                ) : viewAbout ? (
                  <motion.div
                    key="about-subpage"
                    initial={{ opacity: 0, scale: 0.99, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AboutPlatform 
                      lang={lang} 
                      onBack={() => setViewAbout(false)} 
                    />
                  </motion.div>
                ) : viewVacancies ? (
                  <motion.div
                    key="vacancies-subpage"
                    initial={{ opacity: 0, scale: 0.99, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Vacancies 
                      lang={lang} 
                      onBack={() => setViewVacancies(false)} 
                    />
                  </motion.div>
                ) : viewPartners ? (
                  <motion.div
                    key="partners-subpage"
                    initial={{ opacity: 0, scale: 0.99, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Partners 
                      lang={lang} 
                      onBack={() => setViewPartners(false)} 
                    />
                  </motion.div>
                ) : viewArtists ? (
                  <motion.div
                    key="artists-subpage"
                    initial={{ opacity: 0, scale: 0.99, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ArtistsPage 
                      lang={lang} 
                      onBack={() => setViewArtists(false)} 
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="home-mainpage"
                    initial={{ opacity: 0, scale: 0.99, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.99, x: 20 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Hero visual panel with spark glitches */}
                    <Hero lang={lang} onScrollTo={handleScrollTo} />
                    
                    {/* Philosophy splits and 80/20 values */}
                    <Philosophy lang={lang} />
                    
                    {/* Expanded 5-card Services and detail grid */}
                    <Services lang={lang} />
                    
                    {/* Operational system technical specs */}
                    <Specs lang={lang} />
                    
                    {/* Immersive Biography, Foundations and Team Board Teaser Grid */}
                    <AboutTeaser lang={lang} onReadFull={handleNavigateToAbout} />
                    
                    {/* Curated artists roster block */}
                    <ArtistsTeaser lang={lang} onViewAll={handleNavigateToArtists} />
                    
                    {/* Label partners teaser showcasing Media Vision Group */}
                    <PartnersTeaser lang={lang} onViewAll={handleNavigateToPartners} />
                    
                    {/* Secure embed portal for Intake demo submissions */}
                    <ContractSubmission lang={lang} />
                    
                    {/* Localized FAQ accordion lists */}
                    <FAQ lang={lang} />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Consistent legal and external reference Footer card */}
            <Footer 
              lang={lang} 
              onScrollTo={handleScrollTo} 
              onNavigateToTerms={handleNavigateToTerms} 
              onNavigateToPromo={handleNavigateToPromo}
              onNavigateToAbout={handleNavigateToAbout}
              onNavigateToVacancies={handleNavigateToVacancies}
              onNavigateToPartners={handleNavigateToPartners}
              onNavigateToArtists={handleNavigateToArtists}
            />

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
