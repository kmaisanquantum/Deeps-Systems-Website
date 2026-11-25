import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  Layers,
  TrendingUp,
} from 'lucide-react';
import Seo from '../Seo';
import { iotAccentStyles, type IotService, type IotTechnologyStatus } from './iotData';

const techStatusStyles: Record<IotTechnologyStatus, { label: string; className: string; dot: string }> = {
  scoped: {
    label: 'Scoped per deployment',
    className: 'border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300',
    dot: 'bg-gray-400',
  },
  planned: {
    label: 'Planned',
    className: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  existing: {
    label: 'Existing initiative',
    className: 'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
};

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  accentText: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, description, accentText }) => (
  <div className="mb-10 max-w-3xl">
    <p className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${accentText}`}>{eyebrow}</p>
    <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{title}</h2>
    {description && <p className="leading-relaxed text-gray-600 dark:text-slate-400">{description}</p>}
  </div>
);

const IotServicePage: React.FC<{ service: IotService }> = ({ service }) => {
  const style = iotAccentStyles[service.accent];
  const Icon = service.icon;

  return (
    <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
      <Seo
        title={service.seoTitle}
        description={service.seoDescription}
        canonicalUrl={`https://dspng.tech/iot/${service.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          serviceType: service.category,
          description: service.seoDescription,
          url: `https://dspng.tech/iot/${service.slug}`,
          provider: {
            '@type': 'Organization',
            name: 'Deeps Systems',
            url: 'https://dspng.tech',
          },
          areaServed: {
            '@type': 'Place',
            name: 'Papua New Guinea and the Pacific',
          },
        }}
      />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-8 md:px-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-slate-400">
          <li>
            <Link to="/" className="transition hover:text-emerald-600 dark:hover:text-emerald-300">Home</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li>
            <Link to="/iot" className="transition hover:text-emerald-600 dark:hover:text-emerald-300">IoT &amp; Connected Systems</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li aria-current="page" className="text-gray-900 dark:text-white">{service.name}</li>
        </ol>
      </nav>

      {/* 1 & 2. Hero, category and tagline */}
      <section className="relative overflow-hidden px-5 py-12 md:px-6 md:py-20">
        <div className={`absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br ${style.gradient} opacity-10 blur-3xl`} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest ${style.badge}`}>
              <Icon className="h-4 w-4" />
              {service.category}
            </div>
            <h1 className="mb-4 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">
              {service.name}
              <span className={`mt-3 block text-2xl font-bold leading-snug md:text-3xl ${style.text}`}>
                {service.tagline}
              </span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-slate-300">
              {service.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-7 py-3.5 font-bold text-white shadow-lg transition hover:opacity-90 ${style.gradient}`}
              >
                Discuss your requirements <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/iot"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 font-bold text-gray-700 transition hover:border-emerald-500/40 hover:bg-emerald-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
              >
                All IoT services <Layers className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-slate-500">
              Part of the Deeps Systems IoT &amp; Connected Systems division
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl shadow-emerald-950/20 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Solution snapshot</span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{service.number} / 09</span>
            </div>
            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconSolid}`}>
              <Icon className="h-7 w-7" />
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
              {service.heroStats.map((stat) => (
                <div key={stat.label} className="bg-gray-950 p-4">
                  <p className="font-montserrat text-lg font-extrabold text-emerald-300">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3">
              <CircleDot className="h-4 w-4 shrink-0 text-emerald-300" />
              <p className="text-xs font-semibold text-emerald-100">Scope and availability confirmed during solution design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Introduction */}
      <section className="px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${style.text}`}>The operational case</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">What this service changes</h2>
          </div>
          <div className="space-y-5">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-gray-600 dark:text-slate-300 md:text-lg">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${style.icon}`}>{service.category}</span>
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 dark:bg-white/5 dark:text-slate-300">
                {service.capabilities.length} capability areas
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 dark:bg-white/5 dark:text-slate-300">
                {service.industries.length} industry applications
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Business problems addressed */}
      <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Business problems addressed"
            title="What this service is designed to solve"
            description="Connected technology is only useful when it removes a real operational constraint. These are the problems this service is built around."
            accentText={style.text}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {service.problems.map((problem, index) => (
              <article key={problem.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-slate-500">Problem 0{index + 1}</span>
                  <h3 className="mb-1.5 text-base font-bold text-gray-900 dark:text-white">{problem.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{problem.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core capabilities and features */}
      <section className="px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Core capabilities and features"
            title="What the service includes"
            description="The scope below is the starting point for solution design. The combination delivered for your operation is agreed before deployment."
            accentText={style.text}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability) => (
              <article
                key={capability.title}
                className={`group rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03] ${style.border}`}
              >
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${style.icon}`}>
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">{capability.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technology and connectivity options */}
      <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Technology and connectivity options"
            title="How the solution connects"
            description="Technology is selected to fit the site, the devices and the operating environment. Support for a specific protocol, device or platform is confirmed during solution design."
            accentText={style.text}
          />
          <div className="grid gap-3 md:grid-cols-2">
            {service.technologies.map((technology) => {
              const status = techStatusStyles[technology.status];
              return (
                <div key={technology.name} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0a0a0a]">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{technology.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.className}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{technology.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-xs text-gray-600 dark:border-white/10 dark:bg-[#0a0a0a] dark:text-slate-400">
            {(Object.keys(techStatusStyles) as IotTechnologyStatus[]).map((key) => (
              <span key={key} className="inline-flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${techStatusStyles[key].dot}`} />
                <span className="font-semibold text-gray-800 dark:text-slate-200">{techStatusStyles[key].label}</span>
              </span>
            ))}
            <span className="w-full pt-1 text-[11px] leading-relaxed">
              Planned items are roadmap capabilities and are not offered as standard deployments. MeshSat is an existing Deeps Systems initiative presented as a potential gateway and connectivity integration component.
            </span>
          </div>
        </div>
      </section>

      {/* 7. Industry applications */}
      <section className="px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Industry applications"
            title="Where this service fits"
            description="The same capability set is configured differently for each operating environment."
            accentText={style.text}
          />
          <div className="flex flex-wrap gap-3">
            {service.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. How the solution works */}
      <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How the solution works"
            title="From assessment to operation"
            description="A structured delivery path keeps the technology tied to the operational outcome."
            accentText={style.text}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.howItWorks.map((step, index) => (
              <article key={step.title} className="relative rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
                <span className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl font-montserrat text-sm font-extrabold ${style.icon}`}>
                  0{index + 1}
                </span>
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Business benefits and outcomes */}
      <section className="px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Business benefits and outcomes"
            title="What changes for your operation"
            description="Success is measured in operational and commercial outcomes, not in the number of devices installed."
            accentText={style.text}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {service.benefits.map((benefit) => (
              <article key={benefit.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}>
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1.5 text-base font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Related Deeps Systems solutions */}
      <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Related Deeps Systems solutions"
            title="Continue exploring"
            description="This service can stand alone or connect to the wider Deeps Systems portfolio."
            accentText={style.text}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {service.related.map((related) => (
              <Link
                key={related.name}
                to={related.href}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]"
              >
                <h3 className="mb-2 text-base font-bold text-gray-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-300">
                  {related.name}
                </h3>
                <p className="mb-5 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{related.description}</p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
                  Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Contact and consultation call to action */}
      <section className="px-5 pb-20 md:px-6 md:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
          <div className={`absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${style.gradient} opacity-30 blur-3xl`} />
          <div className="relative">
            <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconSolid}`}>
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="mx-auto mb-4 max-w-3xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">
              Let&apos;s scope {service.name} for your operation.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Tell us about the sites, assets and decisions you need to improve. We will confirm what is practical, what is planned and what the next step should be.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-7 py-3.5 font-bold text-white transition hover:opacity-90 ${style.gradient}`}
              >
                Request a consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/iot"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Explore the IoT division <Layers className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IotServicePage;
