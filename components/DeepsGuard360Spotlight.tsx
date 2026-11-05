import React from 'react';  
import { Link } from 'react-router-dom';  
import { ArrowRight, MapPin, Shield, ShieldCheck, Users, Activity, Radio, BarChart3 } from 'lucide-react';  
  
const capabilities = [  
  { label: 'Guard Management', icon: Users }, { label: 'GPS Patrol Tracking', icon: MapPin },  
  { label: 'Control Room', icon: Radio }, { label: 'Incident Management', icon: Activity },  
  { label: 'Client Portal', icon: ShieldCheck }, { label: 'SaaS Subscriptions', icon: BarChart3 },  
];  
  
const DeepsGuard360Spotlight: React.FC = () => (  
  <section className="relative isolate overflow-hidden border-y border-sky-500/20 bg-gray-950 px-5 py-16 text-white md:px-6 md:py-24">  
    <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />  
    <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">  
      <div>  
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-sky-300"><Shield className="h-3.5 w-3.5" /> DeepsGuard360 security operations</div>  
        <h2 className="max-w-2xl font-montserrat text-3xl font-extrabold leading-tight md:text-5xl">DeepsGuard360 <span className="text-sky-400">— Now on the market for PNG security firms</span></h2>  
        <p className="mt-5 text-lg font-bold text-white md:text-xl">One Platform. Complete Security Operations.</p>  
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">An integrated security management SaaS platform for security firms and companies in Papua New Guinea—connecting teams, field operations, and clients in one place.</p>  
        <div className="mt-6 flex flex-wrap gap-2">{capabilities.map(({ label, icon: Icon }) => <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"><Icon className="h-3.5 w-3.5 text-sky-300" />{label}</span>)}</div>  
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/deepsguard360" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-6 py-3 text-sm font-bold text-white">Explore DeepsGuard360 <ArrowRight className="h-4 w-4" /></Link></div>  
      </div>  
      <div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-4 rounded-[2rem] bg-sky-500/10 blur-2xl" /><div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-5 text-white shadow-2xl shadow-blue-950/30 sm:p-6">  
        <div className="mb-4 flex items-center justify-between"><p className="text-sm font-bold">Watch: 30-second platform tour</p><span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-[10px] font-bold text-sky-300">VIDEO</span></div>  
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">  
          <video className="aspect-video w-full object-cover" autoPlay muted loop playsInline controls preload="metadata" poster="/images/deepsguard360-poster.svg" aria-label="DeepsGuard360 product demo video">  
            <source src="/videos/deepsguard360-promo-30s.mp4" type="video/mp4" />  
            <track kind="captions" src="/videos/deepsguard360-promo-30s.vtt" srcLang="en" label="English" default />  
          </video>  
        </div>  
        <div className="mt-4 flex items-center justify-between rounded-xl bg-sky-500/10 px-4 py-3"><span className="text-xs font-semibold text-sky-100">Sound on for the narrated tour</span><ArrowRight className="h-4 w-4 text-sky-300" /></div>  
      </div></div>  
    </div>  
  </section>  
);  
export default DeepsGuard360Spotlight;