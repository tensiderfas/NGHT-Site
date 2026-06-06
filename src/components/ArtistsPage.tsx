import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Music,
  Disc,
  Radio,
  UserCheck
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
      className="min-h-screen bg-[#fafafc] dark:bg-[#0c0d0e] pt-28 pb-20 px-6 md:px-12 relative font-sans text-neutral-900 dark:text-neutral-50"
    >
      {/* Decorative organic lines */}
      <div className="absolute top-0 left-[10%] bottom-0 w-[1.5px] bg-neutral-200/40 dark:bg-neutral-800/40 pointer-events-none hidden md:block" />
      <div className="absolute top-0 right-[10%] bottom-0 w-[1.5px] bg-neutral-200/40 dark:bg-neutral-800/40 pointer-events-none hidden md:block" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Navigation back button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 hover:bg-neutral-950 dark:hover:bg-neutral-100 dark:hover:text-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs font-mono font-bold tracking-wider text-neutral-800 dark:text-neutral-100 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 mb-10 select-none uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#e1222e] group-hover:text-white dark:group-hover:text-black" />
          <span>{isRu ? 'Назад на главную' : 'Back to main'}</span>
        </button>

        {/* Page title header */}
        <div className="mb-14 space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e1222e]/5 border border-[#e1222e]/15 text-[#e1222e] rounded-full text-[9px] font-mono font-black tracking-[0.2em] uppercase select-none">
            <Sparkles className="w-3 h-3 text-[#e1222e] animate-pulse" />
            <span>NIGHTVOLT // {isRu ? 'ОТКРЫТЫЙ КАТАЛОГ АВТОРОВ' : 'ARTIST ROSTER CATALOGUE'}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 uppercase">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-[4/5] rounded-3xl bg-neutral-200/40 dark:bg-neutral-800/40 animate-pulse border border-neutral-200/50 dark:border-neutral-800/10" 
              />
            ))}
          </div>
        ) : artists.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto select-none">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/40 rounded-full flex items-center justify-center mx-auto text-neutral-400 dark:text-neutral-600 shadow-inner">
              <Music className="w-6 h-6 text-[#e1222e]" />
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">
              {isRu 
                ? 'В каталоге пока нет артистов. Добавьте первого артиста в панели администратора.' 
                : 'There are no artists in the catalog yet. Add your first artist in the administrative panel.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {artists.map((artist, index) => {
                const cardContent = (
                  <>
                    {/* Visual Area */}
                    <div className="relative w-full h-full overflow-hidden bg-neutral-950 shrink-0">
                      {artist.imageUrl ? (
                        <img 
                          src={artist.imageUrl} 
                          alt={artist.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.8] dark:brightness-[0.75] group-hover:brightness-[0.9]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="w-10 h-10 text-neutral-800" />
                        </div>
                      )}
                      {/* Dark Overlay Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col justify-end text-left pointer-events-none">
                      <h3 className="font-display text-lg md:text-xl font-black text-white tracking-widest leading-none group-hover:text-[#e1222e] transition-colors uppercase">
                        {artist.name}
                      </h3>
                    </div>
                  </>
                );

                if (artist.socialUrl) {
                  return (
                    <motion.a
                      key={artist.id}
                      href={artist.socialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.96, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -20 }}
                      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                      className="bg-neutral-950 border border-neutral-200/10 dark:border-neutral-800/30 rounded-[20px] overflow-hidden group hover:border-[#e1222e]/40 transition-all duration-300 relative select-none aspect-[4/5] w-full block cursor-pointer hover:shadow-xl hover:shadow-[#e1222e]/5"
                    >
                      {cardContent}
                    </motion.a>
                  );
                }

                return (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -20 }}
                    transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                    className="bg-neutral-950 border border-neutral-200/10 dark:border-neutral-800/30 rounded-[20px] overflow-hidden group hover:border-[#e1222e]/40 transition-all duration-300 relative select-none aspect-[4/5] w-full block hover:shadow-xl hover:shadow-[#e1222e]/5"
                  >
                    {cardContent}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Dynamic CTA card info */}
        <div className="mt-16 p-8 bg-neutral-50 dark:bg-neutral-900/20 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/50 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-1 text-left">
            <h4 className="font-display font-black text-lg text-neutral-900 dark:text-neutral-100 uppercase">
              {isRu ? 'ХОТИТЕ ВСТУПИТЬ В НАШ КАТАЛОГ?' : 'WANT TO JOIN OUR ROSTER?'}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light max-w-[620px]">
              {isRu 
                ? 'Мы постоянно ищем новые таланты и оказываем мощную дистрибьюторскую поддержку. Отправьте свой трек через демо-форму на главной странице.'
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
            className="px-6 py-3 bg-[#e1222e] text-white hover:bg-neutral-900 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer active:scale-97 select-none uppercase font-bold shrink-0"
          >
            {isRu ? 'ОТПРАВИТЬ СИНГЛ' : 'SUBMIT TRACK'}
          </button>
        </div>

      </div>
    </div>
  );
}
