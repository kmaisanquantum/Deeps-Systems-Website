import React from 'react';
import { Landmark, Truck, Sprout, Rocket, Cloud, Zap, Smartphone, ShoppingBag } from 'lucide-react';

export const servicesItems = [
  { name: 'Financial Institutions', icon: React.createElement(Landmark, { className: "w-5 h-5" }), href: '#details-financial', desc: 'SME-in-a-Box SaaS solutions.' },
  { name: 'Energy & Logistics', icon: React.createElement(Truck, { className: "w-5 h-5" }), href: '#details-logistics', desc: 'Quantum-inspired pathfinding.' },
  { name: 'Agribusiness', icon: React.createElement(Sprout, { className: "w-5 h-5" }), href: '#details-agribusiness', desc: 'Traceability-as-a-Service.' },
  { name: 'Advanced Suite', icon: React.createElement(Rocket, { className: "w-5 h-5" }), href: '#advanced-solutions', desc: 'Disruptive BITC SaaS outcomes.' },
];

export const advantageItems = [
  { name: 'Infrastructure', icon: React.createElement(Cloud, { className: "w-5 h-5" }), href: '#advantages', desc: 'Zero legacy physical burden.' },
  { name: 'Scalability', icon: React.createElement(Zap, { className: "w-5 h-5" }), href: '#advantages', desc: 'Elastic cloud power.' },
  { name: 'Resilience', icon: React.createElement(Smartphone, { className: "w-5 h-5" }), href: '#advantages', desc: 'Mobile-first design.' },
];

export const storeItem = {
  name: 'Our Online Store',
  icon: React.createElement(ShoppingBag, { className: "w-5 h-5" }),
  href: '#online-store',
  desc: 'Shop for BITC optimization tools and hardware.'
};
