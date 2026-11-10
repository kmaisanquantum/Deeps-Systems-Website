import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart3, Building2, Check, FileText, Fuel, MapPin, Route, Smartphone, Truck, Users, Wrench,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: 'Route Optimization', description: 'Plan the most efficient path between towns and depots to cut travel time and wear.', icon: Route },
  { title: 'Predictive Maintenance', description: 'Anticipate service needs from usage patterns before a breakdown stops your fleet.', icon: Wrench },
  { title: 'Fuel Efficiency', description: 'Track consumption per trip and per vehicle to reduce one of your biggest running costs.', icon: Fuel },
  { title: 'Real-time Corridor Tracking', description: 'Follow vehicles along the Highlands Highway and other corridors as trips progress.', icon: MapPin },
  { title: 'Driver Management', description: 'Keep driver profiles, licences, assignments, and duty status in one place.', icon: Users },
  { title: 'Client Reporting', description: 'Give clients clear records of trips, delivery status, and the work carried out.', icon: FileText },
];

const plans = [
  { name: 'Starter', capacity: 'Up to 10 vehicles', description: 'A practical starting point for small fleets and single-depot operations.' },
  { name: 'Growth', capacity: 'Up to 30 vehicles', description: 'More room for growing fleets adding routes and drivers.' },
  { name: 'Professional', capacity: 'Up to 100 vehicles', description: 'Built for established operators running multi-corridor logistics.' },
  { name: 'Enterprise', capacity: 'Custom capacity', description: 'A tailored fit for large or multi-depot fleets with dedicated support.' },
];

const howItWorks = [
  { title: 'Platform owner master admin', detail: 'A central master dashboard for platform-level administration, plans, and oversight.', icon: BarChart3 },
  { title: 'Isolated company workspaces', detail: 'Each logistics company operates within its own dedicated workspace and data boundary.', icon: Building2 },
  { title: 'Client portal with restricted access', detail: 'Clients see only the trips, vehicles, and records shared with them.', icon: Users },
  { title: 'Driver mobile app', detail: 'Mobile access helps drivers receive trips and update progress while on the road.', icon: Smartphone },
];

const corridorSteps = [
  { label: 'Dispatch', detail: 'Trip planned and assigned', icon: Route },
  { label: 'On the road', detail: 'Live corridor tracking', icon: MapPin },
  { label: 'Maintain', detail: 'Predictive service alerts', icon: Wrench },
  { label: 'Report', detail: 'Client-ready records', icon: FileText },
];

const DeepsFleet360Page: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="DeepsFleet360 | Fleet & Logistics Management for PNG & the Pacific" description="DeepsFleet360 is a fleet and logistics management platform for PNG and the Pacific - optimise routes, plan predictive maintenance, track fuel, and follow vehicles along the Highlands Highway corridor." canonicalUrl="https://dspng.tech/deepsfleet360" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300"><Truck className="h-4 w-4" /> Fleet & Logistics</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">DeepsFleet360<span className="mt-3 block text-2xl font-bold leading-snug text-emerald-600 dark:text-emerald-300 md:text-3xl">Fleet & Logistics Management for PNG&apos;s toughest terrains.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">Every vehicle, every route, one control tower.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">A connected platform for planning routes, tracking vehicles along the corridor, managing drivers, logging fuel and maintenance, and reporting to clients—designed for logistics operators in Papua New Guinea and across the Pacific.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-500 hover:to-green-600">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/deepsfleet360/demo" className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 px-6 py-3.5 font-bold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-white/5">Explore interactive demo <ArrowRight className="h-4 w-4 text-emerald-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Delivery corridor</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300"><Truck className="h-3 w-3" /> Dispatch → report</span>
          </div>
          <div className="space-y-3">
            {corridorSteps.map(({ label, detail, icon: Icon }, index) => (
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
            <span className="text-xs font-semibold text-emerald-100">Every trip, one live record</span>
            <Link to="/deepsfleet360/demo" className="text-xs font-bold text-emerald-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="aspect-video bg-black">
            <video className="h-full w-full object-cover" controls playsInline preload="metadata" poster="/images/deepsfleet360-poster.svg" aria-label="DeepsFleet360 product demo video">
              <source src="/videos/deepsfleet360-promo-30s.mp4" type="video/mp4" />
              <track kind="captions" src="/videos/deepsfleet360-promo-30s.vtt" srcLang="en" label="English" default />
              Your browser does not support HTML5 video. The demo video is not available yet; use the interactive demo link instead.
            </video>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
            <span className="text-xs text-slate-400">DeepsFleet360 · Product walkthrough</span>
            <Link to="/deepsfleet360/demo" className="text-xs font-bold text-emerald-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">One connected toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your fleet operation needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring vehicles, drivers, routes, fuel, and maintenance together in one platform.</p>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Designed for multiple companies</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How it works</h2>
          <p className="text-gray-600 dark:text-slate-400">A multi-tenant model gives each logistics company its own workspace while keeping platform administration and client access clearly separated.</p>
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
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Plans that scale with your fleet</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Choose a starting capacity and talk with our team about the right setup for your operations.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map(plan => (
            <article key={plan.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"><Truck className="h-5 w-5" /></div>
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
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300"><Truck className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">Fleet intelligence built for PNG&apos;s toughest terrains.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-500">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/deepsfleet360/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Launch demo <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DeepsFleet360Page;
