import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  Camera,
  Check,
  ClipboardList,
  Clock3,
  MapPin,
  Route,
  Shield,
  ShieldCheck,
  Users,
  Video,
  WalletCards,
} from 'lucide-react';
import Seo from '../components/Seo';

const features = [
  { title: 'Guard Management', description: 'Keep guard profiles, assignments, qualifications, and deployment details organised.', icon: ShieldCheck },
  { title: 'Workforce Management', description: 'Coordinate teams, rosters, attendance, and day-to-day workforce operations.', icon: Users },
  { title: 'GPS Tracking', description: 'View field team locations and status to support informed operational decisions.', icon: MapPin },
  { title: 'Patrol Management', description: 'Plan patrol schedules, monitor checkpoints, and maintain clear patrol records.', icon: Route },
  { title: 'CCTV Integration', description: 'Bring CCTV monitoring into a connected security operations workflow.', icon: Camera },
  { title: 'Incident Management', description: 'Capture incident reports, follow-up actions, and outcomes in one place.', icon: Activity },
  { title: 'Client Portal', description: 'Give clients a secure, restricted view of the information relevant to their sites.', icon: Building2 },
  { title: 'Reporting & Analytics', description: 'Turn operational activity into useful reports for managers and clients.', icon: BarChart3 },
  { title: 'SaaS Subscriptions', description: 'Choose a plan that fits your guard count and scale as your company grows.', icon: WalletCards },
];

const plans = [
  { name: 'Starter', capacity: 'Up to 50 guards', description: 'A practical starting point for smaller security teams.' },
  { name: 'Growth', capacity: 'Up to 150 guards', description: 'More room for growing teams and expanding operations.' },
  { name: 'Professional', capacity: 'Up to 300 guards', description: 'Built for established companies with larger workforces.' },
  { name: 'Enterprise', capacity: 'Custom capacity', description: 'A tailored fit for large or multi-site operations.' },
];

const DeepsGuard360Page: React.FC = () => (
  <div className="pt-16 sm:pt-24 bg-white dark:bg-[#0a0a0a]">
    <Seo
      title="DeepsGuard360 | Security Management SaaS for PNG & the Pacific"
      description="Manage guards, patrols, incidents, and client access with DeepsGuard360, an integrated security operations platform for security companies in PNG and the Pacific."
      canonicalUrl="https://dspng.tech/deepsguard360"
    />

    <section className="relative overflow-hidden px-5 py-16 md:px-6 md:py-24">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
            <Shield className="h-4 w-4" /> Security operations, connected
          </div>
          <h1 className="mb-6 font-montserrat text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">
            DeepsGuard360
            <span className="mt-3 block text-2xl font-bold leading-snug text-emerald-600 md:text-3xl">
              Integrated Security Management SaaS Platform.
            </span>
          </h1>
          <p className="mb-8 max-w-xl text-lg font-semibold text-gray-600 dark:text-slate-300 md:text-xl">
            One Platform. Complete Security Operations.
          </p>
          <p className="mb-8 max-w-xl leading-relaxed text-gray-600 dark:text-slate-400">
            A connected platform for managing security teams, field operations, client visibility, and reporting—designed for security companies in Papua New Guinea and across the Pacific.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full quantum-gradient px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.02]">
            Request a Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
          <div className="aspect-video flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950 via-gray-950 to-black p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-300">
                <Video className="h-7 w-7" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">Product demo video</p>
              <p className="mt-2 text-xs text-slate-400">Demo video coming soon</p>
            </div>
          </div>
          <div className="border-t border-white/10 bg-black/40 px-5 py-3 text-xs text-slate-400">DeepsGuard360 • A complete view of security operations</div>
        </div>
      </div>
    </section>

    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">One connected toolkit</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Everything your security operation needs</h2>
          <p className="text-gray-600 dark:text-slate-400">Bring people, field activity, client service, and business insight together in one platform.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="group rounded-2xl border border-gray-100 bg-gray-50/80 p-6 transition hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white"><Icon className="h-5 w-5" /></div>
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Designed for multiple companies</p>
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">How it works</h2>
          <p className="text-gray-600 dark:text-slate-400">A multi-tenant model gives each security company its own workspace while keeping platform administration and client access clearly separated.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { title: 'Platform owner master admin', detail: 'A central master dashboard for platform-level administration and oversight.', icon: ShieldCheck },
            { title: 'Isolated company workspaces', detail: 'Each security company operates within its own dedicated workspace and data boundary.', icon: Building2 },
            { title: 'Client portal with restricted access', detail: 'Clients see only the permitted information associated with their services and sites.', icon: ClipboardList },
            { title: 'Guard mobile app', detail: 'Mobile access helps guards stay connected to assignments and operational updates in the field.', icon: MapPin },
          ].map(({ title, detail, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><Icon className="h-5 w-5" /></div>
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-emerald-600">0{index + 1}</span>
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Flexible SaaS subscriptions</p>
            <h2 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">Plans that scale with your team</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-slate-400">Choose a starting capacity and talk with our team about the right setup for your operations.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><Clock3 className="h-5 w-5" /></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="mb-4 mt-2 text-sm font-bold text-emerald-600">{plan.capacity}</p>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-slate-400">{plan.description}</p>
              <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-slate-400"><Check className="h-4 w-4 text-emerald-600" /> Contact us for plan details</div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full quantum-gradient px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.02]">
            Contact Sales <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    <section className="px-5 pb-20 md:px-6 md:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300"><Shield className="h-7 w-7" /></div>
        <h2 className="mx-auto mb-5 max-w-4xl font-montserrat text-3xl font-bold leading-tight md:text-5xl">One Platform. Multiple Security Companies. Unlimited Possibilities.</h2>
        <p className="mb-8 text-sm font-medium tracking-wide text-slate-300">Developed and powered by Deeps Systems.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-500">
          Request a Demo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default DeepsGuard360Page;
