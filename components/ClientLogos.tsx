import React from 'react';
import { Building2, Ship, TreePine } from 'lucide-react';

const ClientLogos: React.FC = () => {
  const clients = [
    {
      name: "PNG Finance Group",
      icon: <Building2 className="w-8 h-8" />,
      sub: "Banking & Securities"
    },
    {
      name: "Pacific Logistics",
      icon: <Ship className="w-8 h-8" />,
      sub: "Maritime Excellence"
    },
    {
      name: "Highlands Ag-Tech",
      icon: <TreePine className="w-8 h-8" />,
      sub: "Sustainable Agriculture"
    }
  ];

  return (
    <section className="py-16 border-t border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 opacity-60">
          Strategic Partners & Institutional Clients
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 group cursor-default opacity-40 hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0"
            >
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/30 text-gray-600 dark:text-slate-300 group-hover:text-emerald-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all duration-500 shadow-sm">
                {client.icon}
              </div>
              <div>
                <h4 className="font-montserrat font-extrabold text-sm tracking-wider text-gray-600 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {client.name.toUpperCase()}
                </h4>
                <p className="text-[10px] text-gray-600 dark:text-slate-600 font-medium group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors">
                  {client.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
