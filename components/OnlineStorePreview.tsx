import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { storeItem } from './navbarData';

const OnlineStorePreview: React.FC = () => {
  const features = [
    "Secure PGK Payments",
    "Nationwide Delivery",
    "Business Hardware",
    "Digital Licensing"
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.02] dark:bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gray-50 dark:bg-white/2 rounded-[3rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Content Side */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-8 w-fit shadow-sm">
                <ShoppingBag className="w-3.5 h-3.5" />
                Now Open
              </div>

              <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Deeps Systems <span className="text-emerald-600">Online Store</span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-slate-300 mb-10 leading-relaxed font-medium">
                Direct access to the hardware and digital assets that power our BITC outcomes.
                Sourced for reliability, configured for performance.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-12">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href={storeItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit flex items-center gap-3 px-10 py-5 rounded-2xl quantum-gradient text-white font-bold text-lg relative btn-cta-pulse active-click shadow-xl shadow-emerald-500/20"
              >
                Shop Now <ArrowRight className="w-6 h-6" />
              </a>
            </div>

            {/* Visual Side */}
            <div className="relative bg-gray-100 dark:bg-white/5 p-8 md:p-16 flex items-center justify-center min-h-[400px]">
              <div className="relative z-10 w-full max-w-sm">
                <div className="bg-white dark:bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl space-y-6 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                   <div className="flex justify-between items-start">
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600">
                        <Zap className="w-8 h-8" />
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest mb-1">Price</p>
                         <p className="text-2xl font-bold text-gray-900 dark:text-white">K 1,299</p>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">BITC Access Hub</h4>
                      <p className="text-xs text-gray-600 dark:text-slate-400 font-medium leading-relaxed">
                        Pre-configured enterprise gateway for secure SME cloud connectivity.
                      </p>
                   </div>
                   <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <ShieldCheck className="w-4 h-4 text-blue-600" />
                         <span className="text-[10px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest">In Stock</span>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-white/5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest border border-gray-100 dark:border-white/10">
                        View Item
                      </div>
                   </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -z-10 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-white/5 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineStorePreview;
