import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Globe,
  Radio,
  FileCheck
} from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
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
      className="w-16 h-16 text-neutral-800 hover:text-brand-orange transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)] select-none pointer-events-none"
    >
      {/* Outer organic fluid shape from the actual logo */}
      <path 
        d="M 52,15 
           C 65,15 78,28 88,38 
           C 98,48 102,58 84,65 
           C 72,70 66,72 67,78 
           C 69,84 81,81 82,86 
           C 83,90 75,98 64,100 
           C 50,102 34,94 28,84 
           C 20,72 16,58 22,46 
           C 28,34 38,28 52,15 Z" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* Central circular ring */}
      <circle 
        cx="53" 
        cy="53" 
        r="16" 
        stroke="currentColor" 
        strokeWidth="2.5" 
      />
      {/* Inner comma/apostrophe shape */}
      <path 
        d="M 53,42 
           C 59.5,42 64.5,47 64.5,53.5 
           C 64.5,60 59.5,65 53,65 
           C 50,65 45,68 45,72 
           C 45,75.5 48,76 50,76 
           C 56,76 58,71 58,67 
           C 58,67 60,67 60,67 
           C 60,71 57.5,78 50,78 
           C 47,78 43,76.5 43,72.5 
           C 43,67 48.5,64 50.5,63.5 
           C 48.5,62.5 45.5,59.5 45.5,53.5 
           C 45.5,47 50.5,42 53,42 Z" 
        fill="currentColor"
      />
    </svg>
  );
}

export const DEFAULT_PARTNERS: Partner[] = [
  {
    id: 'media-vision-group',
    name: 'Media Vision Group',
    descriptionRu: 'Прогрессивный музыкальный лейбл и дистрибьютор, сотрудничающий с NIGHTVOLT в целях совместного издания каталогов, взаимного продвижения новейших музыкальных релизов и расширения аудиторного охвата наших артистов по всему миру.',
    descriptionEn: 'A progressive music label and distributor collaborating with NIGHTVOLT to co-publish catalogs, drive synergistic release promotions, and expand overall artist reach across streaming networks globally.',
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

        // Always ensure Media Vision Group is first
        const mvgInDb = loaded.find(p => p.id === 'media-vision-group' || p.name.toLowerCase().includes('media vision'));
        let finalPartners = [...DEFAULT_PARTNERS];
        
        // Filter out duplicate MVG entries and add other dynamic partners
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
      className="min-h-screen bg-[#fafafc] pt-28 pb-20 px-6 md:px-12 relative font-sans text-neutral-900"
    >
      {/* Futuristic technical lines */}
      <div className="absolute top-0 left-[10%] bottom-0 w-[1.5px] bg-neutral-200/40 pointer-events-none hidden md:block" />
      <div className="absolute top-0 right-[10%] bottom-0 w-[1.5px] bg-neutral-200/40 pointer-events-none hidden md:block" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Navigation Head Back */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-neutral-900 border border-neutral-200 rounded-full text-xs font-mono font-bold tracking-wider text-neutral-800 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 mb-10 select-none uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-brand-orange group-hover:text-white" />
          <span>{isRu ? 'Назад на главную' : 'Back to main'}</span>
        </button>

        {/* Page title header banner */}
        <div className="mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/5 border border-brand-orange/15 text-brand-orange rounded-full text-[9px] font-mono font-black tracking-[0.2em] uppercase select-none">
            <Sparkles className="w-3 h-3 text-brand-orange animate-pulse" />
            <span>NIGHTVOLT // {isRu ? 'ЛЕЙБЛЫ И ДИСТРИБЬЮТОРЫ' : 'COLLABORATING LABELS'}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 uppercase">
            {isRu ? 'ПАРТНЕРСКАЯ СЕТЬ' : 'PARTNERS NETWORK'}
          </h1>
          
          <p className="max-w-[700px] text-sm md:text-base text-neutral-500 font-light leading-relaxed">
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-8 hover:border-brand-orange/40 hover:shadow-xl hover:shadow-brand-orange/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                >
                  {/* Hexagon neon background elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/[0.015] rounded-bl-full pointer-events-none group-hover:bg-brand-orange/[0.03] transition-colors" />
                  
                  <div>
                    {/* Partner Logo/Avatar Area */}
                    <div className="h-28 flex items-center mb-6 relative">
                      {isMVG ? (
                        <MediaVisionLogo />
                      ) : partner.logoUrl ? (
                        <img 
                          src={partner.logoUrl} 
                          alt={`${partner.name} logo`} 
                          className="w-24 h-24 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-neutral-800"
                          referrerPolicy="no-referrer"
                        />
                      ) : partner.logoSvg ? (
                        <div 
                          className="w-24 h-24 text-neutral-800 theme-svg-container"
                          dangerouslySetInnerHTML={{ __html: partner.logoSvg }} 
                        />
                      ) : (
                        <div className="w-20 h-20 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-center font-display font-black text-2xl text-neutral-400 select-none group-hover:border-brand-orange group-hover:text-brand-orange transition-colors">
                          {partner.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}

                      {isMVG && (
                        <span className="absolute top-0 right-0 px-2.5 py-0.5 bg-brand-orange text-white text-[8px] font-mono font-bold rounded-full tracking-wider animate-pulse uppercase">
                          {isRu ? 'ЛЕЙБЛ-ПАРТНЕР' : 'PARTNER LABEL'}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-2xl font-black tracking-tight text-neutral-900 group-hover:text-brand-orange transition-colors mb-4 uppercase">
                      {partner.name}
                    </h3>

                    <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed mb-6 whitespace-pre-line">
                      {description}
                    </p>
                  </div>

                  {/* Operational Web Link */}
                  {partner.websiteUrl && (
                    <div className="pt-4 border-t border-neutral-100 mt-auto">
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-brand-orange transition-colors uppercase group/link"
                      >
                        <span>{isRu ? 'Перейти на сайт' : 'Visit website'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-brand-orange transition-colors group-hover/link:translate-x-0.5" />
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer info box */}
        <div className="mt-16 p-8 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-1">
            <h4 className="font-display font-black text-lg text-neutral-900 uppercase">
              {isRu ? 'ХОТИТЕ СТАТЬ НАШИМ ПАРТНЕРОМ?' : 'WANT TO BECOME OUR PARTNER?'}
            </h4>
            <p className="text-xs text-neutral-500 font-light max-w-[580px]">
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
            className="px-6 py-3 bg-brand-orange text-white hover:bg-neutral-900 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer active:scale-97 select-none uppercase"
          >
            {isRu ? 'Связаться с нами' : 'Contact Support'}
          </button>
        </div>

      </div>
    </div>
  );
}
