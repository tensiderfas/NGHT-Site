import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Music,
  Disc,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  socialUrl?: string;
  order: number;
}

interface ArtistsPageProps {
  lang: 'RU' | 'EN';
  onBack: () => void;
}

export default function ArtistsPage({ lang, onBack }: ArtistsPageProps) {
  const isRu = lang === 'RU';
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchArtists = async () => {
      try {
        const artistsRef = collection(db, 'artists');
        const q = query(artistsRef, orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        
        let loaded: Artist[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loaded.push({
            id: doc.id,
            name: data.name || '',
            imageUrl: data.imageUrl || '',
            socialUrl: data.socialUrl || '',
            order: Number(data.order ?? 0)
          });
        });

        setArtists(loaded);
      } catch (err) {
        setArtists([]);
        handleFirestoreError(err, OperationType.LIST, 'artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div 
      id="artists-subpage-container" 
      className="min-h-screen bg-transparent pt-32 pb-24 px-6 md:px-12 relative font-sans text-neutral-900 dark:text-neutral-50"
    >
      {/* Sleek architectural abstract grid background */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.012] dark:opacity-[0.02] pointer-events-none" />
      <div className="absolute top-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/[0.03] dark:bg-brand-blue/[0.04] filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Navigation back button */}
        <div className="flex justify-start mb-8">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white dark:bg-neutral-950/40 backdrop-blur-md hover:bg-neutral-900 dark:hover:bg-white text-neutral-800 dark:text-neutral-200 hover:text-white dark:hover:text-neutral-950 border border-neutral-200/80 dark:border-neutral-900/60 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shadow-sm uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-blue transition-colors group-hover:text-white dark:group-hover:text-neutral-950" />
            <span>{isRu ? 'Назад на главную' : 'Back to main'}</span>
          </button>
        </div>

        {/* Page title header */}
        <div className="mb-16 space-y-4 text-left border-b border-neutral-200/60 dark:border-neutral-900/60 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 border border-brand-blue/20 dark:border-brand-blue/10 text-brand-blue rounded-full text-[9px] font-mono font-black tracking-[0.2em] uppercase select-none">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue fill-brand-blue/10 animate-pulse" />
            <span>NIGHTVOLT // {isRu ? 'ОТКРЫТЫЙ КАТАЛОГ АВТОРОВ' : 'ARTIST ROSTER CATALOGUE'}</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-none">
            {isRu ? 'Наши артисты' : 'Our Artists'}
          </h1>
          
          <p className="max-w-[720px] text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
            {isRu 
              ? 'Список актуальных музыкальных исполнителей, групп и авторов лейбла NIGHTVOLT.'
              : 'Our dynamic list of active musical artists, bands, and creators signed to the NIGHTVOLT label.'}
          </p>
        </div>

        {/* Artists Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-[4/5] rounded-3xl bg-neutral-100 dark:bg-neutral-900 animate-pulse border border-neutral-200/60 dark:border-neutral-900/60" 
              />
            ))}
          </div>
        ) : artists.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto select-none bg-white/50 dark:bg-neutral-950/20 backdrop-blur-sm rounded-4xl border border-neutral-200/60 dark:border-neutral-900/60 p-8">
            <div className="w-16 h-16 bg-brand-blue/5 border border-brand-blue/20 rounded-full flex items-center justify-center mx-auto text-brand-blue shadow-inner">
              <Music className="w-6 h-6 text-brand-blue animate-bounce" />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">
              {isRu 
                ? 'В каталоге пока нет артистов. Добавьте первого артиста в панели администратора.' 
                : 'There are no artists in the catalog yet. Add your first artist in the administrative panel.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {artists.map((artist, index) => {
                const cardContent = (
                  <div className="relative w-full h-full">
                    {/* Top hover gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />

                    {/* Image Container */}
                    <div className="relative w-full h-full overflow-hidden bg-neutral-950 shrink-0">
                      {artist.imageUrl ? (
                        <img 
                          src={artist.imageUrl} 
                          alt={artist.name} 
                          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.75] dark:brightness-[0.7] group-hover:brightness-[0.85]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Disc className="w-10 h-10 text-neutral-800 animate-spin" style={{ animationDuration: '6s' }} />
                        </div>
                      )}
                      
                      {/* Dark Overlay Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/20 group-hover:via-neutral-950/30 transition-all duration-500 z-10" />
                    </div>

                    {/* Glassmorphic border design */}
                    <div className="absolute inset-0 border border-white/5 rounded-3xl z-20 pointer-events-none group-hover:border-brand-blue/25 transition-all duration-300" />

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-left pointer-events-none z-20 gap-2.5">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-[8px] text-neutral-400 group-hover:text-brand-turquoise transition-colors font-bold uppercase">
                          NIGHTVOLT // ARTIST
                        </span>
                        {artist.socialUrl && (
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-turquoise transition-colors" />
                        )}
                      </div>

                      <h3 className="font-display text-lg md:text-xl font-black text-white tracking-wide leading-tight group-hover:text-brand-turquoise transition-colors uppercase">
                        {artist.name}
                      </h3>
                    </div>
                  </div>
                );

                if (artist.socialUrl) {
                  return (
                    <motion.a
                      key={artist.id}
                      href={artist.socialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.96, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -15 }}
                      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-neutral-950 border border-neutral-200/10 dark:border-neutral-800/30 rounded-3xl overflow-hidden group hover:border-brand-blue/30 transition-all duration-300 relative select-none aspect-[4/5] w-full block cursor-pointer hover:shadow-2xl hover:shadow-brand-blue/5 hover:-translate-y-1"
                    >
                      {cardContent}
                    </motion.a>
                  );
                }

                return (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -15 }}
                    transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-neutral-950 border border-neutral-200/10 dark:border-neutral-800/30 rounded-3xl overflow-hidden group hover:border-brand-blue/30 transition-all duration-300 relative select-none aspect-[4/5] w-full block hover:shadow-2xl hover:shadow-brand-blue/5 hover:-translate-y-1"
                  >
                    {cardContent}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Dynamic CTA card info */}
        <div className="mt-20 bg-white/70 dark:bg-neutral-950/40 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-900/60 p-8 md:p-10 rounded-4xl flex flex-col md:flex-row items-center gap-8 justify-between shadow-xl shadow-neutral-100/50 dark:shadow-none relative overflow-hidden group hover:border-brand-blue/30 dark:hover:border-brand-blue/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 text-left z-10">
            <span className="font-mono text-[9px] tracking-widest text-[#7e8c9c] uppercase font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
              {isRu ? 'ПАРТНЕРСТВО И ПРАВА' : 'COOPERATIVE PARTNERSHIP'}
            </span>
            <h4 className="font-display font-black text-xl md:text-2xl text-neutral-950 dark:text-neutral-50 uppercase tracking-tight leading-none">
              {isRu ? 'Хотите опубликовать свой релиз у нас?' : 'Want to publish your next release?'}
            </h4>
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light max-w-[650px] leading-relaxed">
              {isRu 
                ? 'Мы постоянно ищем новые таланты и оказываем мощную дистрибьюторскую поддержку. Отправьте свой оригинальный трек через демо-форму на главной странице.'
                : 'We are constantly looking for talented independent creators and musical producers. Submit your single via our official demo portal.'}
            </p>
          </div>

          <button
            onClick={() => {
              onBack();
              setTimeout(() => {
                const formElement = document.querySelector('#submit-demo');
                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
              }, 180);
            }}
            className="px-8 py-4 bg-brand-blue text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-neutral-950 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer active:scale-97 select-none uppercase font-bold shrink-0 shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5 z-10"
          >
            {isRu ? 'ОТПРАВИТЬ СИНГЛ' : 'SUBMIT TRACK'}
          </button>
        </div>

      </div>
    </div>
  );
}
