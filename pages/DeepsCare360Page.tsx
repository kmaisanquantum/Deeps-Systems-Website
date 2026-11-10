import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, Building2, CalendarClock, Check, CheckCircle2,
  ClipboardList, FileText, Gauge, Headset, Server, Smartphone, Stethoscope, TrendingUp,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: '24/7 Proactive Monitoring', description: 'Keep watch over servers, workstations, and network gear around the clock so problems surface early.', icon: Activity },
  { title: 'Rapid-Response Incident Management', description: 'Raise, assign, prioritise, and resolve incidents with a clear, shared record for every issue.', icon: AlertTriangle },
  { title: 'Uptime Optimization', description: 'Track device availability and act before small faults grow into full outages.', icon: TrendingUp },
  { title: 'Infrastructure Health Audits', description: 'Review the health of your servers, network, and endpoints with regular structured checks.', icon: Stethoscope },
  { title: 'SLA Tracking', description: 'Measure response and resolution performance against the service levels you agree with clients.', icon: Gauge },
  { title: 'Client Reporting', description: 'Give each client a clear view of incidents, uptime, and the work delivered on their behalf.', icon: FileText },
  { title: 'Device & Asset Management', description: 'Maintain an organised register of every device, its site, and its current status.', icon: Server },
  { title: 'Maintenance Scheduling', description: 'Plan routine maintenance so equipment stays healthy and outages are avoided.', icon: CalendarClock },
];

const plans = [
  { name: 'Starter', capacity: 'Up to 50 devices', description: 'A practical starting point for small teams and single-site businesses.' },
  { name: 'Growth', capacity: 'Up to 150 devices', description: 'More room for growing businesses adding sites and endpoints.' },
  { name: 'Professional', capacity: 'Up to 400 devices', description: 'Built for established operations with larger, multi-site fleets.' },
  { name: 'Enterprise', capacity: 'Custom capacity', description: 'A tailored fit for large or multi-site organisations with dedicated support.' },
];

const howItWorks = [
  { title: 'Platform owner master admin', detail: 'A central master dashboard for platform-level administration, plans, and oversight.', icon: BarChart3 },
  { title: 'Isolated client workspaces', detail: 'Each client operates within its own dedicated workspace and data boundary.', icon: Building2 },
  { title: 'Client portal with restricted access', detail: 'Clients see only the devices, tickets, and reports shared with them.', icon: ClipboardList },
  { title: 'Engineer mobile access', detail: 'Mobile access helps engineers triage and update tickets while they are on the move.', icon: Smartphone },
];

const lifecycleSteps = [
  { label: 'Monitor', detail: 'Every device, watched 24/7', icon: Activity },
  { label: 'Detect', detail: 'Alerts raised instantly', icon: AlertTriangle },
  { label: 'Respond', detail: 'Tickets triaged by priority', icon: Headset },
  { label: 'Resolve', detail: 'Fixed and reported', icon: CheckCircle2 },
];

const DeepsCare360Page: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="DeepsCare360 | Managed IT Support Platform for PNG & the Pacific" description="DeepsCare360 is a managed IT support platform for PNG and the Pacific - monitor devices, manage incidents, track SLAs, and report to clients from one connected workspace." canonicalUrl="https://dspng.tech/deepscare360" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-300"><Headset className="h-4 w-4" /> Managed IT Support</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">DeepsCare360<span className="mt-3 block text-2xl font-bold leading-snug text-teal-600 dark:text-teal-300 md:text-3xl">Managed IT Support Platform for PNG and the Pacific.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">Your digital backbone, managed.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">A connected platform for monitoring devices, managing incidents, tracking service levels, and reporting to clients—designed for businesses in Papua New Guinea and across the Pacific.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-teal-500/20 transition hover:from-teal-500 hover:to-cyan-600">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/deepscare360/demo" className="inline-flex items-center gap-2 rounded-full border border-teal-600/30 px-6 py-3.5 font-bold text-teal-700 transition hover:bg-teal-50 dark:text-teal-300 dark:hover:bg-white/5">Explore interactive demo <ArrowRight className="h-4 w-4 text-teal-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-teal-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Support lifecycle</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-500/15 px-2.5 py-1 text-[10px] font-bold text-teal-300"><Activity className="h-3 w-3" /> Monitor → resolve</span>
          </div>
          <div className="space-y-3">
            {lifecycleSteps.map(({ label, detail, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-teal-300">0{index + 1}</p>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-xs text-slate-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-teal-500/10 px-4 py-3">
            <span className="text-xs font-semibold text-teal-100">Every device, one support record</span>
            <Link to="/deepscare360/demo" className="text-xs font-bold text-teal-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-teal-950/20 dark:border-white/10">
          <div className="aspect-video bg-black">
            <video className="h-full w-full object-cover" controls playsInline preload="metadata" aria-label="DeepsCare360 product demo video">
              <source src="/videos/deepscare360-promo-30s.mp4" type="video/mp4" />
              <track kind="captions" src="/videos/deepscare360-promo-30s.vtt" srcLang="en" label="English" default />
              Your browser does not support HTML5 video. The demo video is not available yet; use the interactive demo link instead.
            </video>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
            <span className="text-xs text-slate-400">DeepsCare360 · Product walkthrough</span>
            <Link to="/deepscare360/demo" className="text-xs font-bold text-teal-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">One connected toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your IT support operation needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring devices, incidents, service levels, and client reporting together in one platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="group rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-950/5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 inline-flex rounded-xl bg-teal-500/10 p-3 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white dark:text-teal-300"><Icon className="h-5 w-5" /></div>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">Designed for multiple clients</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How it works</h2>
          <p className="text-gray-600 dark:text-slate-400">A multi-tenant model gives each client its own workspace while keeping platform administration and client access clearly separated.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {howItWorks.map(({ title, detail, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300"><Icon className="h-5 w-5" /></div>
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-300">0{index + 1}</span>
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">Flexible SaaS subscriptions</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Plans that scale with your devices</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Choose a starting capacity and talk with our team about the right setup for your fleet.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map(plan => (
            <article key={plan.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300"><Server className="h-5 w-5" /></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mb-4 mt-2 text-sm font-bold text-teal-600 dark:text-teal-300">{plan.capacity}</p>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{plan.description}</p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-teal-600" /> Contact us for plan details</div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-teal-500/20">Contact Sales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <section className="px-5 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300"><Headset className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">Your digital backbone, managed — so you can focus on the business.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 font-bold text-white transition hover:bg-teal-500">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/deepscare360/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Launch demo <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DeepsCare360Page;
