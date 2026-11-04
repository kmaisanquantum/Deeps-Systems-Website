import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Compass, X } from 'lucide-react';

type TourStep = { target: string; title: string; description: string };

const steps: TourStep[] = [
  { target: 'discovery', title: 'Discover DeepsGuard360', description: 'Start with the product overview and the connected security operations workspace.' },
  { target: 'registration', title: 'Register a company', description: 'Walk through simulated business registration, admin setup, verification, and workspace creation.' },
  { target: 'subscription', title: 'Choose a subscription', description: 'Review the four plan tiers, usage limits, billing, and plan changes.' },
  { target: 'overview', title: 'Run daily operations', description: 'See the company dashboard with workforce, site, patrol, incident, and performance indicators.' },
  { target: 'guards', title: 'Manage guard profiles', description: 'Explore employee IDs, site assignments, documents, and the optional demo photo upload.' },
  { target: 'workforce', title: 'Schedule shifts', description: 'Review rosters, shift assignments, attendance, and leave in a sample weekly schedule.' },
  { target: 'mobile', title: 'Follow the guard mobile workflow', description: 'Try clock-in, patrol, checkpoint, incident, control-room, and offline-sync interactions in the phone mockup.' },
  { target: 'map', title: 'View GPS and patrol activity', description: 'The map uses fictional guard and vehicle locations, routes, and checkpoint alerts.' },
  { target: 'control', title: 'Respond from the control room', description: 'Review the simulated attempted break-in alert at Commercial Site A, assign a response, and update status.' },
  { target: 'cctv', title: 'Review camera status', description: 'All camera feed panels are placeholders labeled as simulated—not live CCTV.' },
  { target: 'incidents', title: 'Track incident resolution', description: 'See incident classification, severity, assignment, notes, and status history.' },
  { target: 'client', title: 'Share a restricted client portal', description: 'Clients see only their assigned sites, attendance, incidents, and reports.' },
  { target: 'reports', title: 'Use reports and analytics', description: 'Download sample report data or use print-to-PDF. No real company data is used.' },
  { target: 'master', title: 'Manage multiple isolated companies', description: 'Finish in the platform owner view to compare the three fictional tenants and their separate workspaces.' },
];

const DeepsGuard360Tour: React.FC = () => {
  const location = useLocation();
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const closeTour = () => setStepIndex(null);
  const goTo = (index: number) => {
    setStepIndex(index);
    const section = document.getElementById(steps[index].target);
    section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/deepsguard360/demo')) {
      setStepIndex(null);
      return;
    }
    if (stepIndex === null) return;
    const section = document.getElementById(steps[stepIndex].target);
    if (!section) return;
    const previous = {
      outline: section.style.outline,
      outlineOffset: section.style.outlineOffset,
      position: section.style.position,
      zIndex: section.style.zIndex,
      borderRadius: section.style.borderRadius,
    };
    section.style.outline = '3px solid #10b981';
    section.style.outlineOffset = '6px';
    section.style.position = 'relative';
    section.style.zIndex = '71';
    section.style.borderRadius = '1rem';
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return () => {
      section.style.outline = previous.outline;
      section.style.outlineOffset = previous.outlineOffset;
      section.style.position = previous.position;
      section.style.zIndex = previous.zIndex;
      section.style.borderRadius = previous.borderRadius;
    };
  }, [location.pathname, stepIndex]);

  if (!location.pathname.startsWith('/deepsguard360/demo')) return null;

  return <>
    {stepIndex === null ? (
      <button onClick={() => goTo(0)} className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-950/25 transition hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300" aria-label="Start the DeepsGuard360 guided tour">
        <Compass className="h-4 w-4" /> Take the guided tour
      </button>
    ) : <>
      <div className="pointer-events-none fixed inset-0 z-[65] bg-slate-950/25" aria-hidden="true" />
      <section className="fixed bottom-4 left-4 right-4 z-[80] mx-auto max-w-2xl rounded-2xl border border-emerald-500/30 bg-white p-4 shadow-2xl dark:bg-slate-900 sm:bottom-6 sm:p-5" role="dialog" aria-modal="false" aria-labelledby="deepsguard-tour-title" aria-live="polite">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0"><div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-emerald-600"><Compass className="h-3.5 w-3.5"/> Guided product tour <span className="text-slate-400">· {stepIndex + 1} of {steps.length}</span></div><h2 id="deepsguard-tour-title" className="text-lg font-extrabold text-slate-900 dark:text-white">{steps[stepIndex].title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{steps[stepIndex].description}</p></div>
          <button onClick={closeTour} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Exit guided tour"><X className="h-4 w-4"/></button>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}/></div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><button onClick={closeTour} className="text-xs font-semibold text-slate-500 hover:text-emerald-700">Exit tour · free roam</button><div className="flex gap-2">{stepIndex > 0 && <button onClick={() => goTo(stepIndex - 1)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold dark:border-white/10"><ArrowLeft className="h-3.5 w-3.5"/> Back</button>}<button onClick={() => stepIndex === steps.length - 1 ? closeTour() : goTo(stepIndex + 1)} className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500">{stepIndex === steps.length - 1 ? 'Finish tour' : 'Next'}{stepIndex !== steps.length - 1 && <ArrowRight className="h-3.5 w-3.5"/>}</button></div></div>
      </section>
    </>}
  </>;
};

export default DeepsGuard360Tour;
