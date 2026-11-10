import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowRight, BarChart3, Building2, Check, ClipboardList, Clock3,
  Database, FileText, History, Lock, Scale, Settings, ShieldCheck, Users, WalletCards,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: 'Regulatory Compliance Automation', description: 'Turn recurring regulatory requirements into tracked, assigned, and automated obligations.', icon: Settings },
  { title: 'Audit-Ready Reporting', description: 'Produce consistent, evidence-backed reports whenever a regulator or auditor asks.', icon: FileText },
  { title: 'Data Governance Frameworks', description: 'Define the frameworks you follow and organise data handling around them.', icon: Database },
  { title: 'Risk Monitoring', description: 'Score risks by likelihood and impact so attention goes to what matters most.', icon: AlertTriangle },
  { title: 'Obligations Register', description: 'Keep every obligation, its owner, and its due date in one shared register.', icon: ClipboardList },
  { title: 'Controls & Policies', description: 'Map the controls and policies that satisfy each of your obligations.', icon: ShieldCheck },
  { title: 'Immutable Audit Trail', description: 'Maintain an append-only log of actions for clear, defensible accountability.', icon: History },
  { title: 'SaaS Subscriptions', description: 'Choose a plan that fits your frameworks and scale it as requirements grow.', icon: WalletCards },
];

const plans = [
  { name: 'Starter', capacity: 'Up to 3 compliance frameworks', description: 'A practical starting point for smaller organisations building their first register.' },
  { name: 'Growth', capacity: 'Up to 10 compliance frameworks', description: 'More room for organisations adding regulators, standards, and reporting duties.' },
  { name: 'Professional', capacity: 'Unlimited compliance frameworks', description: 'Built for established organisations managing wide governance obligations.' },
  { name: 'Enterprise', capacity: 'Custom governance program', description: 'A tailored fit for large or multi-entity operations with dedicated support.' },
];

const howItWorks = [
  { title: 'Platform owner master admin', detail: 'A central master dashboard for platform-level administration, plans, and oversight.', icon: BarChart3 },
  { title: 'Isolated organisation workspaces', detail: 'Each organisation operates within its own dedicated workspace and data boundary.', icon: Building2 },
  { title: 'Regulator & auditor portal with restricted access', detail: 'Regulators and auditors see only the obligations, controls, and evidence shared with them.', icon: Users },
  { title: 'Evidence & document vault', detail: 'Keep certificates, policies, and evidence linked to the obligations they support.', icon: Lock },
];

const chainSteps = [
  { label: 'Assess', detail: 'Framework selected', icon: Scale },
  { label: 'Obligations', detail: 'Requirements registered', icon: ClipboardList },
  { label: 'Controls & policies', detail: 'Mapped to obligations', icon: ShieldCheck },
  { label: 'Audit-ready', detail: 'Evidence and reporting', icon: FileText },
];

const DeepsComply360Page: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="DeepsComply360 | Digital Compliance & Governance Platform for PNG & the Pacific" description="DeepsComply360 is a digital compliance and governance platform for PNG and the Pacific - automate regulatory obligations, map controls and policies, monitor risk, and stay audit-ready for financial reporting, data protection, and industry standards." canonicalUrl="https://dspng.tech/deepscomply360" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300"><ShieldCheck className="h-4 w-4" /> Digital Compliance & Governance</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">DeepsComply360<span className="mt-3 block text-2xl font-bold leading-snug text-blue-600 dark:text-blue-300 md:text-3xl">Digital compliance and governance for PNG and the Pacific.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">Compliance you can prove, every day.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">A connected platform for tracking regulatory obligations, mapping controls and policies, monitoring risk, and producing audit-ready reports—built for organisations facing growing requirements in financial reporting, data protection, and industry standards across Papua New Guinea and the Pacific.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-500 hover:to-indigo-600">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/deepscomply360/demo" className="inline-flex items-center gap-2 rounded-full border border-blue-600/30 px-6 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-white/5">Explore interactive demo <ArrowRight className="h-4 w-4 text-blue-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-blue-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Compliance lifecycle</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-bold text-blue-300"><ShieldCheck className="h-3 w-3" /> Assess → audit-ready</span>
          </div>
          <div className="space-y-3">
            {chainSteps.map(({ label, detail, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">0{index + 1}</p>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-xs text-slate-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-500/10 px-4 py-3">
            <span className="text-xs font-semibold text-blue-100">Every obligation, one defensible record</span>
            <Link to="/deepscomply360/demo" className="text-xs font-bold text-blue-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-blue-950/20 dark:border-white/10">
          <div className="aspect-video bg-black">
            <video className="h-full w-full object-cover" controls playsInline preload="metadata" poster="/images/deepscomply360-poster.svg" aria-label="DeepsComply360 product demo video">
              <source src="/videos/deepscomply360-promo-30s.mp4" type="video/mp4" />
              <track kind="captions" src="/videos/deepscomply360-promo-30s.vtt" srcLang="en" label="English" default />
              Your browser does not support HTML5 video. The demo video is not available yet; use the interactive demo link instead.
            </video>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
            <span className="text-xs text-slate-400">DeepsComply360 · Product walkthrough</span>
            <Link to="/deepscomply360/demo" className="text-xs font-bold text-blue-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">One connected toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your compliance operation needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring obligations, controls, risk, and audit evidence together in one governed platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="group rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-950/5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:text-blue-300"><Icon className="h-5 w-5" /></div>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">Designed for multiple organisations</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How it works</h2>
          <p className="text-gray-600 dark:text-slate-400">A multi-tenant model gives each organisation its own workspace while keeping platform administration and regulator access clearly separated.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {howItWorks.map(({ title, detail, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300"><Icon className="h-5 w-5" /></div>
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-300">0{index + 1}</span>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300">Flexible SaaS subscriptions</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Plans that scale with your frameworks</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Choose a starting capacity and talk with our team about the right setup for your governance obligations.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map(plan => (
            <article key={plan.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300"><Clock3 className="h-5 w-5" /></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mb-4 mt-2 text-sm font-bold text-blue-600 dark:text-blue-300">{plan.capacity}</p>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{plan.description}</p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-blue-600" /> Contact us for plan details</div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20">Contact Sales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <section className="px-5 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300"><ShieldCheck className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">Compliance that PNG and Pacific organisations can prove.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-500">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/deepscomply360/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Launch demo <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DeepsComply360Page;
