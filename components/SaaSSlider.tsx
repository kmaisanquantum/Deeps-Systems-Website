import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShoppingBag,
  Store,
  CreditCard,
  Activity,
  Truck,
  ShieldCheck,
  Wallet,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Clock,
  Shield,
} from 'lucide-react';

const saasSystems = [
  { name: 'PNG Property', desc: 'A data aggregation and market intelligence tool designed specifically for the Papua New Guinea (PNG) real estate market.', url: 'https://property.dspng.tech', icon: <Building2 className="w-6 h-6" />, color: 'text-blue-600' },
  { name: 'Unity Mall', desc: "Unity Mall SME center. The digital marketplace for PNG's finest local vendors and artisans.", url: 'https://unity.dspng.tech', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-emerald-600' },
  { name: 'Garden City', desc: "Garden City SME. The digital marketplace for PNG's finest local vendors and artisans.", url: 'https://gc.dspng.tech', icon: <Store className="w-6 h-6" />, color: 'text-emerald-600' },
  { name: 'Kingsmen Finance', desc: 'Underwriting & Loan Management System. Port Moresby, PNG Est. 2026 · Digital Lending.', url: 'https://kingsmen.dspng.tech', icon: <CreditCard className="w-6 h-6" />, color: 'text-amber-600' },
  { name: 'Helt', desc: 'A remote medical triage portal for rural PNG.', url: 'https://helt.dspng.tech', icon: <Activity className="w-6 h-6" />, color: 'text-blue-600' },
  { name: 'Maket', desc: 'A lightweight logistics and market-price portal for PNG farmers.', url: 'https://maket.dspng.tech', icon: <Truck className="w-6 h-6" />, color: 'text-amber-600' },
  { name: 'Trust', desc: 'A verified e-commerce marketplace for Papua New Guinea.', url: 'https://trust.dspng.tech', icon: <ShieldCheck className="w-6 h-6" />, color: 'text-blue-600' },
  { name: 'Pe', desc: 'A micro-payment and credit-scoring app for PNG SMEs.', url: 'https://pe.dspng.tech', icon: <Wallet className="w-6 h-6" />, color: 'text-amber-600' },
  { name: 'RBM', desc: 'A reserve business monitoring tool to help SMEs and business in PNG.', url: 'https://rbm.dspng.tech', icon: <Monitor className="w-6 h-6" />, color: 'text-blue-600' },
  { name: 'DeepsGuard360', desc: 'Integrated Security Management SaaS platform for security firms and companies in Papua New Guinea — guard management, GPS patrol tracking, control room, incident management and client portal in one platform.', url: '/deepsguard360', icon: <Shield className="w-6 h-6" />, color: 'text-emerald-600', badge: 'New Platform' },
];

const SaaSSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const extendedSystems = [...saasSystems, ...saasSystems];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrameId: number;
    let lastTimestamp = 0;
    const speed = 0.05;

    const scroll = (timestamp: number) => {
      if (!isPaused && scrollContainer) {
        if (lastTimestamp !== 0) {
          scrollContainer.scrollLeft += speed * (timestamp - lastTimestamp);
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) scrollContainer.scrollLeft = 0;
        }
        lastTimestamp = timestamp;
      } else {
        lastTimestamp = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: container.scrollLeft + (direction === 'left' ? -300 : 300), behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-y border-emerald-500/20 bg-gray-950 py-12" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20"><div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]"/><div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]"/></div>
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col items-center gap-4 md:flex-row">
          <div className="flex shrink-0 items-center gap-3"><div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-600 px-4 py-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"><Clock className="h-4 w-4 text-white"/><span className="text-xs font-black uppercase tracking-tight text-white">BITC Platforms</span></div><div className="hidden h-8 w-px bg-white/10 md:block"/></div>
          <div className="flex-grow text-center md:text-left"><h2 className="font-montserrat text-xl font-black uppercase leading-tight tracking-tight text-white md:text-3xl"><span className="text-emerald-500 underline decoration-emerald-500/30 decoration-4 underline-offset-8">BITC</span> Ecosystem Deployments</h2></div>
          <div className="flex items-center gap-2"><button onClick={() => handleManualScroll('left')} className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-emerald-500/40 hover:bg-emerald-500/20" aria-label="Scroll platforms backward"><ChevronLeft className="h-5 w-5"/></button><button onClick={() => handleManualScroll('right')} className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-emerald-500/40 hover:bg-emerald-500/20" aria-label="Scroll platforms forward"><ChevronRight className="h-5 w-5"/></button></div>
        </div>
      </div>
      <div ref={scrollRef} className="no-scrollbar relative z-20 flex cursor-grab overflow-x-auto pb-8 active:cursor-grabbing" aria-label="Deeps Systems platforms carousel">
        <div className="flex whitespace-nowrap">
          {extendedSystems.map((system, idx) => {
            const card = <div className="group/card inline-flex h-full w-72 flex-col rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-500 hover:border-emerald-500/50 hover:bg-white/[0.08] md:w-80 md:p-8">
              <div className="mb-7 flex items-center justify-between"><div className={`rounded-2xl bg-white/5 p-4 shadow-inner transition-all duration-500 group-hover/card:scale-110 group-hover/card:bg-emerald-500/10 ${system.color}`}>{system.icon}</div><span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400">{system.badge ?? 'Online Soon'}</span></div>
              <div className="mb-4"><h3 className="mb-2 flex items-center gap-2 text-lg font-black text-white transition-colors group-hover/card:text-emerald-400">{system.name}</h3><div className="h-1 w-12 rounded-full bg-emerald-500 transition-all duration-500 group-hover/card:w-full"/></div>
              <p className="mb-6 line-clamp-3 flex-grow whitespace-normal text-[11px] font-medium leading-relaxed text-slate-400">{system.desc}</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4"><span className="text-[9px] font-bold uppercase tracking-[.2em] text-slate-500">PLATFORM ID: {system.name.toUpperCase().replaceAll(' ', '_')}</span><span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"/><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"/></span></div>
            </div>;
            return system.url.startsWith('/') ? <Link key={`${system.name}-${idx}`} to={system.url} aria-label={`Explore ${system.name}`} className="mx-3 block shrink-0 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-emerald-400">{card}</Link> : <a key={`${system.name}-${idx}`} href={system.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${system.name} in a new tab`} className="mx-3 block shrink-0 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-emerald-400">{card}</a>;
          })}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}` }}/>
    </section>
  );
};

export default SaaSSlider;
