import React from 'react';
import {
  Landmark,
  Truck,
  Sprout,
  Rocket,
  Cloud,
  Zap,
  Smartphone,
  ShoppingBag,
  ShieldCheck,
  Cpu,
  Headset,
  FileSearch,
  Shield,
  Lightbulb,
  Building2,
  Store,
  CreditCard,
  Activity,
  Wallet,
  Monitor,
  LifeBuoy
} from 'lucide-react';

export const servicesItems = [
  { name: 'Managed IT Support', icon: React.createElement(Headset, { className: "w-5 h-5" }), href: '/solutions#details-managed-it', desc: 'Proactive operational uptime.' },
  { name: 'Digital Compliance', icon: React.createElement(ShieldCheck, { className: "w-5 h-5" }), href: '/solutions#details-compliance', desc: 'Secure data protection.' },
  { name: 'Cloud & Automation', icon: React.createElement(Cpu, { className: "w-5 h-5" }), href: '/solutions#details-automation', desc: 'Streamlined digital workflows.' },
  { name: 'ICT Advisory', icon: React.createElement(FileSearch, { className: "w-5 h-5" }), href: '/solutions#details-advisory', desc: 'Strategic technology roadmaps.' },
  { name: 'Financial Institutions', icon: React.createElement(Landmark, { className: "w-5 h-5" }), href: '/solutions#details-financial', desc: 'SME-in-a-Box SaaS solutions.' },
  { name: 'Energy & Logistics', icon: React.createElement(Truck, { className: "w-5 h-5" }), href: '/solutions#details-logistics', desc: 'Quantum-inspired pathfinding.' },
  { name: 'Agribusiness', icon: React.createElement(Sprout, { className: "w-5 h-5" }), href: '/solutions#details-agribusiness', desc: 'Traceability-as-a-Service.' },
  { name: 'Advanced Suite', icon: React.createElement(Rocket, { className: "w-5 h-5" }), href: '/solutions#advanced-solutions', desc: 'Disruptive BITC SaaS outcomes.' },
];

export const shopItems = [
  { name: 'Microsoft Office', icon: React.createElement(Monitor, { className: "w-5 h-5" }), href: '/shop#shop-microsoft', desc: 'Microsoft 365 licensing (reseller).' },
  { name: 'Starlink Kits', icon: React.createElement(Rocket, { className: "w-5 h-5" }), href: '/shop#shop-starlink', desc: 'Satellite internet hardware (reseller).' },
];

export const advantageItems = [
  { name: 'Infrastructure', icon: React.createElement(Cloud, { className: "w-5 h-5" }), href: '/advantage#adv-infra', desc: 'Zero legacy physical burden.' },
  { name: 'Scalability', icon: React.createElement(Zap, { className: "w-5 h-5" }), href: '/advantage#adv-scale', desc: 'Elastic cloud power.' },
  { name: 'Resilience', icon: React.createElement(Smartphone, { className: "w-5 h-5" }), href: '/advantage#adv-resilience', desc: 'Mobile-first design.' },
];

export const ecosystemItems = [
  { name: 'PNG Property', icon: React.createElement(Building2, { className: "w-5 h-5 text-blue-600" }), href: 'https://property.dspng.tech', desc: 'Real estate market intelligence.' },
  { name: 'Unity Mall', icon: React.createElement(ShoppingBag, { className: "w-5 h-5 text-emerald-600" }), href: 'https://unity.dspng.tech', desc: 'Digital SME marketplace.' },
  { name: 'Garden City', icon: React.createElement(Store, { className: "w-5 h-5 text-emerald-600" }), href: 'https://gc.dspng.tech', desc: 'Local vendor center.' },
  { name: 'Kingsmen Finance', icon: React.createElement(CreditCard, { className: "w-5 h-5 text-amber-600" }), href: 'https://kingsmen.dspng.tech', desc: 'Digital lending platform.' },
  { name: 'Helt', icon: React.createElement(Activity, { className: "w-5 h-5 text-blue-600" }), href: 'https://helt.dspng.tech', desc: 'Remote medical triage.' },
  { name: 'Trust Marketplace', icon: React.createElement(ShieldCheck, { className: "w-5 h-5 text-blue-600" }), href: 'https://trust.dspng.tech', desc: 'Verified PNG e-commerce.' },
  { name: 'Maket', icon: React.createElement(Truck, { className: "w-5 h-5 text-amber-600" }), href: 'https://maket.dspng.tech', desc: 'SME logistics & agricultural market prices.' },
  { name: 'Pe', icon: React.createElement(Wallet, { className: "w-5 h-5 text-amber-600" }), href: 'https://pe.dspng.tech', desc: 'Micro-payment & credit scoring.' },
  { name: 'RBM', icon: React.createElement(Monitor, { className: "w-5 h-5 text-blue-600" }), href: 'https://rbm.dspng.tech', desc: 'Reserve business monitoring.' },
];

export const storeItem = {
  name: 'Our Online Store',
  icon: React.createElement(ShoppingBag, { className: "w-5 h-5" }),
  href: '/shop',
  desc: 'Shop for BITC optimization tools and sachet services.'
};
