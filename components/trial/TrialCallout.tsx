import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { trialProducts } from './trialData';

const TrialCallout: React.FC = () => (
  <section className="bg-white px-5 py-16 dark:bg-[#0a0a0a] md:px-6 md:py-20">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 p-7 text-white shadow-2xl shadow-emerald-950/20 md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Sparkles className="h-4 w-4" /> Self-serve SaaS trials
          </div>
          <h2 className="max-w-3xl font-montserrat text-3xl font-extrabold leading-tight md:text-5xl">
            Try any Deeps SaaS free for 14 days.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Choose a product, verify your work email and open your trial workspace in minutes. No credit card and no sales call required.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
            {['14 days free', 'No credit card', 'Work email verification', 'Launch immediately'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> {item}
              </span>
            ))}
          </div>
        </div>
        <Link
          to="/start-trial"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-4 font-bold text-gray-950 transition hover:bg-emerald-400"
        >
          Start free trial <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trialProducts.map((product) => {
          const Icon = product.icon;
          return (
            <Link
              key={product.slug}
              to={`/start-trial?product=${product.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-emerald-400/30 hover:bg-white/[0.08]"
            >
              <div className="rounded-xl bg-white/10 p-2 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{product.name}</p>
                <p className="truncate text-[11px] font-medium uppercase tracking-wider text-slate-400">{product.category}</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-300" />
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrialCallout;
