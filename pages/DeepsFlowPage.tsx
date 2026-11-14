import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowRight, BarChart3, Building2, Check, Clock3,
  Cloud, Cpu, Smartphone, TrendingUp, Workflow, Zap,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: 'Streamlined Workflow Automation', description: 'Automate repetitive steps so routine work runs itself, with approvals and hand-offs that no longer need chasing.', icon: Workflow },
  { title: 'Operational Cost Optimization', description: 'See where time and money go, then place automation where it saves the most—with clear before-and-after figures.', icon: TrendingUp },
  { title: 'Cloud-Native Transformation', description: 'Run processes on cloud-native services that scale on demand, with no legacy hardware to maintain.', icon: Cloud },
  { title: 'Intelligent Process Integration', description: 'Connect the systems you already use so data flows between them without manual re-entry.', icon: Cpu },
];

const plans = [
  { name: 'Starter', capacity: 'Up to 5 active workflows', description: 'A practical starting point for small teams automating their first processes.' },
  { name: 'Growth', capacity: 'Up to 25 active workflows', description: 'More room for growing teams adding integrations and approvals.' },
  { name: 'Professional', capacity: 'Up to 100 active workflows', description: 'Built for established operations running automation across departments.' },
  { name: 'Enterprise', capacity: 'Custom capacity', description: 'A tailored fit for large or multi-region operations with dedicated support.' },
];

const howItWorks = [
  { title: 'Platform owner master admin', detail: 'A central master dashboard for platform-level administration, plans, and oversight.', icon: BarChart3 },
  { title: 'Isolated company workspaces', detail: 'Each company operates within its own dedicated workspace and data boundary.', icon: Building2 },
  { title: 'Integration hub with scoped access', detail: 'Connectors run with least-privilege access to the systems each workspace has approved.', icon: Cpu },
  { title: 'Automation mobile app', detail: 'Monitor runs and approve tasks from your phone while you are on the move.', icon: Smartphone },
];

const pipelineSteps = [
  { label: 'Trigger', detail: 'Event or schedule fires', icon: Zap },
  { label: 'Automate', detail: 'Steps run in sequence', icon: Workflow },
  { label: 'Integrate', detail: 'Connected systems sync', icon: Cpu },
  { label: 'Report', detail: 'Hours and savings tracked', icon: BarChart3 },
];

const DeepsFlowPage: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="DeepsFlow | Cloud & Automation Platform for PNG & the Pacific" description="DeepsFlow is a cloud and automation platform for PNG and the Pacific - design workflows, connect the systems you use, and track the hours and costs you save." canonicalUrl="https://dspng.tech/deepsflow" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300"><Cloud className="h-4 w-4" /> Cloud & Automation Platform</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">DeepsFlow<span className="mt-3 block text-2xl font-bold leading-snug text-indigo-600 dark:text-indigo-300 md:text-3xl">Cloud &amp; Automation Platform for PNG and the Pacific.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">Automate the work that slows you down.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">A cloud-native platform for designing workflows, connecting the systems you already use, tracking automation runs, and measuring the hours and costs you save—built for organisations in Papua New Guinea and across the Pacific.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-violet-600">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/deepsflow/demo" className="inline-flex items-center gap-2 rounded-full border border-indigo-600/30 px-6 py-3.5 font-bold text-indigo-700 transition hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-white/5">Explore interactive demo <ArrowRight className="h-4 w-4 text-indigo-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-indigo-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Automation pipeline</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2.5 py-1 text-[10px] font-bold text-indigo-300"><Activity className="h-3 w-3" /> Trigger → report</span>
          </div>
          <div className="space-y-3">
            {pipelineSteps.map(({ label, detail, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">0{index + 1}</p>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-xs text-slate-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-500/10 px-4 py-3">
            <span className="text-xs font-semibold text-indigo-100">Every workflow, one measurable result</span>
            <Link to="/deepsflow/demo" className="text-xs font-bold text-indigo-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-indigo-950/20 dark:border-white/10">
          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: 'Automated', label: 'Reusable workflows' },
              { value: 'Live', label: 'Run & trigger monitoring' },
              { value: 'Measured', label: 'Every workflow result' },
              { value: 'Export', label: 'Operational reporting' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-950 px-6 py-8">
                <p className="font-montserrat text-3xl font-extrabold text-indigo-300">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
            <span className="text-xs text-slate-400">DeepsFlow · Platform at a glance</span>
            <Link to="/deepsflow/demo" className="text-xs font-bold text-indigo-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">One connected toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your automation programme needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring workflows, integrations, approvals, and reporting together in one cloud-native platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="group rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-950/5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:text-indigo-300"><Icon className="h-5 w-5" /></div>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">Designed for multiple companies</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How it works</h2>
          <p className="text-gray-600 dark:text-slate-400">A multi-tenant model gives each company its own workspace while keeping platform administration and integration access clearly separated.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {howItWorks.map(({ title, detail, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"><Icon className="h-5 w-5" /></div>
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">0{index + 1}</span>
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">Flexible SaaS subscriptions</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Plans that scale with your workflows</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Choose a starting capacity and talk with our team about the right setup for your operations.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map(plan => (
            <article key={plan.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"><Clock3 className="h-5 w-5" /></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mb-4 mt-2 text-sm font-bold text-indigo-600 dark:text-indigo-300">{plan.capacity}</p>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{plan.description}</p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-indigo-600" /> Contact us for plan details</div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/20">Contact Sales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <section className="px-5 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300"><Cloud className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">Automation that pays for itself, one workflow at a time.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 font-bold text-white transition hover:bg-indigo-500">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/deepsflow/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Launch demo <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DeepsFlowPage;
