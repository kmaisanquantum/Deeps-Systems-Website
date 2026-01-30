import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const Comparison: React.FC = () => {
  const comparisons = [
    { feature: "Business Model", deeps: "Outcome-driven", legacy: "Hardware-driven" },
    { feature: "Initial Capex", deeps: "Zero (BITC)", legacy: "High (Server Room)" },
    { feature: "Deployment", deeps: "Days/Weeks", legacy: "Months (Latent)" },
    { feature: "Resilience", deeps: "Geo-Redundant", legacy: "Single Point" },
    { feature: "Updates", deeps: "Automatic", legacy: "Manual/Downtime" },
  ];

  return (
    <section id="gap" className="py-16 md:py-24 bg-teal-900/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-12 md:mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">The Competitive Gap</h2>
          <p className="text-slate-400 text-sm md:text-base">Why Deeps Systems is the agile alternative to traditional hardware incumbents.</p>
        </div>

        <div className="glass rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-4xl mx-auto transition-all duration-500">
          <div className="grid grid-cols-3 bg-slate-900/80 p-4 md:p-8 font-bold text-xs md:text-lg border-b border-white/10 uppercase tracking-widest md:normal-case">
            <div className="text-slate-400">Capability</div>
            <div className="text-teal-400">Deeps</div>
            <div className="text-slate-500">Legacy</div>
          </div>
          <div className="divide-y divide-white/5">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 md:p-8 items-center group hover:bg-teal-500/5 transition-all duration-300 cursor-default">
                <div className="text-slate-300 font-medium text-[10px] sm:text-sm md:text-base pr-2">{row.feature}</div>
                <div className="flex items-center gap-1.5 md:gap-2 text-white font-semibold text-[10px] sm:text-sm md:text-base">
                  <CheckCircle2 className="shrink-0 w-3.5 h-3.5 md:w-5 md:h-5 text-teal-400" />
                  <span className="truncate">{row.deeps}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-slate-500 italic text-[10px] sm:text-sm md:text-base">
                  <XCircle className="shrink-0 w-3.5 h-3.5 md:w-5 md:h-5 text-slate-600" />
                  <span className="truncate">{row.legacy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;