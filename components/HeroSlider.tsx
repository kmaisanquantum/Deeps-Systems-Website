import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Binary } from 'lucide-react';

const AUTO_ADVANCE_MS = 6000;
const SLIDE_COUNT = 3;

/**
 * Auto-rotating carousel that sits just below the hero headline area.
 * Slide 1: DeepsGuard360 promo video. Slide 2: interactive demo CTA.
 * Slide 3: the original hero visual grid (Precision Core / Cloud Native / Scalable Logic).
 */
const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % SLIDE_COUNT), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="mt-20 md:mt-28 relative group opacity-0 animate-[fade-in_1.5s_ease-out_2s_forwards]">
      <div
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl bg-white dark:bg-transparent"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="DeepsGuard360 highlights"
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {/* Slide 1 — promo video */}
          <div className="relative w-full shrink-0 bg-slate-950" aria-hidden={index !== 0}>
            <video
              className="w-full aspect-video object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              poster="/images/deepsguard360-poster.svg"
              aria-label="DeepsGuard360 30-second platform tour"
            >
              <source src="/videos/deepsguard360-promo-30s.mp4" type="video/mp4" />
              <track kind="captions" src="/videos/deepsguard360-promo-30s.vtt" srcLang="en" label="English" default />
            </video>
            <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 flex flex-col items-start gap-2">
              <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1.5 text-[10px] md:text-xs font-bold text-white tracking-wide">
                DeepsGuard360 — 30-second platform tour
              </span>
              <Link
                to="/deepsguard360"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] md:text-xs font-bold text-white shadow-lg transition hover:bg-emerald-500"
              >
                Explore platform <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Slide 2 — interactive demo CTA */}
          <div
            className="w-full shrink-0 flex flex-col items-center justify-center text-center px-6 md:px-16 py-14 md:py-20 bg-gradient-to-br from-slate-950 to-emerald-950"
            aria-hidden={index !== 1}
          >
            <h3 className="font-montserrat text-2xl md:text-4xl font-extrabold text-white mb-3 md:mb-5">
              Try the interactive demo
            </h3>
            <p className="text-slate-300 text-sm md:text-lg max-w-xl mb-6 md:mb-8 leading-relaxed">
              Register a company, add guards and sites, and see the platform work with your own data.
            </p>
            <Link
              to="/deepsguard360/demo"
              className="inline-flex items-center justify-center gap-2 rounded-full quantum-gradient px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-bold text-white shadow-2xl shadow-emerald-500/20 transition hover:opacity-90"
            >
              Try the demo <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>

          {/* Slide 3 — original hero visual grid */}
          <div
            className="w-full shrink-0 flex items-center justify-center p-4 md:p-10 bg-white dark:bg-transparent"
            aria-hidden={index !== 2}
          >
            <div className="w-full bg-white dark:bg-transparent rounded-2xl md:rounded-[40px] border border-gray-100 dark:border-white/5 transition-all duration-700 group-hover:border-emerald-500/20">
              <div className="flex items-center gap-2 mb-6 md:mb-8 justify-center md:justify-start">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-100 dark:bg-blue-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-100 dark:bg-amber-500/20"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                <div className="h-24 md:h-32 bg-gray-50 dark:bg-white/2 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-[10px] text-gray-600 dark:text-slate-400 uppercase tracking-widest font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Precision Core</div>
                <div className="h-24 md:h-32 bg-gray-50 dark:bg-white/2 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-[10px] text-gray-600 dark:text-slate-400 uppercase tracking-widest font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Cloud Native</div>
                <div className="hidden md:flex h-32 bg-gray-50 dark:bg-white/2 rounded-xl border border-gray-100 dark:border-white/5 items-center justify-center text-[10px] text-gray-600 dark:text-slate-400 uppercase tracking-widest font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Scalable Logic</div>
                <div className="h-48 md:h-64 col-span-2 md:col-span-2 bg-emerald-500/[0.02] dark:bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-center justify-center relative overflow-hidden group/viz">
                  <div className="absolute inset-0 bg-emerald-500/[0.05] opacity-0 group-hover/viz:opacity-100 transition-opacity"></div>
                  <div className="flex flex-col items-center p-4 relative z-10">
                    <Zap className="w-10 h-10 md:w-12 md:h-12 text-emerald-600 mb-4 animate-pulse" />
                    <div className="h-1.5 w-32 md:w-48 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-emerald-600 w-1/2 animate-[loading_2s_infinite] shadow-[0_0_15px_rgba(22,163,74,0.8)]"></div>
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

        {/* Arrows */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/70 text-gray-800 dark:text-white border border-gray-100 dark:border-white/10 shadow-lg backdrop-blur transition hover:bg-white dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/70 text-gray-800 dark:text-white border border-gray-100 dark:border-white/10 shadow-lg backdrop-blur transition hover:bg-white dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={index === i}
              className={`h-2 rounded-full transition-all duration-300 ${index === i ? 'w-6 bg-emerald-500' : 'w-2 bg-white/60 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
