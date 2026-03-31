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
    <section id="gap" className="py-16 md:py-24 bg-rose-50/50 dark:bg-rose-900/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-12 md:mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-gray-900 dark:text-white leading-tight">The Competitive Gap</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base font-medium">Why Deeps Systems is the agile alternative to traditional hardware incumbents.</p>
        </div>

        <div className="bg-white dark:bg-white/2 rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl max-w-4xl mx-auto transition-all duration-500">
          <div className="grid grid-cols-3 bg-gray-900 p-4 md:p-8 font-bold text-xs md:text-lg border-b border-gray-800 uppercase tracking-widest md:normal-case">
            <div className="text-gray-400">Capability</div>
            <div className="text-rose-500">Deeps</div>
            <div className="text-gray-600">Legacy</div>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-white/5">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-4 md:p-8 items-center group hover:bg-rose-50 dark:hover:bg-rose-500/5 transition-all duration-300 cursor-default">
                <div className="text-gray-600 dark:text-slate-300 font-medium text-[10px] sm:text-sm md:text-base pr-2">{row.feature}</div>
                <div className="flex items-center gap-1.5 md:gap-2 text-gray-900 dark:text-white font-semibold text-[10px] sm:text-sm md:text-base">
                  <CheckCircle2 className="shrink-0 w-3.5 h-3.5 md:w-5 md:h-5 text-rose-600" />
                  <span className="truncate">{row.deeps}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-gray-400 dark:text-slate-500 italic text-[10px] sm:text-sm md:text-base">
                  <XCircle className="shrink-0 w-3.5 h-3.5 md:w-5 md:h-5 text-gray-300 dark:text-slate-600" />
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
