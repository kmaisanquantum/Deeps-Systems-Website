import React from 'react';
import { ArrowRight, ChevronDown, Layers } from 'lucide-react';
import { iotConnectivityPath, iotLayers } from './iotData';

export const IotArchitecture: React.FC = () => (
  <div className="space-y-3">
    {iotLayers.map((layer, index) => {
      const Icon = layer.icon;
      return (
        <React.Fragment key={layer.number}>
          <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03] md:p-6">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500 to-blue-600 opacity-70" />
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex items-center gap-4 md:w-72 md:shrink-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">Layer {layer.number}</p>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{layer.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-slate-400">{layer.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-1">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
          {index < iotLayers.length - 1 && (
            <div className="flex justify-center py-1 text-emerald-500/70" aria-hidden="true">
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </React.Fragment>
      );
    })}
    <p className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs leading-relaxed text-gray-600 dark:border-blue-400/20 dark:text-slate-300">
      Satellite and gateway integration options are scoped per site and confirmed during solution design. Protocol and platform support varies by deployment; items described as planned are not yet offered as standard deployments.
    </p>
  </div>
);

export const IotConnectivityPath: React.FC = () => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
    {iotConnectivityPath.map((step, index) => {
      const Icon = step.icon;
      return (
        <React.Fragment key={step.title}>
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">0{index + 1}</span>
            </div>
            <h3 className="text-sm font-bold text-white">{step.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.description}</p>
            {index < iotConnectivityPath.length - 1 && (
              <ArrowRight className="absolute -right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-emerald-500/60 lg:block" aria-hidden="true" />
            )}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

export const IotLayerLegend: React.FC = () => (
  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
    <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
    Five-layer IoT architecture
  </div>
);
