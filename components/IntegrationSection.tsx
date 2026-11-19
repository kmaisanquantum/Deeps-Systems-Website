import React, { useState } from 'react';
import { ArrowRight, Boxes, Building2, CheckCircle2, Cloud, Globe, Loader2, Plug, Tag } from 'lucide-react';
import { getApiUrl } from '../utils/api';

/**
 * Shared "Integration & collaboration" section for the SaaS product pages.
 * Renders capability cards plus a pre-filled request form that posts to
 * POST /api/integration-request (emailed to sales@dspng.tech).
 */

const capabilities = [
  { title: 'Custom domain deployment', detail: 'Run the platform on your own domain with your own branding at the front door.', icon: Globe },
  { title: 'API & data integration', detail: 'Connect to your existing systems with REST APIs and structured data exchange.', icon: Plug },
  { title: 'White-label / partner', detail: 'Rebrand the platform for your clients and operate it as your own offering.', icon: Boxes },
  { title: 'Data export & migration', detail: 'Export your data any time via CSV or API — no lock-in, no vendor trap.', icon: Cloud },
];

type IntegrationSectionProps = {
  platform: string;
};

const IntegrationSection: React.FC<IntegrationSectionProps> = ({ platform }) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', platform, message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400';
  const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch(getApiUrl('/api/integration-request'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Could not send your request.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your request.');
    }
  };

  return (
    <section id="integration" className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Integration &amp; collaboration</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Fit {platform} around your business</h2>
          <p className="text-gray-600 dark:text-slate-400">Deploy on your own domain, connect your existing systems, white-label for your clients, and take your data with you.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ title, detail, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-8 rounded-[2rem] border border-gray-100 bg-white p-8 dark:border-white/10 dark:bg-[#0a0a0a] md:grid-cols-[1fr_1.1fr] md:p-10">
          <div>
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 dark:text-white">Talk to us about integration</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">Tell us about your systems and goals. Our team will follow up with the right setup for {platform} — custom domain, API access, white-label or migration support.</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-slate-400">
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />Guided onboarding and migration planning</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />Partner and reseller arrangements</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />Data export in open formats, any time</li>
            </ul>
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-8 text-center dark:bg-emerald-500/5">
              <CheckCircle2 className="mb-4 h-10 w-10 text-emerald-600" />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Request received</h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">Thanks — our team has your details and will reach out about {form.platform} integration.</p>
              <button type="button" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', platform, message: '' }); }} className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">
                Send another <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>Name</span>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                </label>
                <label>
                  <span className={labelClass}>Work email</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" className={inputClass} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>Company</span>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" className={inputClass} />
                </label>
                <label>
                  <span className={labelClass}>Platform interest</span>
                  <span className="relative block">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input name="platform" value={form.platform} onChange={handleChange} className={`${inputClass} pl-9`} />
                  </span>
                </label>
              </div>
              <label className="block">
                <span className={labelClass}>Message</span>
                <textarea name="message" rows={4} value={form.message} onChange={handleChange} required placeholder="Tell us what you want to integrate..." className={`${inputClass} resize-none`} />
              </label>
              {status === 'error' && error && <p className="text-xs font-semibold text-red-600">{error}</p>}
              <button type="submit" disabled={status === 'submitting'} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60 sm:w-auto">
                {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Building2 className="h-4 w-4" />}
                Request integration
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
