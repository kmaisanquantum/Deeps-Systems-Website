import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Layers,
  Network,
  Satellite,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import Seo from '../components/Seo';
import { IotArchitecture, IotConnectivityPath, IotLayerLegend } from '../components/iot/IotArchitecture';
import {
  iotAccentStyles,
  iotApplications,
  iotIndustries,
  iotLayers,
  iotServices,
} from '../components/iot/iotData';

const capabilities = [
  {
    title: 'Field connectivity that fits the site',
    description: 'Gateways, wireless protocols and cellular or satellite backhaul selected for the terrain, power and coverage of each location.',
    icon: Network,
  },
  {
    title: 'One platform for devices and data',
    description: 'Device registration, telemetry, dashboards and APIs brought together instead of scattered across vendor portals.',
    icon: Workflow,
  },
  {
    title: 'Security designed into the deployment',
    description: 'Device identity, access control, segmentation and monitoring treated as part of the solution, not an afterthought.',
    icon: ShieldCheck,
  },
];

const IotLandingPage: React.FC = () => (
  <div className="bg-white dark:bg-[#0a0a0a]">
    <Seo
      title="IoT & Connected Systems | Deeps Systems PNG"
      description="Deeps Systems IoT & Connected Systems connects physical assets to operational intelligence through IoT connectivity, fleet and asset tracking, industrial monitoring, smart utilities, agricultural IoT, sensors, device management, security and managed services."
      canonicalUrl="https://dspng.tech/iot"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'IoT & Connected Systems',
        description: 'IoT connectivity, connected infrastructure, industrial monitoring, device management and smart technology solutions from Deeps Systems.',
        url: 'https://dspng.tech/iot',
        provider: { '@type': 'Organization', name: 'Deeps Systems', url: 'https://dspng.tech' },
        hasPart: iotServices.map((service) => ({
          '@type': 'Service',
          name: service.name,
          serviceType: service.category,
          url: `https://dspng.tech/iot/${service.slug}`,
        })),
      }}
    />

    {/* Hero */}
    <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
      <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            <CircleDot className="h-4 w-4" />
            IoT &amp; Connected Systems
          </div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">
            Connecting Physical Assets.
            <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Unlocking Operational Intelligence.
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-slate-300 md:text-xl">
            Deeps Systems delivers connected technology solutions that bring devices, infrastructure and business operations together through intelligent connectivity, real-time monitoring, automation and data-driven insights.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:opacity-90"
            >
              Talk to our IoT team <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#iot-services"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 font-bold text-gray-700 transition hover:border-emerald-500/40 hover:bg-emerald-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
            >
              Explore the nine services <Layers className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-slate-500">
            Built for Papua New Guinea and the Pacific
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl shadow-emerald-950/20 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-bold text-white">One connected ecosystem</span>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">5 layers</span>
          </div>
          <div className="space-y-2.5">
            {iotLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div key={layer.number} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">Layer {layer.number}</p>
                    <p className="truncate text-sm font-bold text-white">{layer.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-500/10 px-4 py-3">
            <span className="text-xs font-semibold text-emerald-100">Devices to decisions, connected</span>
            <Satellite className="h-4 w-4 text-emerald-300" />
          </div>
        </div>
      </div>
    </section>

    {/* At a glance */}
    <section className="px-5 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
        <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '09', label: 'Service categories' },
            { value: '05', label: 'Architecture layers' },
            { value: '06', label: 'Industry applications' },
            { value: 'PNG', label: 'and the Pacific' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-950 px-6 py-8">
              <p className="font-montserrat text-3xl font-extrabold text-emerald-300">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-5 py-3">
          <span className="text-xs text-slate-400">Deeps Systems · IoT &amp; Connected Systems</span>
          <a href="#iot-services" className="text-xs font-bold text-emerald-300">View the service portfolio →</a>
        </div>
      </div>
    </section>

    {/* Introduction */}
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">An operating model, not a device list</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Connected technology that earns its place in the operation.
            </h2>
          </div>
          <p className="leading-relaxed text-gray-600 dark:text-slate-400">
            Deeps Systems brings connectivity, devices, platform and support together as one division. We start with the operational decision you need to improve, then design the smallest reliable system that produces the evidence to make it. Where a capability is planned rather than available today, we say so during solution design.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article key={capability.title} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{capability.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{capability.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    {/* Nine service categories */}
    <section id="iot-services" className="scroll-mt-24 bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Nine service categories</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">A portfolio that scales from one site to a national estate</h2>
          <p className="leading-relaxed text-gray-600 dark:text-slate-400">
            Each category has its own scope, delivery approach and business outcomes. Start with the problem closest to your operation, then connect the rest as the estate grows.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {iotServices.map((service) => {
            const style = iotAccentStyles[service.accent];
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/iot/${service.slug}`}
                className={`group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-white/10 dark:bg-[#0a0a0a] ${style.border}`}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-montserrat text-sm font-extrabold text-gray-300 dark:text-slate-600">{service.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-300">{service.name}</h3>
                <p className={`mb-3 mt-1 text-xs font-bold uppercase tracking-wider ${style.text}`}>{service.category}</p>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{service.summary}</p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300">
                  Explore {service.name} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* Technology ecosystem */}
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Technology ecosystem</p>
            <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How the pieces fit together</h2>
            <p className="leading-relaxed text-gray-600 dark:text-slate-400">
              A Deeps Systems IoT solution is assembled in five layers. Each layer has a clear job, and each one can be scoped independently before being connected to the others.
            </p>
          </div>
          <IotLayerLegend />
        </div>
        <IotArchitecture />
      </div>
    </section>

    {/* Connectivity architecture */}
    <section className="bg-gray-950 px-5 py-16 text-white md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Connectivity architecture</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold md:text-5xl">From the sensor to the decision</h2>
          <p className="leading-relaxed text-slate-400">
            Data travels through a deliberate path. Understanding that path makes it easier to choose devices, plan coverage and decide where redundancy is worth the cost.
          </p>
        </div>
        <IotConnectivityPath />
        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Satellite and gateway integration options are scoped per site. Not every protocol or integration listed is available in every deployment; current and planned capabilities are confirmed during solution design.
        </p>
      </div>
    </section>

    {/* Industries served */}
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Industries served</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Built around the realities of the region</h2>
          <p className="leading-relaxed text-gray-600 dark:text-slate-400">
            Long supply lines, dispersed assets and inconsistent networks shape what a practical IoT deployment looks like in Papua New Guinea and the Pacific.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {iotIndustries.map((industry) => {
            const Icon = industry.icon;
            return (
              <article key={industry.name} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:border-emerald-500/30 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">{industry.name}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{industry.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    {/* Business applications */}
    <section className="bg-gray-50 px-5 py-16 dark:bg-white/[0.02] md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Business applications</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">What connected operations make possible</h2>
          <p className="leading-relaxed text-gray-600 dark:text-slate-400">
            The same ecosystem supports different outcomes depending on which layer you start with and what the operation needs to improve first.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {iotApplications.map((application) => {
            const Icon = application.icon;
            return (
              <article key={application.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1.5 text-base font-bold text-gray-900 dark:text-white">{application.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">{application.description}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
          <p className="flex-1 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
            Not sure where to start? The DeepsManage IoT service can assess your sites and recommend a first deployment with a clear scope.
          </p>
          <Link to="/iot/deepsmanage-iot" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            Explore managed IoT <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* Consultation CTA */}
    <section className="px-5 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-600 to-blue-700 opacity-30 blur-3xl" />
        <div className="relative">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
            <Network className="h-7 w-7" />
          </div>
          <h2 className="mx-auto mb-4 max-w-3xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">
            Start with the asset that matters most.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Bring us a site, a fleet or an operational problem. We will help you decide whether connected technology is the right answer, what it would take and what it should return.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 px-7 py-3.5 font-bold text-white transition hover:opacity-90">
              Request a consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#iot-services" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white transition hover:bg-white/10">
              Review the services <Layers className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default IotLandingPage;
