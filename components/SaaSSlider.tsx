import React from 'react';
import {
  Building2,
  ShoppingBag,
  Store,
  CreditCard,
  Activity,
  Truck,
  ShieldCheck,
  Wallet,
  Monitor,
  ExternalLink
} from 'lucide-react';

const saasSystems = [
  {
    name: "PNG Property",
    desc: "PNG'S FIRST Real Estate INTELLIGENCE PLATFORM. Aggregated listings from Hausples, Professionals, Ray White, Century 21 & Facebook.",
    url: "https://property.dspng.tech",
    icon: <Building2 className="w-6 h-6" />,
    color: "text-blue-400"
  },
  {
    name: "Unity Mall",
    desc: "Unity Mall SME center. The digital marketplace for PNG's finest local vendors and artisans.",
    url: "https://unity.dspng.tech",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "text-green-400"
  },
  {
    name: "Garden City",
    desc: "Garden City SME. The digital marketplace for PNG's finest local vendors and artisans.",
    url: "https://gc.dspng.tech",
    icon: <Store className="w-6 h-6" />,
    color: "text-emerald-400"
  },
  {
    name: "Kingsmen Finance",
    desc: "Underwriting & Loan Management System. Port Moresby, PNG Est. 2026 · Digital Lending.",
    url: "https://kingsmen.dspng.tech",
    icon: <CreditCard className="w-6 h-6" />,
    color: "text-amber-400"
  },
  {
    name: "Helt",
    desc: "A remote medical triage portal for rural PNG.",
    url: "https://helt.dspng.tech",
    icon: <Activity className="w-6 h-6" />,
    color: "text-red-400"
  },
  {
    name: "Maket",
    desc: "A lightweight logistics and market-price portal for PNG farmers.",
    url: "https://maket.dspng.tech",
    icon: <Truck className="w-6 h-6" />,
    color: "text-orange-400"
  },
  {
    name: "Trust",
    desc: "A verified e-commerce marketplace for Papua New Guinea.",
    url: "https://trust.dspng.tech",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "text-indigo-400"
  },
  {
    name: "Pe",
    desc: "A micro-payment and credit-scoring app for PNG SMEs.",
    url: "https://pe.dspng.tech",
    icon: <Wallet className="w-6 h-6" />,
    color: "text-yellow-400"
  },
  {
    name: "RBM",
    desc: "A reserve business monitoring tool to help SMEs and business in PNG.",
    url: "https://rbm.dspng.tech",
    icon: <Monitor className="w-6 h-6" />,
    color: "text-cyan-400"
  }
];

const SaaSSlider: React.FC = () => {
  // Triple the list for an infinite feeling scroll
  const extendedSystems = [...saasSystems, ...saasSystems, ...saasSystems];

  return (
    <section className="py-12 bg-black/40 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
         <div>
            <h3 className="text-[10px] font-bold text-green-400 uppercase tracking-[0.4em] mb-2">Ecosystem</h3>
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-white leading-tight">Live <span className="quantum-text-gradient">BITC</span> Platforms</h2>
         </div>
         <p className="text-slate-500 text-xs font-medium max-w-xs">
            Deploying industrial-grade SaaS outcomes across PNG's real estate, finance, and SME sectors.
         </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-scroll whitespace-nowrap py-4">
          {extendedSystems.map((system, idx) => (
            <a
              key={idx}
              href={system.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col w-72 md:w-80 mx-4 p-6 glass rounded-[2rem] border border-white/5 hover:border-green-500/30 transition-all duration-500 group/card active-click whitespace-normal"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-white/5 ${system.color} group-hover/card:scale-110 group-hover/card:bg-white/10 transition-all duration-500`}>
                  {system.icon}
                </div>
                <div className="p-2 rounded-lg bg-white/5 group-hover/card:bg-green-500/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover/card:text-green-400 transition-colors" />
                </div>
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover/card:text-green-400 transition-colors">{system.name}</h4>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                {system.desc}
              </p>
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        }
      `}} />
    </section>
  );
};

export default SaaSSlider;
