import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Pricing from './components/Pricing';
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

  // Routing parser helper for paths and subdomains
  const getPageFromUrl = () => {
    const path = window.location.pathname.toLowerCase();
    const hostname = window.location.hostname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    const isSubdomain = (sub: string) => hostname.startsWith(`${sub}.`);

    if (path.startsWith('/admin') || hash === '#admin' || hash === '#nightvolt-admin' || isSubdomain('admin')) {
      return { page: 'admin' as const, tab: '' };
    }
    if (path.startsWith('/artists') || path.startsWith('/artist') || isSubdomain('artists') || isSubdomain('artist')) {
      return { page: 'artists' as const, tab: '' };
    }
    if (path.startsWith('/partners') || path.startsWith('/partner') || isSubdomain('partners') || isSubdomain('partner')) {
      return { page: 'partners' as const, tab: '' };
    }
    if (path.startsWith('/vacancies') || path.startsWith('/vacancy') || path.startsWith('/careers') || isSubdomain('vacancies') || isSubdomain('careers')) {
      return { page: 'vacancies' as const, tab: '' };
    }
    if (path.startsWith('/about') || isSubdomain('about')) {
      return { page: 'about' as const, tab: '' };
    }
    if (path.startsWith('/promo') || path.startsWith('/marketing') || isSubdomain('promo') || isSubdomain('marketing')) {
      return { page: 'promo' as const, tab: '' };
    }
    
    // Legal subdivisions
    if (path.startsWith('/platform')) {
      return { page: 'terms' as const, tab: 'platform' };
    }
    if (path.startsWith('/agreement')) {
      return { page: 'terms' as const, tab: 'agreement' };
    }
    if (path.startsWith('/privacy')) {
      return { page: 'terms' as const, tab: 'privacy' };
    }
    if (path.startsWith('/dmca')) {
      return { page: 'terms' as const, tab: 'dmca' };
    }
    if (path.startsWith('/terms')) {
      return { page: 'terms' as const, tab: 'terms' };
    }
    
    return { page: 'home' as const, tab: '' };
  };

  // Safe router navigation dispatcher
  const navigate = (page: 'home' | 'admin' | 'artists' | 'partners' | 'vacancies' | 'about' | 'promo' | 'terms', tab: string = '') => {
    let newPath = '/';
    if (page === 'admin') newPath = '/admin';
    else if (page === 'artists') newPath = '/artists';
    else if (page === 'partners') newPath = '/partners';
    else if (page === 'vacancies') newPath = '/vacancies';
    else if (page === 'about') newPath = '/about';
    else if (page === 'promo') newPath = '/promo';
    else if (page === 'terms') {
      if (tab && tab !== 'terms') {
        newPath = `/${tab}`;
      } else {
        newPath = '/terms';
      }
    }

    if (window.location.pathname !== newPath) {
      window.history.pushState({ page, tab }, '', newPath);
    }

    setViewAdmin(page === 'admin');
    setViewArtists(page === 'artists');
    setViewPartners(page === 'partners');
    setViewVacancies(page === 'vacancies');
    setViewAbout(page === 'about');
    setViewPromoTools(page === 'promo');
    setViewTerms(page === 'terms');
    if (page === 'terms' && tab) {
      setActiveLegalTab(tab as any);
    }
  };

  // Keep state matching URL path & handle back/forward navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const resolved = getPageFromUrl();
      setViewAdmin(resolved.page === 'admin');
      setViewArtists(resolved.page === 'artists');
      setViewPartners(resolved.page === 'partners');
      setViewVacancies(resolved.page === 'vacancies');
      setViewAbout(resolved.page === 'about');
      setViewPromoTools(resolved.page === 'promo');
      setViewTerms(resolved.page === 'terms');
      if (resolved.page === 'terms' && resolved.tab) {
        setActiveLegalTab(resolved.tab as any);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    
    // Process matching view instantly on mount
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigateToTerms = (tab: 'terms' | 'platform' | 'agreement' | 'privacy' | 'dmca' = 'terms') => {
    navigate('terms', tab);
  };

  const handleNavigateToPromo = () => {
    navigate('promo');
  };

  const handleNavigateToAbout = () => {
    navigate('about');
  };

  const handleNavigateToVacancies = () => {
    navigate('vacancies');
  };

  const handleNavigateToPartners = () => {
    navigate('partners');
  };

  const handleNavigateToArtists = () => {
    navigate('artists');
  };

            {/* Global smooth navigation scroll assistance */}
  const handleScrollTo = (selector: string) => {
    if (viewTerms || viewPromoTools || viewAbout || viewVacancies || viewAdmin || viewPartners || viewArtists) {
      navigate('home');
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

  // Elite Dynamic Search Engine Optimization (SEO) Side Effect Engine
  useEffect(() => {
    try {
      const isRu = lang === 'RU';
      let title = '';
      let desc = '';

      if (viewAdmin) {
        title = isRu ? "NIGHTVOLT — Панель управления администратора" : "NIGHTVOLT — Admin Operations Dashboard";
        desc = isRu ? "Операционная консоль для управления музыкальным дистрибьютором и лейблом NIGHTVOLT." : "Operational operations console for digital distribute network, artist contracts, and metadata validation.";
      } else if (viewPromoTools) {
        title = isRu ? "Умные промо-инструменты для продвижения музыки — NIGHTVOLT" : "Smart Music Promotion Tools — NIGHTVOLT";
        desc = isRu ? "Продвигайте свои песни бесплатно с помощью встроенных инструментов NIGHTVOLT: смарт-линки, сбор статистики, подача заявок на питчинг в плейлисты." : "Free smart tools for tracking media performance, compiling multi-links, pitching releases to curators.";
      } else if (viewAbout) {
        title = isRu ? "О нашей музыкальной платформе и ценностях — NIGHTVOLT" : "About Our Music Platform & Mission — NIGHTVOLT";
        desc = isRu ? "Познакомьтесь с командой музыкального дистрибьютора NIGHTVOLT, нашей историей, философией и стандартами качественной отгрузки звука." : "Read the core background stories, hardware delivery standards, and artistic commitments of NIGHTVOLT.";
      } else if (viewVacancies) {
        title = isRu ? "Карьера и открытые вакансии в нашей команде — NIGHTVOLT" : "Careers & Team Openings — NIGHTVOLT";
        desc = isRu ? "Станьте частью команды NIGHTVOLT. Ищем модераторов, кураторов плейлистов, юристов по авторским правам и талантливых разработчиков." : "Active openings inside records moderation, visual curation, legal assistance, or web engineering.";
      } else if (viewPartners) {
        title = isRu ? "Наши официальные лейблы-партнеры — NIGHTVOLT" : "Official Record Label Partners — NIGHTVOLT";
        desc = isRu ? "Сообщество партнерских музыкальных объединений, звукозаписывающих студий и медиа-групп, сотрудничающих с платформой NIGHTVOLT." : "Ecosystem of independent labels, recording properties, and publishing catalogs united with NIGHTVOLT.";
      } else if (viewArtists) {
        title = isRu ? "Резиденты и каталог музыкального лейбла — NIGHTVOLT" : "Resident Artists & Catalogue — NIGHTVOLT";
        desc = isRu ? "Каталог независимых артистов мирового уровня, выпускающих свою музыку через NIGHTVOLT. Слушайте наши новинки во всех сервисах." : "Explore independent songwriters, top producers, and official album releases powered by NIGHTVOLT.";
      } else if (viewTerms) {
        if (activeLegalTab === 'platform' || activeLegalTab === 'terms') {
          title = isRu ? "Пользовательское соглашение платформы — NIGHTVOLT" : "Platform Terms & User Agreement — NIGHTVOLT";
          desc = isRu ? "Правовые положения и правила пользования дистрибуционной системой и сайтом NIGHTVOLT." : "Legal terms of membership, intellectual usage, and digital security of NIGHTVOLT system.";
        } else if (activeLegalTab === 'agreement') {
          title = isRu ? "Лицензионный договор-оферта — NIGHTVOLT" : "Music Licensing Offer Agreement — NIGHTVOLT";
          desc = isRu ? "Договор о предоставлении дистрибуционных услуг, роялти-сплитах 80/20 и сохранении 100% авторских прав артиста." : "The official distributor and artist contract detailing 80/20 splits, digital royalties, and ownership guarantees.";
        } else if (activeLegalTab === 'privacy') {
          title = isRu ? "Политика конфиденциальности личных данных — NIGHTVOLT" : "Personal Data Privacy Policy — NIGHTVOLT";
          desc = isRu ? "Заявление о защите персональной информации, хранении паролей и безопасности транзакций создателей контента." : "Detailed disclosure of identity safety, session cookies storage, and secured data operations.";
        } else if (activeLegalTab === 'dmca') {
          title = isRu ? "Защита авторских прав и политика DMCA — NIGHTVOLT" : "Copyright Protection & DMCA Policy — NIGHTVOLT";
          desc = isRu ? "Форма подачи претензий по нарушению интеллектуальной собственности и защита оригинальных фонограмм." : "Instructions on active copyright defense, takedown notices, and counterfeit prevention mechanisms.";
        } else {
          title = isRu ? "Юридические соглашения и документы — NIGHTVOLT" : "Legal Policy Documentation Workspace — NIGHTVOLT";
          desc = isRu ? "Свод юридических документов музыкального дистрибьютора NIGHTVOLT." : "Official agreement indexes, licensing contracts, privacy statements.";
        }
      } else {
        // Home mainpage
        title = isRu ? "NIGHTVOLT — Музыкальный дистрибьютор & Музыкальный лейбл" : "NIGHTVOLT — Digital Music Distribution & Record Label";
        desc = isRu ? "Выпустите свои треки на Яндекс Музыку, ВК Музыку, Spotify и Apple Music бесплатно с сохранением 100% прав и получением 80% роялти за 3 дня!" : "Modern music distributor and digital developer. Release your songs worldwide in 3 days, retain 100% master rights, enjoy 80/20 earnings.";
      }

      // 1. Sync Document Title
      document.title = title;

      // 2. Sync Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);

      // 3. Sync OpenGraph & Twitter Metas for gorgeous social snippets
      const metars = [
        { key: 'property', val: 'og:title', content: title },
        { key: 'property', val: 'og:description', content: desc },
        { key: 'name', val: 'twitter:title', content: title },
        { key: 'name', val: 'twitter:description', content: desc }
      ];

      metars.forEach(m => {
        let el = document.querySelector(`meta[${m.key}="${m.val}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(m.key, m.val);
          document.head.appendChild(el);
        }
        el.setAttribute('content', m.content);
      });

      // 4. Update core language attribute for Google Translate and Search Engines
      document.documentElement.lang = isRu ? 'ru' : 'en';

    } catch (e) {
      console.error("SEO sync error", e);
    }
  }, [lang, viewAdmin, viewTerms, activeLegalTab, viewPromoTools, viewAbout, viewVacancies, viewPartners, viewArtists]);

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
                      onClose={() => navigate('home')} 
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
                      onBack={() => navigate('home')} 
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
                      onBack={() => navigate('home')} 
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
                      onBack={() => navigate('home')} 
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
                      onBack={() => navigate('home')} 
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
                      onBack={() => navigate('home')} 
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
                      onBack={() => navigate('home')} 
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
                    
                    {/* Flexible Tariffs and pricing plans */}
                    <Pricing lang={lang} />
                    
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
