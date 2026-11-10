import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowRight, BarChart3, Building2, Check, Clock3,
  Cloud, FileSearch, MapPin, Route, Search, Settings, ShieldCheck, TrendingUp, Users,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: 'Strategic Technology Planning', description: 'Turn business goals into a clear, sequenced technology plan your team can actually deliver.', icon: BarChart3 },
  { title: 'Tailored Digital Roadmaps', description: 'Get a phased 3-horizon roadmap — foundation, modernisation, and growth — built around your current systems.', icon: Route },
  { title: 'Local Growth Alignment', description: 'Plans that reflect PNG and Pacific realities: connectivity, cost, skills, and supply chains.', icon: TrendingUp },
  { title: 'Architecture Modernization Consulting', description: 'Modernise legacy systems and integrate the tools you already rely on, without starting over.', icon: Settings },
  { title: 'Cloud & Infrastructure Advisory', description: 'Choose the right mix of cloud, on-premise, and hybrid infrastructure for your workloads.', icon: Cloud },
  { title: 'Vendor & Solution Selection', description: 'Evaluate vendors with independent, structured criteria instead of a product catalogue.', icon: Search },
  { title: 'Digital Skills & Capability', description: 'Uplift your team with training and change enablement that makes the roadmap stick.', icon: Users },
  { title: 'Governance & Risk Alignment', description: 'Align technology decisions with governance, risk, and compliance expectations.', icon: ShieldCheck },
];

const chainSteps = [
  { label: 'Assess', detail: 'Maturity and systems reviewed', icon: Search },
  { label: 'Roadmap', detail: '3-horizon plan built', icon: Route },
  { label: 'Modernize', detail: 'Architecture upgraded', icon: Settings },
  { label: 'Grow', detail: 'Capability and scale', icon: TrendingUp },
];

const howWeWork = [
  { title: 'Independent, vendor-neutral advice', detail: 'Recommendations based on your goals and constraints, not a product catalogue.', icon: ShieldCheck },
  { title: 'Delivered with your team', detail: 'Workshops and reviews that leave your people with the plan and the skills to run it.', icon: Users },
  { title: 'Grounded in local context', detail: 'Options that respect PNG connectivity, budgets, and the skills you actually have.', icon: MapPin },
  { title: 'A workspace per organisation', detail: 'Each organisation keeps its own assessments, roadmap, and engagement history.', icon: Building2 },
];

const positioning = [
  { title: 'Reaching rural and remote operations', detail: 'Roadmaps that plan for limited connectivity and dispersed sites, not just city offices.' },
  { title: 'Realistic budgets in Kina', detail: 'Sequenced investments that match local funding cycles and deliver value early.' },
  { title: 'Skills you can build here', detail: 'Capability plans that grow local talent rather than depend on outside contractors.' },
  { title: 'Standards that travel', detail: 'Align to recognised frameworks while keeping plans practical for Pacific conditions.' },
];

const engagements = [
  { name: 'Advisory Sprint', cadence: '2–4 week engagement', description: 'A focused maturity assessment and 3-horizon roadmap for a single organisation.' },
  { name: 'Architecture Review', cadence: 'Scoped review', description: 'An independent review of your current systems, integrations, and risks.' },
  { name: 'Advisory Retainer', cadence: 'Ongoing, monthly', description: 'Continuous guidance as your roadmap moves from plan into delivery.' },
  { name: 'Enterprise Program', cadence: 'Custom program', description: 'A tailored advisory program across teams, sites, and regions.' },
];

const DeepsAdvisory360Page: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="DeepsAdvisory360 | Strategic ICT Advisory & Digital Roadmap Platform for PNG" description="DeepsAdvisory360 is a strategic ICT advisory and digital roadmap platform for PNG and the Pacific - assess maturity, build tailored digital roadmaps, align local growth, and modernise architecture." canonicalUrl="https://dspng.tech/deepsadvisory360" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300"><FileSearch className="h-4 w-4" /> Strategic ICT Advisory</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">DeepsAdvisory360<span className="mt-3 block text-2xl font-bold leading-snug text-emerald-600 dark:text-emerald-300 md:text-3xl">Strategic ICT advisory and digital roadmaps for PNG and the Pacific.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">Your digital strategy, aligned with PNG&apos;s opportunities.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">Independent advisory that turns business goals into a clear technology roadmap—covering strategic planning, tailored 3-horizon roadmaps, architecture modernisation, and local growth alignment for organisations in Papua New Guinea and the Pacific.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-500 hover:to-green-600">Book a session <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/deepsadvisory360/demo" className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 px-6 py-3.5 font-bold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-white/5">Explore interactive demo <ArrowRight className="h-4 w-4 text-emerald-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Advisory roadmap</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300"><Activity className="h-3 w-3" /> Assess → grow</span>
          </div>
          <div className="space-y-3">
            {chainSteps.map(({ label, detail, icon: Icon }, index) => (
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
            <span className="text-xs font-semibold text-emerald-100">A plan you can act on</span>
            <Link to="/deepsadvisory360/demo" className="text-xs font-bold text-emerald-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="aspect-video bg-black">
            <video className="h-full w-full object-cover" controls playsInline preload="metadata" poster="/images/deepsadvisory360-poster.svg" aria-label="DeepsAdvisory360 product demo video">
              <source src="/videos/deepsadvisory360-promo-30s.mp4" type="video/mp4" />
              <track kind="captions" src="/videos/deepsadvisory360-promo-30s.vtt" srcLang="en" label="English" default />
              Your browser does not support HTML5 video. The demo video is not available yet; use the interactive demo link instead.
            </video>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
            <span className="text-xs text-slate-400">DeepsAdvisory360 · Product walkthrough</span>
            <Link to="/deepsadvisory360/demo" className="text-xs font-bold text-emerald-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">One connected advisory toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your digital strategy needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring assessment, planning, architecture, and skills together so strategy becomes a roadmap you can deliver.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">How we work</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Advisory that stays independent</h2>
          <p className="text-gray-600 dark:text-slate-400">We work alongside your team, keep our advice vendor-neutral, and keep every organisation&apos;s assessment and roadmap in its own workspace.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {howWeWork.map(({ title, detail, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><Icon className="h-5 w-5" /></div>
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">0{index + 1}</span>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50/70 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Built for PNG and the Pacific</p>
            <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Strategy that fits where you operate</h2>
            <p className="leading-relaxed text-gray-600 dark:text-slate-400">Imported advisory models assume reliable power, cheap bandwidth, and deep technical teams. Ours start from what PNG and Pacific organisations actually face—and build up from there.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {positioning.map(({ title, detail }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-white/10 dark:bg-[#0a0a0a]">
                <div className="mb-3 inline-flex rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-300"><MapPin className="h-4 w-4" /></div>
                <h3 className="mb-1.5 font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Ways to engage</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Start where you are</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Pick the engagement that matches your stage, and talk with our team about scoping it.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {engagements.map(engagement => (
            <article key={engagement.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><Clock3 className="h-5 w-5" /></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{engagement.name}</h3>
              <p className="mb-4 mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-300">{engagement.cadence}</p>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{engagement.description}</p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-emerald-600" /> Contact us to scope</div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20">Contact Sales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <section className="px-5 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300"><FileSearch className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">A digital strategy aligned with PNG&apos;s opportunities.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-500">Book an advisory session <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/deepsadvisory360/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Launch demo <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DeepsAdvisory360Page;
