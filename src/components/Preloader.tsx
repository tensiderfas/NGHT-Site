import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

interface PreloaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress < 30) {
        currentProgress += Math.floor(Math.random() * 8) + 4;
      } else if (currentProgress < 75) {
        currentProgress += Math.floor(Math.random() * 5) + 3;
      } else if (currentProgress < 99) {
        currentProgress += Math.floor(Math.random() * 2) + 1;
      } else {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      id="preloader-container"
      className="fixed inset-0 bg-white text-[#0a0c10] z-50 flex flex-col items-center justify-center select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.98,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <div className="flex flex-col items-center max-w-xl px-6">
        {/* Centered Hype-style brand logo with bold italic fonts - sized larger as requested */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          <span 
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter italic uppercase text-neutral-950 select-none"
            style={{ fontStyle: 'italic' }}
          >
            NIGHT
          </span>
          
          {/* Custom tilted sharp brand lightning bolt matching our official design */}
          <div className="text-3xl sm:text-4xl md:text-5xl w-[0.85em] h-[0.85em] flex items-center justify-center mt-0.5">
            <Logo 
              className="w-full h-full text-[#e1222e]"
              fill="#e1222e"
              stroke="none"
              viewBox="25 25 50 50"
            />
          </div>
          
          <span 
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter italic uppercase text-neutral-950 select-none"
            style={{ fontStyle: 'italic' }}
          >
            VOLT
          </span>
        </div>

        {/* Customized horizontal crimson red loading progress bar - matching larger typography */}
        <div className="w-[140px] sm:w-[180px] md:w-[220px] h-[3px] bg-neutral-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#e1222e]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
