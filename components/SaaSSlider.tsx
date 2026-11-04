import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShoppingBag, Store, CreditCard, Activity, Truck, ShieldCheck, Wallet, Monitor, ChevronLeft, ChevronRight, Clock, Shield } from 'lucide-react';

const saasSystems = [
  { name: 'PNG Property', desc: 'A data aggregation and market intelligence tool designed specifically for the Papua New Guinea (PNG) real estate market.', url: 'https://property.dspng.tech', icon: <Building2 className="w-6 h-6"/>, color: 'text-blue-600' },
  { name: 'Unity Mall', desc: "Unity Mall SME center. The digital marketplace for PNG's finest local vendors and artisans.", url: 'https://unity.dspng.tech', icon: <ShoppingBag className="w-6 h-6"/>, color: 'text-emerald-600' },
  { name: 'Garden City', desc: "Garden City SME. The digital marketplace for PNG's finest local vendors and artisans.", url: 'https://gc.dspng.tech', icon: <Store className="w-6 h-6"/>, color: 'text-emerald-600' },
  { name: 'Kingsmen Finance', desc: 'Underwriting & Loan Management System. Port Moresby, PNG Est. 2026 · Digital Lending.', url: 'https://kingsmen.dspng.tech', icon: <CreditCard className="w-6 h-6"/>, color: 'text-amber-600' },
  { name: 'Helt', desc: 'A remote medical triage portal for rural PNG.', url: 'https://helt.dspng.tech', icon: <Activity className="w-6 h-6"/>, color: 'text-blue-600' },
  { name: 'Maket', desc: 'A lightweight logistics and market-price portal for PNG farmers.', url: 'https://maket.dspng.tech', icon: <Truck className="w-6 h-6"/>, color: 'text-amber-600' },
  { name: 'Trust', desc: 'A verified e-commerce marketplace for Papua New Guinea.', url: 'https://trust.dspng.tech', icon: <ShieldCheck className="w-6 h-6"/>, color: 'text-blue-600' },
  { name: 'Pe', desc: 'A micro-payment and credit-scoring app for PNG SMEs.', url: 'https://pe.dspng.tech', icon: <Wallet className="w-6 h-6"/>, color: 'text-amber-600' },
  { name: 'RBM', desc: 'A reserve business monitoring tool to help SMEs and business in PNG.', url: 'https://rbm.dspng.tech', icon: <Monitor className="w-6 h-6"/>, color: 'text-blue-600' },
  { name: 'DeepsGuard360', desc: 'Integrated Security Management SaaS platform for security firms and companies in Papua New Guinea — guard management, GPS patrol tracking, control room, incident management and client portal in one platform.', url: '/deepsguard360', icon: <Shield className="w-6 h-6"/>, color: 'text-sky-500', badge: 'New Platform' },
];

const SaaSSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const extendedSystems = [...saasSystems, ...saasSystems];
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let frame: number; let last = 0;
    const scroll = (timestamp: number) => {
      if (!isPaused && container) {
        if (last !== 0) { container.scrollLeft += .05 * (timestamp - last); if (container.scrollLeft >= container.scrollWidth / 2) container.scrollLeft = 0; }
        last = timestamp;
      } else last = 0;
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);
  const move = (direction: 'left'|'right') => { const el=scrollRef.current; if(el) el.scrollTo({left:el.scrollLeft+(direction==='left'?-300:300),behavior:'smooth'}); };

  return <section className="relative overflow-hidden border-y border-emerald-500/20 bg-gray-950 py-12" onMouseEnter={()=>setIsPaused(true)} onMouseLeave={()=>setIsPaused(false)}>
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20"><div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]"/><div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]"/></div>
    <div className="relative z-20 mx-auto max-w-7xl px-6"><div className="mb-10 flex flex-col items-center gap-4 md:flex-row"><div className="flex shrink-0 items-center gap-3"><div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-600 px-4 py-2"><Clock className="h-4 w-4 text-white"/><span className="text-xs font-black uppercase text-white">BITC Platforms</span></div></div><h2 className="flex-grow text-center font-montserrat text-xl font-black uppercase text-white md:text-left md:text-3xl">BITC Ecosystem Deployments</h2><div className="flex gap-2"><button onClick={()=>move('left')} aria-label="Scroll platforms backward" className="rounded-xl border border-white/10 bg-white/5 p-3 text-white"><ChevronLeft className="h-5 w-5"/></button><button onClick={()=>move('right')} aria-label="Scroll platforms forward" className="rounded-xl border border-white/10 bg-white/5 p-3 text-white"><ChevronRight className="h-5 w-5"/></button></div></div></div>
    <div ref={scrollRef} className="no-scrollbar relative z-20 flex cursor-grab overflow-x-auto pb-8 active:cursor-grabbing"><div className="flex whitespace-nowrap">{extendedSystems.map((system,idx)=>{const card=<div className="group/card inline-flex h-full w-72 flex-col rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-all duration-500 hover:border-emerald-500/50 md:w-80 md:p-8"><div className="mb-7 flex items-center justify-between"><div className={`rounded-2xl bg-white/5 p-4 ${system.color}`}>{system.icon}</div><span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400">{system.badge??'Online Soon'}</span></div><div className="mb-4"><h3 className="mb-2 text-lg font-black text-white group-hover/card:text-emerald-400">{system.name}</h3><div className="h-1 w-12 rounded-full bg-emerald-500"/></div><p className="mb-6 line-clamp-3 flex-grow whitespace-normal text-[11px] leading-relaxed text-slate-400">{system.desc}</p><div className="mt-auto border-t border-white/5 pt-4 text-[9px] font-bold uppercase tracking-[.2em] text-slate-500">PLATFORM ID: {system.name.toUpperCase().replaceAll(' ','_')}</div></div>;return system.url.startsWith('/')?<Link key={`${system.name}-${idx}`} to={system.url} aria-label={`Explore ${system.name}`} className="mx-3 block shrink-0 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-emerald-400">{card}</Link>:<a key={`${system.name}-${idx}`} href={system.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${system.name} in a new tab`} className="mx-3 block shrink-0 rounded-[2rem]">{card}</a>;})}</div></div>
    <style dangerouslySetInnerHTML={{__html:'.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}'}}/>
  </section>;
};
export default SaaSSlider;
