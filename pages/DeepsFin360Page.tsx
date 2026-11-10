import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowRight, BarChart3, Building2, Check, Clock3,
  CreditCard, FileText, Landmark, MapPin, ShieldAlert, TrendingUp, Users, WalletCards,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: 'Core Banking Support', description: 'Operate accounts, balances, and ledgers on a platform built to sit alongside your core banking systems.', icon: Landmark },
  { title: 'Payment Processing', description: 'Record deposits, withdrawals, transfers, and agent cash-in/cash-out with clear, auditable status.', icon: CreditCard },
  { title: 'Fraud Detection', description: 'Flag suspicious transactions with rule-based monitoring and a review queue for your analysts.', icon: ShieldAlert },
  { title: 'Financial Inclusion Tools', description: 'Reach unbanked and rural customers through agents, mobile onboarding, and low-friction KYC.', icon: Users },
  { title: 'Customer Accounts & KYC', description: 'Maintain account holders with tiered KYC status and a complete customer profile.', icon: Building2 },
  { title: 'Agent & Branch Network', description: 'Manage branches and agents, and see the network that brings services closer to communities.', icon: MapPin },
  { title: 'Regulatory Reporting', description: 'Generate audit-ready reports for regulators, boards, and internal risk committees.', icon: FileText },
  { title: 'SaaS Subscriptions', description: 'Plans by account and network size, scaled as your institution grows.', icon: WalletCards },
];

const plans = [
  { name: 'Starter', capacity: 'Up to 5,000 accounts', description: 'A practical starting point for savings & loan societies and small microfinance institutions.' },
  { name: 'Growth', capacity: 'Up to 50,000 accounts', description: 'More room for growing MFIs and banks adding branches, agents, and products.' },
  { name: 'Professional', capacity: 'Up to 250,000 accounts', description: 'Built for established banks and larger institutions running national networks.' },
  { name: 'Enterprise', capacity: 'Custom core integration', description: 'A tailored fit for core banking integration and dedicated support.' },
];

const howItWorks = [
  { title: 'Platform owner master admin', detail: 'A central master dashboard for platform-level administration, plans, and oversight.', icon: BarChart3 },
  { title: 'Isolated institution workspaces', detail: 'Each bank, MFI, or fintech operates within its own dedicated workspace and data boundary.', icon: Landmark },
  { title: 'Customer & regulator portal', detail: 'Customers and regulators see only the accounts and reports shared with them.', icon: Users },
  { title: 'Agent & field app', detail: 'Mobile access helps agents onboard customers and capture transactions in rural areas.', icon: MapPin },
];

const chainSteps = [
  { label: 'Onboard', detail: 'Customer and KYC captured', icon: Users },
  { label: 'Transact', detail: 'Deposits, transfers, agent cash', icon: CreditCard },
  { label: 'Monitor', detail: 'Fraud rules and alerts', icon: ShieldAlert },
  { label: 'Report', detail: 'Regulator-ready records', icon: FileText },
];

const DeepsFin360Page: React.FC = () => (
  <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
    <Seo title="DeepsFin360 | Financial Services Operations Platform for PNG & the Pacific" description="DeepsFin360 is a financial services operations platform for PNG and the Pacific - manage customer accounts and KYC, process payments, detect fraud, and reach unbanked rural communities." canonicalUrl="https://dspng.tech/deepsfin360" />
    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-300"><Landmark className="h-4 w-4" /> Financial Services Operations</div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">DeepsFin360<span className="mt-3 block text-2xl font-bold leading-snug text-amber-600 dark:text-amber-300 md:text-3xl">Financial services operations for PNG and the Pacific — core banking to unbanked communities.</span></h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">Banking that reaches everyone.</p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">A connected platform for managing customer accounts, processing payments, detecting fraud, and reaching unbanked and rural communities—designed for banks, microfinance institutions, savings &amp; loan societies, and fintechs in Papua New Guinea and the Pacific.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-orange-500">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/deepsfin360/demo" className="inline-flex items-center gap-2 rounded-full border border-amber-600/30 px-6 py-3.5 font-bold text-amber-700 transition hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-white/5">Explore interactive demo <ArrowRight className="h-4 w-4 text-amber-500" /></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-2xl shadow-amber-950/20 dark:border-white/10">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Financial operations chain</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-bold text-amber-300"><Activity className="h-3 w-3" /> Onboard → report</span>
          </div>
          <div className="space-y-3">
            {chainSteps.map(({ label, detail, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-300">0{index + 1}</p>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-xs text-slate-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-amber-500/10 px-4 py-3">
            <span className="text-xs font-semibold text-amber-100">Every account, one governed record</span>
            <Link to="/deepsfin360/demo" className="text-xs font-bold text-amber-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-amber-950/20 dark:border-white/10">
          <div className="aspect-video bg-black">
            <video className="h-full w-full object-cover" controls playsInline preload="metadata" poster="/images/deepsfin360-poster.svg" aria-label="DeepsFin360 product demo video">
              <source src="/videos/deepsfin360-promo-30s.mp4" type="video/mp4" />
              <track kind="captions" src="/videos/deepsfin360-promo-30s.vtt" srcLang="en" label="English" default />
              Your browser does not support HTML5 video. The demo video is not available yet; use the interactive demo link instead.
            </video>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
            <span className="text-xs text-slate-400">DeepsFin360 · Product walkthrough</span>
            <Link to="/deepsfin360/demo" className="text-xs font-bold text-amber-300">Open interactive demo →</Link>
          </div>
        </div>
      </div>
    </section>
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-300">One connected toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your institution needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring customer accounts, payments, fraud monitoring, agent networks, and regulatory reporting together in one platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="group rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-950/5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 inline-flex rounded-xl bg-amber-500/10 p-3 text-amber-600 transition group-hover:bg-amber-600 group-hover:text-white dark:text-amber-300"><Icon className="h-5 w-5" /></div>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-300">Designed for multiple institutions</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How it works</h2>
          <p className="text-gray-600 dark:text-slate-400">A multi-tenant model gives each institution its own workspace while keeping platform administration, customer access, and regulator review clearly separated.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {howItWorks.map(({ title, detail, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300"><Icon className="h-5 w-5" /></div>
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-300">0{index + 1}</span>
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-300">Flexible SaaS subscriptions</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Plans that scale with your accounts</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Choose a starting capacity and talk with our team about the right setup for your institution.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map(plan => (
            <article key={plan.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300"><Clock3 className="h-5 w-5" /></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mb-4 mt-2 text-sm font-bold text-amber-600 dark:text-amber-300">{plan.capacity}</p>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{plan.description}</p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-amber-600" /> Contact us for plan details</div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20">Contact Sales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
    <section className="px-5 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300"><TrendingUp className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">Banking infrastructure that reaches every community.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 font-bold text-white transition hover:bg-amber-400">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/deepsfin360/demo" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white">Launch demo <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DeepsFin360Page;
