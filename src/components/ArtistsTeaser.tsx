import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Music, Disc, ShieldCheck } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  socialUrl?: string;
  order: number;
}

interface ArtistsTeaserProps {
  lang: 'RU' | 'EN';
  onViewAll: () => void;
}

export default function ArtistsTeaser({ lang, onViewAll }: ArtistsTeaserProps) {
  const isRu = lang === 'RU';
  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const q = query(collection(db, 'artists'), orderBy('order', 'asc'), limit(3));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const list: Artist[] = snap.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || '',
              imageUrl: data.imageUrl || '',
              socialUrl: data.socialUrl || '',
              order: Number(data.order ?? 0)
            };
          });
          setFeaturedArtists(list);
        } else {
          setFeaturedArtists([]);
        }
      } catch (err) {
        setFeaturedArtists([]);
        handleFirestoreError(err, OperationType.LIST, 'artists');
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  if (!loading && featuredArtists.length === 0) {
    return null;
  }

  return (
    <section 
      id="artists-teaser-section"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden border-t border-neutral-200/40 dark:border-neutral-900/40"
    >
      {/* Absolute background grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-[0.015] dark:opacity-[0.02] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-blue/[0.03] dark:bg-brand-blue/[0.04] filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1250px] mx-auto relative z-10 space-y-16">
        
        {/* Caption & Heading header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-neutral-200/60 dark:border-neutral-900/60 pb-12">
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 border border-brand-blue/20 dark:border-brand-blue/10 text-brand-blue rounded-full text-[9px] font-mono font-black tracking-[0.2em] uppercase select-none">
              <Music className="w-3.5 h-3.5 text-brand-blue fill-brand-blue/10 animate-pulse" />
              <span>NIGHTVOLT // {isRu ? 'РЕЗИДЕНТЫ ЛЕЙБЛА' : 'OFFICIAL ARTISTS'}</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-neutral-950 dark:text-white uppercase">
              {isRu ? 'Наши артисты' : 'Our Artists'}
            </h2>
            
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-[680px]">
              {isRu 
                ? 'Встречайте талантливых авторов и исполнителей, которые выбрали NIGHTVOLT для публикации и дистрибуции своего творчества на мировых стриминговых витринах.' 
                : 'Meet the talented creators and performance groups who chose NIGHTVOLT to distribute their soundtracks, launch singles, and secure catalog releases worldwide.'}
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right shrink-0 text-left">
            <button
              onClick={onViewAll}
              className="px-6 py-3.5 bg-brand-blue text-white hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-neutral-950 rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer active:scale-97 hover:shadow-xl hover:shadow-brand-blue/25 hover:-translate-y-0.5 inline-flex items-center gap-2.5 group uppercase"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>{isRu ? 'ОТКРЫТЬ ВЕСЬ РОСТЕР' : 'EXPLORE ROSTER'}</span>
            </button>
          </div>
        </div>

        {/* Top 3 Artists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-[4/5] rounded-3xl bg-neutral-100 dark:bg-neutral-900 animate-pulse border border-neutral-200/60 dark:border-neutral-900/60" 
              />
            ))
          ) : (
            featuredArtists.map((artist, idx) => {
              const cardContent = (
                <div className="relative w-full h-full">
                  {/* Subtle hover top bar accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-turquoise scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />
                  
                  {/* Artist image layer */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-950">
                    {artist.imageUrl ? (
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.75] group-hover:brightness-[0.85]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
                        <Disc className="w-12 h-12 text-neutral-800 animate-spin" style={{ animationDuration: '6s' }} />
                      </div>
                    )}
                  </div>

                  {/* Glassmorphic card borders & ambient shadows */}
                  <div className="absolute inset-0 border border-white/5 dark:border-white/5 rounded-3xl z-20 pointer-events-none group-hover:border-brand-blue/20 transition-all duration-300" />

                  {/* Dark premium gradient vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/20 group-hover:via-neutral-950/30 transition-all duration-500 z-10" />

                  {/* Badge & Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end text-left pointer-events-none z-20 gap-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-[8px] text-neutral-400 group-hover:text-brand-blue transition-colors font-bold uppercase">
                        NIGHTVOLT // 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl md:text-2.5xl text-white tracking-wide leading-tight group-hover:text-brand-turquoise transition-colors uppercase select-none">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 bg-neutral-950 shadow-lg hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-300 cursor-pointer block hover:-translate-y-1"
                  >
                    {cardContent}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 bg-neutral-950 shadow-lg hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-300 block hover:-translate-y-1"
                >
                  {cardContent}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
