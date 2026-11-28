import type { LucideIcon } from 'lucide-react';
import { Cpu, FileSearch, Headset, Landmark, Shield, ShieldCheck, Sprout, Truck } from 'lucide-react';

export type TrialAccent = 'sky' | 'teal' | 'blue' | 'indigo' | 'emerald' | 'amber' | 'green';

export interface TrialProduct {
  slug: string;
  name: string;
  category: string;
  description: string;
  demoPath: string;
  icon: LucideIcon;
  accent: TrialAccent;
}

export const trialAccentStyles: Record<TrialAccent, {
  icon: string;
  selected: string;
  pill: string;
  button: string;
  glow: string;
}> = {
  sky: {
    icon: 'bg-sky-500/10 text-sky-600 dark:text-sky-300',
    selected: 'border-sky-500/60 ring-2 ring-sky-500/20',
    pill: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
    button: 'bg-sky-600 hover:bg-sky-500',
    glow: 'shadow-sky-500/20',
  },
  teal: {
    icon: 'bg-teal-500/10 text-teal-600 dark:text-teal-300',
    selected: 'border-teal-500/60 ring-2 ring-teal-500/20',
    pill: 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
    button: 'bg-teal-600 hover:bg-teal-500',
    glow: 'shadow-teal-500/20',
  },
  blue: {
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-300',
    selected: 'border-blue-500/60 ring-2 ring-blue-500/20',
    pill: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
    button: 'bg-blue-600 hover:bg-blue-500',
    glow: 'shadow-blue-500/20',
  },
  indigo: {
    icon: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300',
    selected: 'border-indigo-500/60 ring-2 ring-indigo-500/20',
    pill: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
    button: 'bg-indigo-600 hover:bg-indigo-500',
    glow: 'shadow-indigo-500/20',
  },
  emerald: {
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
    selected: 'border-emerald-500/60 ring-2 ring-emerald-500/20',
    pill: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    button: 'bg-emerald-600 hover:bg-emerald-500',
    glow: 'shadow-emerald-500/20',
  },
  amber: {
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
    selected: 'border-amber-500/60 ring-2 ring-amber-500/20',
    pill: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    button: 'bg-amber-500 hover:bg-amber-400',
    glow: 'shadow-amber-500/20',
  },
  green: {
    icon: 'bg-green-500/10 text-green-600 dark:text-green-300',
    selected: 'border-green-500/60 ring-2 ring-green-500/20',
    pill: 'bg-green-500/10 text-green-700 dark:text-green-300',
    button: 'bg-green-600 hover:bg-green-500',
    glow: 'shadow-green-500/20',
  },
};

export const trialProducts: TrialProduct[] = [
  {
    slug: 'deepsguard360',
    name: 'DeepsGuard360',
    category: 'Security Operations',
    description: 'Guards, patrols, incidents, client visibility and service reporting in one workspace.',
    demoPath: '/deepsguard360/demo',
    icon: Shield,
    accent: 'sky',
  },
  {
    slug: 'deepscare360',
    name: 'DeepsCare360',
    category: 'Managed IT Support',
    description: 'Service desk, asset visibility and proactive IT operations for growing teams.',
    demoPath: '/deepscare360/demo',
    icon: Headset,
    accent: 'teal',
  },
  {
    slug: 'deepscomply360',
    name: 'DeepsComply360',
    category: 'Digital Compliance',
    description: 'Policies, evidence and audit readiness organised in a single compliance workspace.',
    demoPath: '/deepscomply360/demo',
    icon: ShieldCheck,
    accent: 'blue',
  },
  {
    slug: 'deepsflow',
    name: 'DeepsFlow',
    category: 'Cloud & Automation',
    description: 'Cloud operations and workflow automation without the operational sprawl.',
    demoPath: '/deepsflow/demo',
    icon: Cpu,
    accent: 'indigo',
  },
  {
    slug: 'deepsadvisory360',
    name: 'DeepsAdvisory360',
    category: 'ICT Advisory',
    description: 'Maturity assessment, prioritised roadmap and advisory reporting in one place.',
    demoPath: '/deepsadvisory360/demo',
    icon: FileSearch,
    accent: 'emerald',
  },
  {
    slug: 'deepsfin360',
    name: 'DeepsFin360',
    category: 'Financial Institutions',
    description: 'A practical finance workspace for lending, reporting and SME service delivery.',
    demoPath: '/deepsfin360/demo',
    icon: Landmark,
    accent: 'amber',
  },
  {
    slug: 'deepsfleet360',
    name: 'DeepsFleet360',
    category: 'Energy & Logistics',
    description: 'Fleet visibility, fuel, maintenance and driver intelligence for field operations.',
    demoPath: '/deepsfleet360/demo',
    icon: Truck,
    accent: 'green',
  },
  {
    slug: 'agritrace',
    name: 'AgriTrace',
    category: 'Agribusiness',
    description: 'Traceability, compliance and supply-chain visibility from farm to buyer.',
    demoPath: '/agritrace/demo',
    icon: Sprout,
    accent: 'emerald',
  },
];

export const getTrialProduct = (slug?: string | null): TrialProduct | undefined =>
  trialProducts.find((product) => product.slug === slug);
