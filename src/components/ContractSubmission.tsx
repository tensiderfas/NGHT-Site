import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { translations } from '../translations';

interface ContractSubmissionProps {
  lang: 'RU' | 'EN';
}

export default function ContractSubmission({ lang }: ContractSubmissionProps) {
  const isRu = lang === 'RU';
  const t = translations[lang];
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Append Yandex Forms Static embed helper dynamically
    const script = document.createElement('script');
    script.src = "https://forms.yandex.ru/_static/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch (err) {
        // Safe ignore
      }
    };
  }, []);

  return (
    <section
      id="submit-demo"
      className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative block overflow-hidden border-b border-neutral-200/50"
    >
      {/* Structural visual lines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-neutral-200/5 pointer-events-none hidden md:block" />

      {/* Cyber ambient red glow */}
      <div className="absolute -bottom-[10%] -left-[5%] w-[40vw] h-[40vw] rounded-full bg-brand-orange/[0.015] filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Module Header */}
        <div className="border-b border-neutral-200 pb-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#7e8c9c] font-mono text-[10px] tracking-[0.2em] mb-4 uppercase font-bold">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
              <span>{t.submitBadge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight text-neutral-950 uppercase">
              {t.submitHeading}
            </h2>
          </div>
          <div className="md:text-right font-mono text-[9px] text-[#7e8c9c] tracking-widest font-bold uppercase">
            // {isRu ? 'ОТПРАВКА ДЕМО // DEMO SUBMISSION' : 'MATERIAL SUBMISSION'}
          </div>
        </div>

        {/* Informative Guidance */}
        <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed max-w-2xl mb-12">
          {t.submitDesc} {isRu ? "Каждая заявка будет оперативно прослушана нашими редакторами в порядке очереди." : "Each submission is parsed and reviewed carefully by our curation team."}
        </p>

        {/* Application Card Layout */}
        <div className="bg-[#fafafc] border border-neutral-200/70 shadow-xs rounded-4xl p-4 md:p-10 relative flex flex-col items-center justify-center min-h-[600px] overflow-hidden">
          
          {/* Subtle soundwave logo behind form for branding */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none text-brand-orange">
            <svg viewBox="0 0 100 100" width="360" height="360" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
              <path d="M25,35 L25,65 M50,15 L50,85 M75,35 L75,65" />
            </svg>
          </div>

          {/* Iframe dynamic loader spinner */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#fafafc]">
              <Loader2 className="w-10 h-10 text-brand-orange animate-spin mb-4" />
              <span className="font-mono text-[10px] text-[#7e8c9c] tracking-widest uppercase">
                {isRu ? "ЗАГРУЗКА ФОРМЫ ОТПРАВКИ..." : "LOADING SUBMISSION FORM..."}
              </span>
            </div>
          )}

          {/* Responsive Form Container */}
          <div className="w-full max-w-[650px] min-h-[580px] bg-white border border-neutral-150 rounded-2xl shadow-sm overflow-hidden z-20 relative">
            <iframe 
              src="https://forms.yandex.ru/cloud/6995f94eeb614637b4790bb7?iframe=1" 
              frameBorder="0" 
              name="ya-form-6995f94eeb614637b4790bb7" 
              width="100%"
              height="650px"
              className="w-full mix-blend-normal"
              onLoad={() => setIframeLoaded(true)}
              title="Nightvolt Material Input Frame"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
