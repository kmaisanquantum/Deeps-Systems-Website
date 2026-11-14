import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headset, HeartPulse, Landmark, Shield, ShieldCheck, Sprout, Truck, Workflow, Zap } from 'lucide-react';

const platforms = [
  {
    name: 'DeepsGuard360',
    description: 'Security operations for guard firms.',
    icon: Shield,
    href: '/deepsguard360',
    demo: '/deepsguard360/demo',
    pills: ['Guard management', 'GPS patrol tracking', 'Client portal'],
  },
  {
    name: 'AgriTrace',
    description: 'Agriculture traceability for exporters.',
    icon: Sprout,
    href: '/agritrace',
    demo: '/agritrace/demo',
    pills: ['Farm & plot registry', 'Batch traceability', 'Buyer portal'],
  },
  {
    name: 'DeepsFlow',
    description: 'Cloud and workflow automation.',
    icon: Workflow,
    href: '/deepsflow',
    demo: '/deepsflow/demo',
    pills: ['Workflow automation', 'Integrations', 'Approvals'],
  },
  {
    name: 'DeepsCare360',
    description: 'Managed IT support and uptime.',
    icon: Headset,
    href: '/deepscare360',
    demo: '/deepscare360/demo',
    pills: ['24/7 monitoring', 'Incident response', 'Device management'],
  },
  {
    name: 'DeepsFleet360',
    description: 'Fleet, fuel and logistics.',
    icon: Truck,
    href: '/deepsfleet360',
    demo: '/deepsfleet360/demo',
    pills: ['Fleet tracking', 'Fuel management', 'Route dispatch'],
  },
  {
    name: 'DeepsComply360',
    description: 'Digital compliance and audit.',
    icon: ShieldCheck,
    href: '/deepscomply360',
    demo: '/deepscomply360/demo',
    pills: ['Obligations', 'Controls & policy', 'Audit trail'],
  },
  {
    name: 'DeepsFin360',
    description: 'Financial services and microfinance.',
    icon: Landmark,
    href: '/deepsfin360',
    demo: '/deepsfin360/demo',
    pills: ['Accounts & KYC', 'Transactions', 'Fraud alerts'],
  },
];

const DeepsGuard360Spotlight: React.FC = () => (
  <section className="relative isolate overflow-hidden border-y border-sky-500/20 bg-gray-950 px-5 py-16 text-white md:px-6 md:py-24">
    <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
    <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
    <div className="relative mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-sky-300"><Shield className="h-3.5 w-3.5" /> Deeps Systems platforms</div>
        <h2 className="font-montserrat text-3xl font-extrabold leading-tight md:text-5xl">One suite. <span className="text-sky-400">Every operation covered.</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">Purpose-built SaaS platforms for Papua New Guinea and the Pacific—each one connecting teams, field operations and customers in a single workspace.</p>
      </div>
      <Link to="/deepspulse" className="group mt-12 flex flex-col items-start gap-5 rounded-3xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/15 via-sky-500/10 to-emerald-500/5 p-6 transition hover:border-emerald-400/50 hover:from-emerald-500/20 md:flex-row md:items-center md:p-7">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300"><HeartPulse className="h-7 w-7" /></span>
        <div className="min-w-0 flex-1">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-300"><Zap className="h-3 w-3" /> Powers every platform</div>
          <h3 className="font-montserrat text-xl font-bold text-white md:text-2xl">Deeps Pulse</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">The shared engagement engine embedded across the Deeps ecosystem—gamification, recognition and rewards that make enterprise software people actually want to use.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-emerald-500">Explore Pulse <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </Link>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map(({ name, description, icon: Icon, href, demo, pills }) => (
          <article key={name} className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-sky-400/30 hover:bg-white/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300"><Icon className="h-6 w-6" /></span>
            <h3 className="mt-5 font-montserrat text-lg font-bold text-white">{name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">{pills.map(pill => <span key={pill} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200">{pill}</span>)}</div>
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
              <Link to={href} className="inline-flex items-center gap-1 text-sm font-bold text-sky-300 transition hover:text-sky-200">Explore <ArrowRight className="h-4 w-4" /></Link>
              <Link to={demo} className="ml-auto inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-slate-200 transition hover:bg-white/10">Try demo</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default DeepsGuard360Spotlight;
