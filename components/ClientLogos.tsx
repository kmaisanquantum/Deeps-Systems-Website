
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
    <section className="py-16 border-t border-b border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 opacity-60">
          Strategic Partners & Institutional Clients
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 group cursor-default opacity-40 hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0"
            >
              <div className="p-3 rounded-xl bg-slate-800/30 text-slate-400 group-hover:text-teal-400 group-hover:bg-teal-500/10 group-hover:scale-110 transition-all duration-500">
                {client.icon}
              </div>
              <div>
                <h4 className="font-montserrat font-extrabold text-sm tracking-wider text-slate-300 group-hover:text-white transition-colors">
                  {client.name.toUpperCase()}
                </h4>
                <p className="text-[10px] text-slate-600 font-medium group-hover:text-slate-400 transition-colors">
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
