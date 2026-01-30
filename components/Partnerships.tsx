import React from 'react';
import { Globe } from 'lucide-react';

const Partnerships: React.FC = () => {
  const partners = [
    {
      name: "Nebula Cloud",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-current">
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" className="text-teal-500/30" />
          <path d="M12 3v18M3 12h18" strokeWidth="1.5" className="text-blue-500" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="currentColor" className="text-teal-400" />
        </svg>
      )
    },
    {
      name: "Q-Labs Research",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-current">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" strokeWidth="1.5" className="text-teal-400" />
          <path d="M12 22V12m0 0l9-5m-9 5L3 7" strokeWidth="1.5" className="text-blue-500/50" />
          <circle cx="12" cy="12" r="2" fill="currentColor" className="text-white" />
        </svg>
      )
    },
    {
      name: "Vertex FinTech",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-current">
          <path d="M4 20h16M7 14l3-3 4 4 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400" />
          <path d="M15 6h4v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500" />
        </svg>
      )
    },
    {
      name: "OmniLogistics",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-current">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="1.5" className="text-teal-500" />
          <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="1.5" className="text-blue-500" />
          <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="1.5" className="text-blue-500" />
          <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="1.5" className="text-teal-500" />
          <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" strokeWidth="1" className="text-white/20" />
        </svg>
      )
    }
  ];

  return (
    <section id="partners" className="py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex p-4 rounded-2xl glass mb-8 hover:scale-110 transition-transform duration-500 group">
          <Globe className="w-12 h-12 text-blue-400 group-hover:rotate-45 transition-transform duration-700" />
        </div>
        <div className="reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">Global Partnership. <span className="quantum-text-gradient">Local Muscle.</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
            We bridge the gap by bringing international technology partnerships and world-class quantum algorithms to solve localized challenges in Papua New Guinea.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, i) => (
            <div 
              key={i} 
              className="glass h-40 flex flex-col items-center justify-center rounded-2xl p-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105 hover:border-teal-500/30 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-teal-500/10"
            >
              <div className="mb-4 transform group-hover:rotate-12 transition-transform duration-500">
                {partner.logo}
              </div>
              <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-slate-400 group-hover:text-white transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;