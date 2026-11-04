import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Shield, ShieldCheck, Users, Activity, Radio, BarChart3 } from 'lucide-react';

const capabilities = [
  { label: 'Guard Management', icon: Users },
  { label: 'GPS Patrol Tracking', icon: MapPin },
  { label: 'Control Room', icon: Radio },
  { label: 'Incident Management', icon: Activity },
  { label: 'Client Portal', icon: ShieldCheck },
  { label: 'SaaS Subscriptions', icon: BarChart3 },
];

const DeepsGuard360Spotlight: React.FC = () => (
  <section className="relative isolate overflow-hidden border-y border-emerald-500/20 bg-gray-950 px-5 py-16 text-white md:px-6 md:py-24">
    <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-300"><Shield className="h-3.5 w-3.5"/> New platform for PNG</div>
        <h2 className="max-w-2xl font-montserrat text-3xl font-extrabold leading-tight md:text-5xl">DeepsGuard360 <span className="text-emerald-400">— Now on the market for PNG security firms</span></h2>
        <p className="mt-5 text-lg font-bold text-white md:text-xl">One Platform. Complete Security Operations.</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">An integrated security management SaaS platform for security firms and companies in Papua New Guinea—connect your workforce, field operations, client access, and reporting in one place.</p>
        <div className="mt-6 flex flex-wrap gap-2">{capabilities.map(({ label, icon: Icon })=><span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200"><Icon className="h-3.5 w-3.5 text-emerald-400"/>{label}</span>)}</div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/deepsguard360" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-500">Explore Platform <ArrowRight className="h-4 w-4"/></Link><Link to="/deepsguard360/demo" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:border-emerald-400/50 hover:bg-white/10">Try Interactive Demo <ArrowRight className="h-4 w-4"/></Link></div>
      </div>
      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute -inset-4 rounded-[2rem] bg-emerald-500/10 blur-2xl"/>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1412] p-5 shadow-2xl shadow-black/40 sm:p-7">
          <div className="mb-6 flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300"><ShieldCheck className="h-5 w-5"/></div><div><p className="text-sm font-bold">Pacific Shield</p><p className="text-[10px] text-slate-400">Security operations · Demo preview</p></div></div><span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-300">Fictional data</span></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[['247','Guards'],['68','On duty'],['18','Sites'],['04','Incidents']].map(([value,label])=><div key={label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3"><p className="text-xl font-black text-white sm:text-2xl">{value}</p><p className="mt-1 text-[10px] text-slate-400">{label}</p></div>)}</div>
          <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4"><div className="mb-4 flex items-center justify-between"><p className="text-xs font-bold">Patrol activity</p><span className="text-[9px] text-emerald-300">SIMULATED VIEW</span></div><div className="relative h-36 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950 via-[#10241e] to-slate-900"><div className="absolute inset-0 opacity-30" style={{backgroundImage:'linear-gradient(25deg,transparent 48%,#647b6f 49%,#647b6f 50%,transparent 51%),linear-gradient(115deg,transparent 43%,#647b6f 44%,#647b6f 45%,transparent 46%)',backgroundSize:'90px 70px'}}/><div className="absolute left-[22%] top-[25%] h-3 w-3 rounded-full border-2 border-white bg-emerald-400 shadow-[0_0_14px_#34d399]"/><div className="absolute left-[48%] top-[55%] h-3 w-3 rounded-full border-2 border-white bg-blue-400 shadow-[0_0_14px_#60a5fa]"/><div className="absolute right-[20%] top-[30%] h-3 w-3 rounded-full border-2 border-white bg-amber-400 shadow-[0_0_14px_#fbbf24]"/><div className="absolute left-[23%] top-[34%] h-12 w-[38%] rotate-[29deg] border-t-2 border-dashed border-emerald-400"/><div className="absolute bottom-2 left-3 flex items-center gap-1 text-[9px] text-slate-300"><MapPin className="h-3 w-3 text-emerald-300"/> PNG operations preview · simulated markers</div></div></div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-500/10 px-4 py-3"><span className="text-xs font-semibold text-emerald-100">One connected operations view</span><ArrowRight className="h-4 w-4 text-emerald-300"/></div>
        </div>
      </div>
    </div>
  </section>
);

export default DeepsGuard360Spotlight;
