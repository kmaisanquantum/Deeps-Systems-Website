import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import Seo from '../components/Seo';
import { getTrialProduct, trialAccentStyles, trialProducts } from '../components/trial/trialData';
import { requestTrialMagicLink, startTrial } from '../utils/trialApi';

type SubmitStatus = 'idle' | 'submitting' | 'sent' | 'error';

const StartTrialPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const loginMode = searchParams.get('mode') === 'login';
  const selected = getTrialProduct(searchParams.get('product')) || trialProducts[0];
  const accent = trialAccentStyles[selected.accent];
  const SelectedIcon = selected.icon;

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '11-50',
    phone: '',
    companyWebsite: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState('');
  const [sentEmail, setSentEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginStatus, setLoginStatus] = useState<SubmitStatus>('idle');

  const selectProduct = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('product', slug);
    next.delete('mode');
    setSearchParams(next, { replace: true });
    setStatus('idle');
    setSubmitError('');
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: '' }));
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid work email.';
    if (form.company.trim().length < 2) nextErrors.company = 'Enter your company name.';
    if (!acceptTerms) nextErrors.terms = 'Please accept the trial terms to continue.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setSubmitError('');

    try {
      await startTrial({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        productSlug: selected.slug,
        teamSize: form.teamSize,
        phone: form.phone.trim() || undefined,
        source: 'website:trial-page',
        companyWebsite: form.companyWebsite,
        acceptTerms,
      });
      setSentEmail(form.email.trim());
      setStatus('sent');
      setResendStatus('idle');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not start your trial. Please try again.');
      setStatus('error');
    }
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.trim())) {
      setLoginError('Enter the work email you used for your trial.');
      return;
    }

    setLoginError('');
    setLoginStatus('submitting');
    try {
      await requestTrialMagicLink(loginEmail.trim());
      setSentEmail(loginEmail.trim());
      setLoginStatus('sent');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'We could not send a sign-in link. Please try again.');
      setLoginStatus('error');
    }
  };

  const handleResend = async () => {
    setResendStatus('sending');
    setSubmitError('');
    try {
      await requestTrialMagicLink(sentEmail);
      setResendStatus('sent');
    } catch {
      setResendStatus('idle');
      setSubmitError('We could not resend the link. Please try again.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setSubmitError('');
    setResendStatus('idle');
    setSentEmail('');
  };

  if (loginMode) {
    return (
      <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
        <Seo
          title="Sign in to your Deeps Systems trial"
          description="Enter your work email to receive a secure sign-in link for your Deeps Systems SaaS trial."
          canonicalUrl="https://dspng.tech/start-trial?mode=login"
          robots="noindex, nofollow"
        />
        <section className="px-5 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-xl">
            <div className="mb-8 text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                <Mail className="h-4 w-4" /> Trial sign-in
              </div>
              <h1 className="font-montserrat text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
                Sign in to your trial
              </h1>
              <p className="mt-4 text-gray-600 dark:text-slate-400">
                Enter the work email you used for your trial and we will send you a secure sign-in link.
              </p>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
              {loginStatus === 'sent' ? (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                  <h2 className="font-montserrat text-2xl font-bold text-gray-900 dark:text-white">Check your inbox</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                    If <strong className="text-gray-900 dark:text-white">{sentEmail}</strong> has an active trial, a sign-in link is on its way.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginStatus('idle');
                      setSentEmail('');
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Use a different email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">Work email</span>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(event) => {
                          setLoginEmail(event.target.value);
                          setLoginError('');
                        }}
                        placeholder="you@company.com"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-4 text-gray-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </div>
                    {loginError && <span className="mt-2 block text-xs font-semibold text-red-600">{loginError}</span>}
                  </label>
                  <button
                    type="submit"
                    disabled={loginStatus === 'submitting'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loginStatus === 'submitting' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mail className="h-5 w-5" />}
                    {loginStatus === 'submitting' ? 'Sending link...' : 'Email me a sign-in link'}
                  </button>
                </form>
              )}
            </div>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-400">
              New to Deeps Systems?{' '}
              <Link to="/start-trial" className="font-bold text-emerald-600 hover:text-emerald-500">
                Start a free trial
              </Link>
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
      <Seo
        title="Start a 14-day free SaaS trial | Deeps Systems"
        description="Try Deeps Systems SaaS products free for 14 days. Choose a product, verify your work email and open your trial workspace in minutes. No credit card required."
        canonicalUrl="https://dspng.tech/start-trial"
      />

      <section className="relative overflow-hidden px-5 py-14 md:px-6 md:py-20">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                <Sparkles className="h-4 w-4" /> Self-serve SaaS trials
              </div>
              <h1 className="max-w-3xl font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">
                Start your 14-day <span className="quantum-text-gradient">Deeps SaaS</span> trial.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-slate-300">
                Pick a product, verify your work email and open your trial workspace in minutes. No credit card and no sales call required.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  '14 days free. No credit card.',
                  'Secure work-email verification.',
                  'Launch the interactive workspace immediately.',
                  'Book onboarding only when you are ready.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Step 1</p>
                    <h2 className="mt-1 font-montserrat text-2xl font-bold text-gray-900 dark:text-white">Choose a product</h2>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-slate-400">Selected: {selected.name}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {trialProducts.map((product) => {
                    const Icon = product.icon;
                    const productAccent = trialAccentStyles[product.accent];
                    const isSelected = product.slug === selected.slug;
                    return (
                      <button
                        type="button"
                        key={product.slug}
                        onClick={() => selectProduct(product.slug)}
                        aria-pressed={isSelected}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                          isSelected
                            ? `${productAccent.selected} bg-white dark:bg-white/[0.05]`
                            : 'border-gray-200 bg-white hover:border-gray-300 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20'
                        }`}
                      >
                        <div className={`rounded-xl p-2 ${productAccent.icon}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{product.name}</p>
                          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-slate-400">{product.category}</p>
                        </div>
                        {isSelected && <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 rounded-3xl border border-gray-100 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">What happens next</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { number: '01', title: 'Verify your email', detail: 'We send a secure link to your work inbox.' },
                    { number: '02', title: 'Open your trial', detail: 'Your 14-day trial workspace activates.' },
                    { number: '03', title: 'Start exploring', detail: 'Launch the product and invite your team.' },
                  ].map((step) => (
                    <div key={step.number}>
                      <span className="text-xs font-black text-emerald-600">{step.number}</span>
                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{step.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-slate-400">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              {status === 'sent' ? (
                <div className="rounded-[2rem] border border-emerald-200 bg-white p-7 text-center shadow-2xl shadow-emerald-950/5 dark:border-emerald-500/20 dark:bg-white/[0.03] md:p-9">
                  <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-emerald-600" />
                  <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white">Check your inbox</h2>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                    We sent a secure activation link to <strong className="text-gray-900 dark:text-white">{sentEmail}</strong>. Open it to activate your{' '}
                    <strong className="text-gray-900 dark:text-white">{selected.name}</strong> trial.
                  </p>
                  <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-left text-xs leading-relaxed text-gray-600 dark:bg-white/5 dark:text-slate-400">
                    <p className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                      <Clock3 className="h-4 w-4 text-emerald-600" /> The link expires in 30 minutes.
                    </p>
                    <p className="mt-1">Check your spam folder if it does not arrive within a minute.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendStatus === 'sending'}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    {resendStatus === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                    {resendStatus === 'sent' ? 'Link sent again' : 'Resend activation link'}
                  </button>
                  {submitError && (
                    <p className="mt-3 text-xs font-semibold text-red-600 dark:text-red-400">{submitError}</p>
                  )}
                  <Link
                    to={selected.demoPath}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-500"
                  >
                    Explore the demo while you wait <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button type="button" onClick={resetForm} className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-500">
                    Use a different email
                  </button>
                </div>
              ) : (
                <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Step 2</p>
                      <h2 className="mt-1 font-montserrat text-2xl font-bold text-gray-900 dark:text-white">Create your trial access</h2>
                    </div>
                    <div className={`rounded-2xl p-3 ${accent.icon}`}>
                      <SelectedIcon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className={`mb-6 rounded-2xl border p-4 ${accent.selected}`}>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-slate-400">{selected.category}</p>
                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{selected.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-slate-400">{selected.description}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">Full name</span>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(event) => updateField('name', event.target.value)}
                          placeholder="Your full name"
                          className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-gray-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                      </div>
                      {errors.name && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.name}</span>}
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">Work email</span>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) => updateField('email', event.target.value)}
                          placeholder="you@company.com"
                          className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-gray-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                      </div>
                      {errors.email && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.email}</span>}
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">Company</span>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          autoComplete="organization"
                          value={form.company}
                          onChange={(event) => updateField('company', event.target.value)}
                          placeholder="Your company"
                          className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-gray-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                      </div>
                      {errors.company && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.company}</span>}
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">Team size</span>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <select
                            value={form.teamSize}
                            onChange={(event) => updateField('teamSize', event.target.value)}
                            className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-gray-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                          >
                            {['1-10', '11-50', '51-200', '201-500', '500+'].map((size) => (
                              <option key={size} value={size}>{size} people</option>
                            ))}
                          </select>
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-gray-900 dark:text-white">Phone <span className="font-normal text-gray-400">(optional)</span></span>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(event) => updateField('phone', event.target.value)}
                            placeholder="+675 ..."
                            className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3.5 text-gray-900 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                          />
                        </div>
                      </label>
                    </div>

                    <label className="hidden" aria-hidden="true">
                      Company website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.companyWebsite}
                        onChange={(event) => updateField('companyWebsite', event.target.value)}
                      />
                    </label>

                    <label className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-white/5">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(event) => {
                          setAcceptTerms(event.target.checked);
                          if (errors.terms) setErrors((previous) => ({ ...previous, terms: '' }));
                        }}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs leading-relaxed text-gray-600 dark:text-slate-400">
                        I agree to be contacted about my trial and accept the Deeps Systems trial terms. My trial runs for 14 days.
                      </span>
                    </label>
                    {errors.terms && <span className="block text-xs font-semibold text-red-600">{errors.terms}</span>}

                    {submitError && (
                      <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting' ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                      {status === 'submitting' ? 'Creating your trial...' : 'Start my free trial'}
                    </button>
                    <p className="text-center text-[11px] text-gray-500 dark:text-slate-400">
                      14 days free. No credit card. No obligation.
                    </p>
                  </form>
                </div>
              )}

              <p className="mt-5 text-center text-xs text-gray-500 dark:text-slate-400">
                Already started a trial?{' '}
                <Link to="/start-trial?mode=login" className="font-bold text-emerald-600 hover:text-emerald-500">
                  Email me a sign-in link
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartTrialPage;
