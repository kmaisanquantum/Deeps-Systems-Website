import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowRight, Award, BarChart3, Bell, Check, Gift, Headset, HeartPulse,
  Landmark, Lock, RefreshCw, ScrollText, Shield, ShieldCheck, SlidersHorizontal,
  Sprout, Trophy, Truck, WalletCards, Workflow, Zap,
} from 'lucide-react';
import Seo from '../components/Seo';

const engines = [
  { title: 'Gamification Engine', description: 'Points, levels, badges and challenges that turn routine tasks into measurable progress.', icon: Trophy },
  { title: 'Recognition Engine', description: 'Achievement profiles and leaderboards with Bronze, Silver, Gold and Platinum tiers.', icon: Award },
  { title: 'Engagement Engine', description: 'Real-time notifications, progress indicators and goal tracking that keep teams moving.', icon: Bell },
  { title: 'Rewards & Loyalty Engine', description: 'Reward catalogues, a points wallet and redemption that make effort tangible.', icon: Gift },
  { title: 'Analytics Engine', description: 'Engagement analytics, participation trends and retention indicators in one view.', icon: BarChart3 },
];

const platforms = [
  { name: 'DeepsGuard360', detail: 'Guard recognition and patrol milestones.', icon: Shield, href: '/deepsguard360' },
  { name: 'AgriTrace', detail: 'Farmer achievements and harvest milestones.', icon: Sprout, href: '/agritrace' },
  { name: 'DeepsFlow', detail: 'Workflow completion and automation streaks.', icon: Workflow, href: '/deepsflow' },
  { name: 'DeepsCare360', detail: 'Technician achievements and resolution milestones.', icon: Headset, href: '/deepscare360' },
  { name: 'DeepsFleet360', detail: 'Driver safety and fuel-efficiency recognition.', icon: Truck, href: '/deepsfleet360' },
  { name: 'DeepsComply360', detail: 'Audit-readiness progress and compliance streaks.', icon: ShieldCheck, href: '/deepscomply360' },
  { name: 'DeepsFin360', detail: 'Savings milestones and responsible repayment.', icon: Landmark, href: '/deepsfin360' },
];

const responsible = [
  { title: 'Transparent rules', detail: 'Scoring, tiers and thresholds are published and visible to every participant.', icon: ScrollText },
  { title: 'No gambling mechanics', detail: 'No loot boxes, no chance-based rewards and no pay-to-win loops.', icon: Lock },
  { title: 'No manipulative loops', detail: 'Designed to inform and motivate — never to pressure, guilt or distract.', icon: RefreshCw },
  { title: 'Configurable notifications', detail: 'Administrators control frequency, channels and quiet hours for each tenant.', icon: SlidersHorizontal },
  { title: 'Full audit trails', detail: 'Every award, adjustment and redemption is recorded for review.', icon: ShieldCheck },
];

const commercial = [
  { name: 'Core subscription', icon: Zap, detail: 'Deeps Pulse is included with every Deeps platform — engagement is part of the product, not an add-on.' },
  { name: 'Premium engagement modules', icon: Award, detail: 'Optional advanced modules for deeper gamification, richer analytics and custom challenge design.' },
  { name: 'Branded loyalty programmes', icon: WalletCards, detail: 'Run your own branded reward and loyalty programme on top of Pulse, with your catalogue and points currency.' },
  { name: 'Tenant-level feature controls', icon: SlidersHorizontal, detail: 'Enable, limit or disable each engine per tenant so every organisation governs its own experience.' },
];

const engineSteps = [
  { label: 'Capture', detail: 'Actions logged in the platform', icon: Activity },
  { label: 'Score', detail: 'Points, levels and badges', icon: Trophy },
  { label: 'Recognise', detail: 'Leaderboards and tiers', icon: Award },
  { label: 'Reward', detail: 'Wallet and redemption', icon: Gift },
];

const DeepsPulsePage: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="Deeps Pulse | The engagement engine inside every Deeps platform" description="Deeps Pulse is the shared engagement engine embedded across the Deeps ecosystem - gamification, recognition and rewards that make enterprise software people actually want to use." canonicalUrl="https://dspng.tech/deepspulse" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300"><HeartPulse className="h-4 w-4" /> Engagement Engine</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">Deeps Pulse<span className="mt-3 block text-2xl font-bold leading-snug text-emerald-600 dark:text-emerald-300 md:text-3xl">The engagement engine inside every Deeps platform.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">Gamification, recognition and rewards that make enterprise software people actually want to use.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">Pulse is not a standalone app you log into separately. It is a shared engine embedded across the Deeps ecosystem — one scoring and rewards layer that every platform plugs into, so effort in the field becomes visible progress on the screen.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/deepspulse/demo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-500 hover:to-green-600">See it in action <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 px-6 py-3.5 font-bold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-white/5">Talk to our team <ArrowRight className="h-4 w-4 text-emerald-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">One engine, every platform</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300"><Activity className="h-3 w-3" /> Embedded · not standalone</span>
          </div>
          <div className="space-y-3">
            {engineSteps.map(({ label, detail, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">0{index + 1}</p>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-xs text-slate-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-500/10 px-4 py-3">
            <span className="text-xs font-semibold text-emerald-100">The same engine across seven platforms</span>
            <Link to="/deepspulse/demo" className="text-xs font-bold text-emerald-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">The five engines</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Five engines, one shared layer</h2>
          <p className="text-gray-600 dark:text-slate-400">Each engine can run on its own or together, so a platform can start with simple recognition and grow into full gamification and rewards.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {engines.map(({ title, description, icon: Icon }) => (
            <article key={title} className="group rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white dark:text-emerald-300"><Icon className="h-5 w-5" /></div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">One engine, every platform</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How Pulse applies across the ecosystem</h2>
          <p className="text-gray-600 dark:text-slate-400">The same five engines, tuned to each product&apos;s work. Recognise guards, reward farmers, celebrate drivers — all on one consistent scoring model.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map(({ name, detail, icon: Icon, href }) => (
            <Link key={name} to={href} className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><Icon className="h-5 w-5" /></div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
              <p className="flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{detail}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-300">Explore platform <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Responsible engagement</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Motivation without the dark patterns</h2>
          <p className="text-gray-600 dark:text-slate-400">Engagement should help people do good work — not trap them in it. Pulse is built with clear rules and full transparency.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {responsible.map(({ title, detail, icon: Icon }) => (
            <article key={title} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><Icon className="h-5 w-5" /></div>
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Commercial model</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Included at the core, extensible when you need it</h2>
          <p className="text-gray-600 dark:text-slate-400">Pulse is part of the Deeps platforms. Extend it with premium modules, your own loyalty programme and per-tenant controls.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commercial.map(({ name, detail, icon: Icon }) => (
            <article key={name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><Icon className="h-5 w-5" /></div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
              <p className="mt-3 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{detail}</p>
              <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-emerald-600" /> Talk to us for details</div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/deepspulse/demo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20">See it in action <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 px-6 py-3.5 font-bold text-emerald-700 dark:text-emerald-300">Contact Sales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <section className="px-5 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300"><HeartPulse className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">The engagement layer that makes every Deeps platform stick.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/deepspulse/demo" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-500">See it in action <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Contact us <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DeepsPulsePage;
