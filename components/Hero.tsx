import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Zap, Binary,
  Mail, Twitter, Linkedin, X
} from 'lucide-react';

const Hero: React.FC = () => {
  const [showGlow, setShowGlow] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();

  const driftTypes = ['drift-1', 'drift-2', 'drift-3', 'drift-4'];
  const particles = useMemo(() => Array.from({ length: 15 }).map(() => {
    const size = Math.random() * 3 + 1;
    const isRed = Math.random() > 0.3;
    const driftType = driftTypes[Math.floor(Math.random() * driftTypes.length)];
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${size}px`,
      duration: `${Math.random() * 40 + 40}s`,
      delay: `${Math.random() * -60}s`,
      pulseDuration: `${Math.random() * 8 + 4}s`,
      opacity: Math.random() * 0.05 + 0.01,
      blur: size > 2 ? '2px' : '0px',
      color: isRed ? 'bg-rose-500' : 'bg-gray-400',
      driftType
    };
  }), []);

  const headlineLine1 = "Digital Transformation for the Pacific.";
  const headlineLine2 = "Classical Precision. Future Scale.";
  const wordsLine1 = headlineLine1.split(" ");
  const wordsLine2 = headlineLine2.split(" ");
  
  const wordDelay = 0.08;
  const lineGap = 0.3;
  
  const totalWords = wordsLine1.length + wordsLine2.length;
  const totalAnimationTime = (totalWords * wordDelay) + lineGap + 0.8;

  useEffect(() => {
    const timer = setTimeout(() => setShowGlow(true), totalAnimationTime * 1000);
    return () => clearTimeout(timer);
  }, [totalAnimationTime]);

  const handleAction = (path: string) => {
    navigate(path);
  };

  const renderAnimatedWords = (words: string[], baseDelay: number) => {
    return words.map((word, idx) => (
      <span
        key={`${baseDelay}-${idx}`}
        className="animate-word inline-block mr-[0.2em] md:mr-[0.25em] whitespace-nowrap"
        style={{ animationDelay: `${baseDelay + (idx * wordDelay)}s` }}
      >
        {word}
      </span>
    ));
  };

  const shareLinks = [
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=Deeps Systems - Digital Transformation&body=Check out Deeps Systems at https://dspng.tech`,
      color: 'hover:text-rose-600'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=https://dspng.tech&text=Accelerating digital transformation with Deeps Systems.`,
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=https://dspng.tech`,
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`quantum-particle ${p.color} transition-opacity duration-1000`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationName: `${p.driftType}, quantum-pulse`,
              animationDuration: `${p.duration}, ${p.pulseDuration}`,
              animationTimingFunction: 'linear, ease-in-out',
              animationIterationCount: 'infinite, infinite',
              animationDelay: `${p.delay}, ${p.delay}`,
              opacity: p.opacity,
              filter: `blur(${p.blur})`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[10px] md:text-xs font-bold text-rose-600 mb-8 md:mb-10 tracking-widest uppercase shadow-sm">
          <Binary className="w-3.5 h-3.5" />
          Born-in-the-Cloud Frameworks
        </div>

        <h1 
          className={`font-montserrat text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.2] md:leading-[1.1] mb-8 md:mb-10 max-w-4xl mx-auto py-1 transition-all duration-1000 [perspective:1000px] text-gray-900 dark:text-white ${showGlow ? 'headline-glow-active' : ''}`}
        >
          <div className="block mb-1 md:mb-4">
            {renderAnimatedWords(wordsLine1, 0)}
          </div>
          <div className="block quantum-text-gradient">
            {renderAnimatedWords(wordsLine2, (wordsLine1.length * wordDelay) + lineGap)}
          </div>
        </h1>
        
        <p className="text-gray-500 dark:text-slate-400 text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed opacity-0 animate-[fade-in_1s_ease-out_1.5s_forwards] px-2 text-balance font-medium">
          Accelerating PNG's leading enterprises through minimalist, high-performance digital architectures and robust cloud-native strategies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 opacity-0 animate-[fade-in_1s_ease-out_1.8s_forwards]">
          <button 
            onClick={() => handleAction('/solutions')}
            className="group w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full quantum-gradient text-white font-bold text-lg md:text-xl flex items-center justify-center gap-2 btn-cta-pulse active-click z-20 relative shadow-2xl shadow-rose-500/20"
          >
            Start Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          <button 
            onClick={() => handleAction('/advantage')}
            className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full bg-white dark:bg-transparent text-gray-900 dark:text-white font-bold text-base md:text-lg btn-secondary-cta active-click border border-gray-200 dark:border-white/10"
          >
            Our Approach
          </button>
        </div>

        <div className="mt-20 md:mt-28 relative group opacity-0 animate-[fade-in_1.5s_ease-out_2s_forwards]">
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="bg-white dark:bg-transparent rounded-2xl md:rounded-[40px] p-4 md:p-10 max-w-5xl mx-auto overflow-hidden border border-gray-100 dark:border-white/5 group-hover:border-rose-500/20 transition-all duration-700 shadow-2xl">
             <div className="flex items-center gap-2 mb-6 md:mb-8 justify-center md:justify-start">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/10"></div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                <div className="h-24 md:h-32 bg-gray-50 dark:bg-white/2 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Precision Core</div>
                <div className="h-24 md:h-32 bg-gray-50 dark:bg-white/2 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Cloud Native</div>
                <div className="hidden md:flex h-32 bg-gray-50 dark:bg-white/2 rounded-xl border border-gray-100 dark:border-white/5 items-center justify-center text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Scalable Logic</div>
                <div className="h-48 md:h-64 col-span-2 md:col-span-2 bg-rose-500/[0.02] dark:bg-rose-500/5 rounded-2xl border border-rose-500/10 flex items-center justify-center relative overflow-hidden group/viz">
                  <div className="absolute inset-0 bg-rose-500/[0.05] opacity-0 group-hover/viz:opacity-100 transition-opacity"></div>
                  <div className="flex flex-col items-center p-4 relative z-10">
                    <Zap className="w-10 h-10 md:w-12 md:h-12 text-rose-600 mb-4 animate-pulse" />
                    <div className="h-1.5 w-32 md:w-48 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-rose-600 w-1/2 animate-[loading_2s_infinite] shadow-[0_0_15px_rgba(225,29,72,0.8)]"></div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block h-64 bg-gray-50 dark:bg-white/2 rounded-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
                   <div className="absolute inset-4 border border-gray-200 dark:border-white/5 rounded-xl border-dashed animate-[spin_20s_linear_infinite]"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Binary className="w-8 h-8 text-gray-200 dark:text-slate-700 opacity-20" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-sm rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/10 shadow-2xl relative animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50 dark:hover:bg-white/10 text-gray-400 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl md:text-2xl font-montserrat font-bold mb-1 text-gray-900 dark:text-white">Share Our Vision</h3>
            <p className="text-gray-500 dark:text-slate-400 text-xs md:text-sm mb-6 md:mb-8">Connect with Deeps Systems.</p>
            <div className="space-y-3">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all group ${link.color} active-click`}
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-white/5 group-hover:bg-white/10 transition-colors shadow-sm">{link.icon}</div>
                  <span className="font-bold text-sm md:text-base text-gray-700 dark:text-white/90">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}} />
    </section>
  );
};

export default Hero;
