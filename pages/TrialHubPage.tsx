import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  Rocket,
  Sparkles,
  Users,
} from 'lucide-react';
import Seo from '../components/Seo';
import { getTrialProduct, trialAccentStyles, trialProducts } from '../components/trial/trialData';
import { getTrial, logoutTrial } from '../utils/trialApi';
import type { TrialRecord } from '../utils/trialApi';

const TrialHubPage: React.FC = () => {
  const navigate = useNavigate();
  const [trial, setTrial] = useState<TrialRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getTrial()
      .then((result) => {
        if (active) setTrial(result);
      })
      .catch(() => {
        if (active) setTrial(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    await logoutTrial();
    navigate('/', { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-emerald-600" />
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-slate-400">Loading your trial workspace...</p>
        </div>
      </div>
    );
  }

  if (!trial) {
    return (
      <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
        <Seo
          title="Trial sign-in | Deeps Systems"
          description="Sign in to your Deeps Systems SaaS trial or start a new 14-day trial."
          canonicalUrl="https://dspng.tech/trial"
          robots="noindex, nofollow"
        />
        <section className="px-5 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-xl rounded-[2rem] border border-gray-200 bg-white p-8 text-center shadow-2xl shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
            <Clock3 className="mx-auto mb-5 h-14 w-14 text-amber-500" />
            <h1 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white">Your trial session is not active</h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
              Sign in with the work email you used for your trial, or start a new 14-day trial.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/start-trial?mode=login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-500"
              >
                <Mail className="h-4 w-4" /> Email me a sign-in link
              </Link>
              <Link
                to="/start-trial"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 font-bold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              >
                Start a free trial
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const product = getTrialProduct(trial.productSlug);
  const accent = product ? trialAccentStyles[product.accent] : trialAccentStyles.emerald;
  const ProductIcon = product?.icon || Rocket;
  const firstName = trial.name.split(' ')[0] || trial.name;
  const progress = Math.max(0, Math.min(100, ((14 - trial.daysLeft) / 14) * 100));
  const otherProducts = trialProducts.filter((item) => item.slug !== trial.productSlug);

  return (
    <div className="bg-gray-50 pt-16 dark:bg-[#0a0a0a] sm:pt-24">
      <Seo
        title={`${trial.productName} trial | Deeps Systems`}
        description="Your Deeps Systems trial workspace."
        canonicalUrl="https://dspng.tech/trial"
        robots="noindex, nofollow"
      />

      <section className="px-5 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                <Sparkles className="h-4 w-4" /> Trial workspace
              </div>
              <h1 className="font-montserrat text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
                Welcome, {firstName}.
              </h1>
              <p className="mt-3 max-w-2xl text-gray-600 dark:text-slate-400">
                Your {trial.productName} trial is active. You have{' '}
                <strong className="text-gray-900 dark:text-white">{trial.daysLeft} days</strong> left to explore, test and decide.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" /> Sign out of trial
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-6">
              <div className={`overflow-hidden rounded-[2rem] bg-gray-950 p-7 text-white shadow-2xl ${accent.glow} md:p-9`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-white">
                    <ProductIcon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/80">
                    {product?.category || 'Deeps SaaS'}
                  </span>
                </div>
                <h2 className="mt-6 font-montserrat text-3xl font-extrabold md:text-4xl">{trial.productName}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                  {product?.description || 'Your trial workspace is ready to explore.'}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to={product?.demoPath || '/solutions'}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-white transition ${accent.button}`}
                  >
                    <Rocket className="h-4 w-4" /> Launch workspace <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={product?.demoPath || '/solutions'}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
                  >
                    Open guided demo
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Your first 15 minutes</p>
                  <h2 className="mt-1 font-montserrat text-2xl font-bold text-gray-900 dark:text-white">Get the most out of your trial</h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Open the interactive workspace',
                      detail: 'Click through the core product workflow using realistic demo data.',
                      href: product?.demoPath || '/solutions',
                      label: 'Launch workspace',
                      icon: Rocket,
                    },
                    {
                      title: 'Test the workflow that matters to you',
                      detail: 'Try the screens and tasks your team would use every day.',
                      href: product?.demoPath || '/solutions',
                      label: 'Open guided demo',
                      icon: CheckCircle2,
                    },
                    {
                      title: 'Book a 30-minute onboarding call',
                      detail: 'Tell us what you need and we will help configure a live tenant.',
                      href: '/contact',
                      label: 'Book onboarding',
                      icon: MessageSquare,
                    },
                  ].map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Step 0{index + 1}</p>
                            <p className="mt-1 font-bold text-gray-900 dark:text-white">{step.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{step.detail}</p>
                          </div>
                        </div>
                        <Link
                          to={step.href}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-600/20 px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
                        >
                          {step.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Expand your trial</p>
                    <h2 className="mt-1 font-montserrat text-2xl font-bold text-gray-900 dark:text-white">Try another product</h2>
                  </div>
                  <Link to="/start-trial" className="text-sm font-bold text-emerald-600 hover:text-emerald-500">
                    View all
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {otherProducts.map((item) => {
                    const Icon = item.icon;
                    const itemAccent = trialAccentStyles[item.accent];
                    return (
                      <Link
                        key={item.slug}
                        to={`/start-trial?product=${item.slug}`}
                        className="group flex items-center gap-3 rounded-2xl border border-gray-100 p-4 transition hover:border-emerald-500/30 hover:bg-emerald-50/40 dark:border-white/10 dark:hover:bg-white/[0.04]"
                      >
                        <div className={`rounded-xl p-2 ${itemAccent.icon}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-slate-400">{item.category}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="font-montserrat text-xl font-bold text-gray-900 dark:text-white">Trial details</h2>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {trial.daysLeft} days left
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  {[
                    { label: 'Product', value: trial.productName },
                    { label: 'Work email', value: trial.email },
                    { label: 'Company', value: trial.company },
                    { label: 'Team size', value: trial.teamSize ? `${trial.teamSize} people` : 'Not set' },
                    { label: 'Started', value: new Date(trial.trialStartedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) },
                    { label: 'Ends', value: new Date(trial.trialEndsAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-white/10">
                      <span className="text-gray-500 dark:text-slate-400">{row.label}</span>
                      <span className="max-w-[60%] break-words text-right font-semibold text-gray-900 dark:text-white">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> Trial progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {trial.daysLeft <= 3 && (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                    Your trial is ending soon. Talk to us about keeping your workspace and data.
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="font-montserrat text-xl font-bold text-gray-900 dark:text-white">Need a hand?</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  We can help configure the product around your team, import data or arrange a live tenant.
                </p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-500"
                >
                  <MessageSquare className="h-4 w-4" /> Book onboarding
                </Link>
                <a
                  href={`mailto:wokman@dspng.tech?subject=${encodeURIComponent(`Trial support: ${trial.productName}`)}`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 font-bold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                >
                  <Mail className="h-4 w-4" /> Email the team
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrialHubPage;
