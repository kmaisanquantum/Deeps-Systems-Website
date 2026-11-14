import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowRight, BarChart3, Building2, Check, Clock3,
  FileText, Leaf, MapPin, Package, Route, Sprout, Thermometer, TrendingUp, Users, WalletCards,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: 'Farmer & Plot Registry', description: 'Maintain a verified register of farmers and their plots, with village, crop, and area details.', icon: Users },
  { title: 'Batch/Lot Tracking', description: 'Follow every harvest lot from intake to processing with consistent, scannable batch codes.', icon: Package },
  { title: 'Chain of Custody', description: 'Record each handover between farm, collection point, processor, and logistics.', icon: Route },
  { title: 'Cold Storage Telemetry', description: 'Monitor storage conditions so temperature-sensitive produce keeps its quality.', icon: Thermometer },
  { title: 'Buyer Portal', description: 'Give buyers a restricted view of the batches and compliance records relevant to them.', icon: Building2 },
  { title: 'Export Reports', description: 'Generate export-ready records that document origin, handling, and quality.', icon: FileText },
  { title: 'Yield Forecasting', description: 'Turn plot and harvest data into forward-looking yield estimates for planning.', icon: TrendingUp },
  { title: 'SaaS Subscriptions', description: 'Choose a plan that fits your farmer count and scale it as your cooperative grows.', icon: WalletCards },
];

const plans = [
  { name: 'Starter', capacity: 'Up to 100 farmers', description: 'A practical starting point for smallholder groups and single-origin cooperatives.' },
  { name: 'Growth', capacity: 'Up to 500 farmers', description: 'More room for growing cooperatives adding collection points and buyers.' },
  { name: 'Professional', capacity: 'Up to 2,000 farmers', description: 'Built for established cooperatives managing multiple crops and export channels.' },
  { name: 'Enterprise', capacity: 'Custom capacity', description: 'A tailored fit for large or multi-region operations with dedicated support.' },
];

const howItWorks = [
  { title: 'Platform owner master admin', detail: 'A central master dashboard for platform-level administration, plans, and oversight.', icon: BarChart3 },
  { title: 'Isolated cooperative workspaces', detail: 'Each cooperative operates within its own dedicated workspace and data boundary.', icon: Sprout },
  { title: 'Buyer portal with restricted access', detail: 'Buyers see only the permitted batches, certificates, and records shared with them.', icon: Users },
  { title: 'Farmer field app', detail: 'Mobile access helps field officers register farmers and capture harvests on the spot.', icon: MapPin },
];

const chainSteps = [
  { label: 'Farm gate', detail: 'Farmer and plot captured', icon: Sprout },
  { label: 'Intake & batch', detail: 'Lot code assigned', icon: Package },
  { label: 'Cold chain', detail: 'Storage monitored', icon: Thermometer },
  { label: 'Export', detail: 'Buyer-ready records', icon: FileText },
];

const AgriTracePage: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="AgriTrace | Agriculture Traceability-as-a-Service for PNG" description="AgriTrace is a traceability-as-a-service platform for PNG agriculture - track farmers, plots, batches, cold chain, and export records from farm gate to export market." canonicalUrl="https://dspng.tech/agritrace" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300"><Leaf className="h-4 w-4" /> Traceability-as-a-Service</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">AgriTrace<span className="mt-3 block text-2xl font-bold leading-snug text-emerald-600 dark:text-emerald-300 md:text-3xl">Traceability-as-a-Service for PNG agriculture — farm gate to export market.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">One record from farmer to buyer.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">A connected platform for registering farmers and plots, tracking harvest batches, monitoring the cold chain, and producing export-ready reports—designed for cooperatives and producers in Papua New Guinea and the Pacific.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-500 hover:to-green-600">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/agritrace/demo" className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 px-6 py-3.5 font-bold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-white/5">Explore interactive demo <ArrowRight className="h-4 w-4 text-emerald-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Traceability chain</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300"><Activity className="h-3 w-3" /> Farm gate → export</span>
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
            <span className="text-xs font-semibold text-emerald-100">Every batch, one verifiable record</span>
            <Link to="/agritrace/demo" className="text-xs font-bold text-emerald-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '100%', label: 'Farm-to-market traceability' },
              { value: 'Live', label: 'Harvest & batch records' },
              { value: 'QR', label: 'Scannable provenance' },
              { value: 'Export', label: 'Audit-ready reports' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-950 px-6 py-8">
                <p className="font-montserrat text-3xl font-extrabold text-emerald-300">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
            <span className="text-xs text-slate-400">AgriTrace · Platform at a glance</span>
            <Link to="/agritrace/demo" className="text-xs font-bold text-emerald-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">One connected toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your traceability operation needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring farmers, harvests, cold-chain monitoring, and buyer reporting together in one platform.</p>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Designed for multiple cooperatives</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How it works</h2>
          <p className="text-gray-600 dark:text-slate-400">A multi-tenant model gives each cooperative its own workspace while keeping platform administration and buyer access clearly separated.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {howItWorks.map(({ title, detail, icon: Icon }, index) => (
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
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Flexible SaaS subscriptions</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Plans that scale with your farmers</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Choose a starting capacity and talk with our team about the right setup for your cooperative.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map(plan => (
            <article key={plan.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><Clock3 className="h-5 w-5" /></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mb-4 mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-300">{plan.capacity}</p>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{plan.description}</p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-emerald-600" /> Contact us for plan details</div>
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
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300"><Leaf className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">Traceability that connects PNG producers to global markets.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-500">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/agritrace/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Launch demo <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default AgriTracePage;
