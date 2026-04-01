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
    desc: "a data aggregation and market intelligence tool designed specifically for the Papua New Guinea (PNG) real estate market",
    url: "https://property.dspng.tech",
    icon: <Building2 className="w-6 h-6" />,
    color: "text-blue-600"
  },
  {
    name: "Unity Mall",
    desc: "Unity Mall SME center. The digital marketplace for PNG's finest local vendors and artisans.",
    url: "https://unity.dspng.tech",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "text-emerald-600"
  },
  {
    name: "Garden City",
    desc: "Garden City SME. The digital marketplace for PNG's finest local vendors and artisans.",
    url: "https://gc.dspng.tech",
    icon: <Store className="w-6 h-6" />,
    color: "text-emerald-600"
  },
  {
    name: "Kingsmen Finance",
    desc: "Underwriting & Loan Management System. Port Moresby, PNG Est. 2026 · Digital Lending.",
    url: "https://kingsmen.dspng.tech",
    icon: <CreditCard className="w-6 h-6" />,
    color: "text-amber-600"
  },
  {
    name: "Helt",
    desc: "A remote medical triage portal for rural PNG.",
    url: "https://helt.dspng.tech",
    icon: <Activity className="w-6 h-6" />,
    color: "text-blue-600"
  },
  {
    name: "Maket",
    desc: "A lightweight logistics and market-price portal for PNG farmers.",
    url: "https://maket.dspng.tech",
    icon: <Truck className="w-6 h-6" />,
    color: "text-amber-600"
  },
  {
    name: "Trust",
    desc: "A verified e-commerce marketplace for Papua New Guinea.",
    url: "https://trust.dspng.tech",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "text-blue-600"
  },
  {
    name: "Pe",
    desc: "A micro-payment and credit-scoring app for PNG SMEs.",
    url: "https://pe.dspng.tech",
    icon: <Wallet className="w-6 h-6" />,
    color: "text-amber-600"
  },
  {
    name: "RBM",
    desc: "A reserve business monitoring tool to help SMEs and business in PNG.",
    url: "https://rbm.dspng.tech",
    icon: <Monitor className="w-6 h-6" />,
    color: "text-blue-600"
  }
];

const SaaSSlider: React.FC = () => {
  // Triple the list for an infinite feeling scroll
  const extendedSystems = [...saasSystems, ...saasSystems, ...saasSystems];

  return (
    <section className="py-12 bg-gray-50/50 dark:bg-black/40 border-y border-gray-100 dark:border-white/5 overflow-hidden reveal-active relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/[0.02] dark:bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
         <div>
            <h3 className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] mb-2">Ecosystem</h3>
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-900 dark:text-white leading-tight">Live <span className="quantum-text-gradient">BITC</span> Platforms</h2>
         </div>
         <p className="text-gray-600 dark:text-slate-400 text-xs font-medium max-w-xs">
            Deploying high-performance SaaS outcomes across PNG's real estate, finance, and SME sectors.
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
              className="inline-flex flex-col w-72 md:w-80 mx-4 p-6 bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500 group/card active-click whitespace-normal shadow-sm hover:shadow-md hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-gray-50 dark:bg-white/5 ${system.color} group-hover/card:scale-110 group-hover/card:bg-gray-100 dark:group-hover/card:bg-white/10 transition-all animate-icon-float animate-icon-pulse duration-500`}>
                  {system.icon}
                </div>
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 group-hover/card:bg-emerald-50 dark:group-hover/card:bg-emerald-500/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-600 dark:text-slate-600 group-hover/card:text-emerald-600 transition-colors" />
                </div>
              </div>
              <h4 className="text-gray-900 dark:text-white font-bold text-base mb-2 group-hover/card:text-emerald-600 transition-colors"><span className="inline-flex items-center gap-1.5"><span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>{system.name}</span></h4>
              <p className="text-gray-600 dark:text-slate-400 text-xs font-medium leading-relaxed">
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
          animation-duration: 180s;
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
