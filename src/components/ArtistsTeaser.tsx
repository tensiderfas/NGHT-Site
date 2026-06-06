import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ExternalLink, Music } from 'lucide-react';
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
      className="py-20 md:py-28 px-6 md:px-12 bg-[#fafafc] dark:bg-[#0c0d0e]/40 relative overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50"
    >
      {/* Structural backgrounds */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/20 dark:bg-neutral-800/20 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/20 dark:bg-neutral-800/20 pointer-events-none hidden md:block" />

      <div className="max-w-[1240px] mx-auto relative z-10 space-y-12">
        {/* Caption & Heading header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e1222e]/5 border border-[#e1222e]/15 text-[#e1222e] rounded-full text-[9px] font-mono font-black tracking-[0.2em] uppercase select-none">
              <Music className="w-3.5 h-3.5 text-[#e1222e]" />
              <span>NIGHTVOLT // {isRu ? 'РЕЗИДЕНТЫ ЛЕЙБЛА' : 'OFFICIAL ARTISTS'}</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 uppercase">
              {isRu ? 'Наши артисты' : 'Our Artists'}
            </h2>
            
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
              {isRu 
                ? 'Встречайте талантливых авторов и исполнителей, которые выбрали NIGHTVOLT для публикации и дистрибуции своего творчества на мировых стриминговых витринах.' 
                : 'Meet the talented creators and performance groups who chose NIGHTVOLT to distribute their soundtracks, launch singles, and secure catalog releases worldwide.'}
            </p>
          </div>

          <div className="shrink-0 text-left">
            <button
              onClick={onViewAll}
              className="px-6 py-3.5 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-950 hover:bg-[#e1222e] dark:hover:bg-[#e1222e] dark:hover:text-white rounded-full text-xs font-mono font-bold tracking-widest transition-all cursor-pointer active:scale-97 hover:shadow-lg hover:shadow-[#e1222e]/15 hover:-translate-y-0.5 inline-flex items-center gap-2 group uppercase"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              <span>{isRu ? 'ПОКАЗАТЬ ВСЕХ АРТИСТОВ' : 'EXPLORE ROSTER'}</span>
            </button>
          </div>
        </div>

        {/* Top 3 Artists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-[4/5] rounded-2xl bg-neutral-200/40 dark:bg-neutral-800/40 animate-pulse border border-neutral-200/50 dark:border-neutral-800/10" 
              />
            ))
          ) : (
            featuredArtists.map((artist, idx) => {
              const cardContent = (
                <>
                  {/* Artist image layer */}
                  {artist.imageUrl ? (
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8] group-hover:brightness-[0.9]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                      <Music className="w-12 h-12 text-neutral-800" />
                    </div>
                  )}

                  {/* Dark gradient vignette layer - matching the dark/mysterious aesthetic of Image 2 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end text-left pointer-events-none">
                    <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-widest leading-none group-hover:text-[#e1222e] transition-colors uppercase select-none">
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                    className="group relative aspect-[4/5] rounded-[20px] overflow-hidden border border-neutral-200/10 dark:border-neutral-800/30 bg-neutral-950 shadow-md hover:shadow-xl transition-all cursor-pointer block"
                  >
                    {cardContent}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                  className="group relative aspect-[4/5] rounded-[20px] overflow-hidden border border-neutral-200/10 dark:border-neutral-800/30 bg-neutral-950 shadow-md hover:shadow-xl transition-all block"
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
