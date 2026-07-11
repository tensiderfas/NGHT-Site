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
      className="fixed inset-0 bg-[#0b0c0e] text-[#f4f4f5] z-50 flex flex-col items-center justify-center select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <div className="flex flex-col items-center">
        {/* Breathing minimalist logo container */}
        <motion.div
          animate={{ 
            scale: [0.97, 1.03, 0.97],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.5, 
            ease: "easeInOut" 
          }}
          className="w-12 h-12 mb-8 flex items-center justify-center"
        >
          <Logo 
            className="w-full h-full text-brand-blue"
            fill="currentColor"
            stroke="none"
            viewBox="25 25 50 50"
          />
        </motion.div>

        {/* Brand Name */}
        <div className="flex items-center gap-1.5 mb-10 tracking-[0.2em] font-display font-bold text-xs uppercase text-white/90">
          <span>NIGHT</span>
          <span className="text-brand-blue">VOLT</span>
        </div>

        {/* Minimal progress tracker */}
        <div className="flex flex-col items-center gap-3">
          {/* Extremely thin progress bar */}
          <div className="w-32 h-[1px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-brand-blue"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          
          {/* Tiny percent indicator */}
          <span className="font-mono text-[10px] text-neutral-500 tracking-widest">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}

