import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers 
} from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
// @ts-ignore
import mediaVisionLogoImg from '../assets/images/media_vision_logo-1.png';

export interface Partner {
  id: string;
  name: string;
  descriptionRu: string;
  descriptionEn: string;
  websiteUrl?: string;
  logoSvg?: string;
  logoUrl?: string;
  createdAt?: any;
}

interface PartnersProps {
  lang: 'RU' | 'EN';
  onBack: () => void;
}

// Built-in logo rendering favoring the authentic uploaded PNG
export function MediaVisionLogo() {
  const [loadError, setLoadError] = useState(false);

  if (!loadError) {
    return (
      <img 
        src={mediaVisionLogoImg} 
        alt="Media Vision Group Logo" 
        onError={() => setLoadError(true)}
        className="w-20 h-20 object-contain filter drop-shadow-[0_2px_12px_rgba(239,51,64,0.15)] select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-16 h-16 text-neutral-800 transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)] select-none pointer-events-none"
    >
      <path 
        d="M 52,15 C 65,15 78,28 88,38 C 98,48 102,58 84,65 C 72,70 66,72 67,78 C 69,84 81,81 82,86 C 83,90 75,98 64,100 C 50,102 34,94 28,84 C 20,72 16,58 22,46 C 28,34 38,28 52,15 Z" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
        fill="currentColor"
        fillOpacity="0.04"
      />
      <circle cx="53" cy="53" r="16" stroke="currentColor" strokeWidth="2.5" />
      <path 
        d="M 53,42 C 59.5,42 64.5,47 64.5,53.5 C 64.5,60 59.5,65 53,65 C 50,65 45,68 45,72 C 45,75.5 48,76 50,76 C 56,76 58,71 58,67 C 58,67 60,67 60,67 C 60,71 57.5,78 50,78 C 47,78 43,76.5 43,72.5 C 43,67 48.5,64 50.5,63.5 C 48.5,62.5 45.5,59.5 45.5,53.5 C 45.5,47 50.5,42 53,42 Z" 
        fill="currentColor"
      />
    </svg>
  );
}

export const DEFAULT_PARTNERS: Partner[] = [
  {
    id: 'media-vision-group',
    name: 'Media Vision Group',
    descriptionRu: 'Современный музыкальный лейбл и креативное агентство, активно сотрудничающее с NIGHTVOLT для совместной дистрибуции каталогов, синергетического промоушена и реализации масштабных проектов артистов нового поколения.',
    descriptionEn: 'A progressive music label and creative agency collaborating with NIGHTVOLT to co-publish catalogs, drive synergistic release promotions, and expand overall artist reach.',
    websiteUrl: 'https://mediavisiongroup.agency'
  }
];

export default function Partners({ lang, onBack }: PartnersProps) {
  const isRu = lang === 'RU';
  const [partners, setPartners] = useState<Partner[]>(DEFAULT_PARTNERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchPartners = async () => {
      try {
        const partnersRef = collection(db, 'partners');
        const q = query(partnersRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        
        let loaded: Partner[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loaded.push({
            id: doc.id,
            name: data.name || '',
            descriptionRu: data.descriptionRu || '',
            descriptionEn: data.descriptionEn || '',
            websiteUrl: data.websiteUrl || '',
            logoSvg: data.logoSvg || '',
            logoUrl: data.logoUrl || ''
          });
        });
        
        let finalPartners = [...DEFAULT_PARTNERS];
        const filteredLoaded = loaded.filter(p => !p.id.includes('media-vision-group') && !p.name.toLowerCase().includes('media vision'));
        setPartners([...finalPartners, ...filteredLoaded]);
      } catch (err) {
        console.warn('Could not load partners, using defaults:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div 
      id="partners-subpage-container" 
      className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-28 pb-20 px-6 md:px-12 relative text-neutral-900 dark:text-neutral-100 font-sans"
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Navigation Head Back */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-950 dark:bg-neutral-900 dark:hover:bg-white border border-neutral-200/80 dark:border-neutral-800 rounded-full text-xs font-mono font-bold tracking-wider text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-950 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 mb-12 select-none uppercase"
        >
          <ArrowLeft className="w-4 h-4 text-brand-blue group-hover:text-brand-turquoise transition-colors" />
          <span>{isRu ? 'Назад на главную' : 'Back to main'}</span>
        </button>

        {/* Page title header banner */}
        <div className="mb-16 space-y-4 text-left">
          <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.25em] mb-4 uppercase font-bold text-left">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
            <span>NIGHTVOLT // {isRu ? 'ЛЕЙБЛЫ И ДИСТРИБЬЮТОРЫ' : 'COLLABORATING LABELS'}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-none">
            {isRu ? 'ПАРТНЕРСКАЯ СЕТЬ' : 'PARTNERS NETWORK'}
          </h1>
          
          <p className="max-w-[720px] text-sm md:text-base text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
            {isRu 
              ? 'С музыкальной платформой и импринтом NIGHTVOLT активно сотрудничают ведущие музыкальные лейблы, саб-лейблы и дистрибьюторские сети. Они выбирают нашу инфраструктуру для продвижения независимой музыки, дистрибуции каталогов и взаимной поддержки артистов нового поколения.'
              : 'Leading music labels, sub-labels, and global distributors collaborate with the NIGHTVOLT ecosystem. They leverage our platform and creative infrastructure to publish independent releases, optimize distribution, and expand next-gen artist lifecycles.'}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {partners.map((partner, index) => {
              const isMVG = partner.id === 'media-vision-group';
              const description = isRu ? partner.descriptionRu : partner.descriptionEn;

              return (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-3xl p-8 hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[340px] shadow-sm"
                >
                  {/* Subtle hover top bar accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
                  
                  <div>
                    {/* Partner Logo/Avatar Area */}
                    <div className="h-28 flex items-center mb-6 relative select-none">
                      {isMVG ? (
                        <MediaVisionLogo />
                      ) : partner.logoUrl ? (
                        <img 
                          src={partner.logoUrl} 
                          alt={`${partner.name} logo`} 
                          className="w-24 h-24 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                          referrerPolicy="no-referrer"
                        />
                      ) : partner.logoSvg ? (
                        <div 
                          className="w-24 h-24 text-neutral-800 dark:text-white theme-svg-container"
                          dangerouslySetInnerHTML={{ __html: partner.logoSvg }} 
                        />
                      ) : (
                        <div className="w-20 h-20 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center font-display font-black text-2xl text-neutral-400 group-hover:border-brand-blue group-hover:text-brand-blue transition-colors">
                          {partner.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}

                      {isMVG && (
                        <span className="absolute top-0 right-0 px-3 py-1 bg-brand-blue text-white text-[8px] font-mono font-bold rounded-full tracking-widest uppercase">
                          {isRu ? 'ГЛАВНЫЙ ПАРТНЕР' : 'CORE PARTNER'}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-left space-y-3">
                      <h3 className="font-display text-2xl font-black tracking-tight text-neutral-950 dark:text-white group-hover:text-brand-blue transition-colors uppercase leading-none">
                        {partner.name}
                      </h3>

                      <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed whitespace-pre-line">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Operational Web Link */}
                  {partner.websiteUrl && (
                    <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80 mt-8">
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 hover:text-brand-blue dark:hover:text-brand-turquoise transition-colors uppercase group/link"
                      >
                        <span>{isRu ? 'Перейти на сайт' : 'Visit website'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover/link:text-brand-blue transition-transform duration-200" />
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer info box with solid design */}
        <div className="mt-16 p-8 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-4xl flex flex-col md:flex-row items-start md:items-center gap-6 justify-between text-left shadow-sm">
          <div className="space-y-1.5">
            <h4 className="font-display font-black text-lg text-neutral-950 dark:text-white uppercase leading-none">
              {isRu ? 'ХОТИТЕ СТАТЬ НАШИМ ПАРТНЕРОМ?' : 'WANT TO BECOME OUR PARTNER?'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal max-w-[580px] leading-relaxed">
              {isRu 
                ? 'Наш лейбл открыт для интеграций, совместных проектов и медиа-партнерства. Свяжитесь с нами напрямую по электронной почте или оставьте контакты.'
                : 'Our label is open to media integrations, joint campaigns, and platforms. Feel free to contact us via our artist support channels.'}
            </p>
          </div>
          <button
            onClick={() => {
              const contactElement = document.querySelector('#main-footer');
              if (contactElement) contactElement.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-brand-blue text-white hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-950 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer select-none uppercase shrink-0 shadow-sm"
          >
            {isRu ? 'Связаться с нами' : 'Contact Support'}
          </button>
        </div>

      </div>
    </div>
  );
}
