import React, { useEffect, useState } from 'react';
import { Activity, MapPin } from 'lucide-react';
import { getApiUrl } from '../utils/api';

interface Visit {
  timestamp: string;
  path: string;
  location?: string | null;
}

interface VisitsData {
  total: number;
  recent: Visit[];
}

const timeAgo = (iso: string): string => {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days} d ago`;
};

const VISIT_FLAG = 'dg-visit-logged';

const VisitorsLog: React.FC = () => {
  const [data, setData] = useState<VisitsData | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        // Record one visit per browser session (not per mount/refresh).
        let alreadyLogged = false;
        try {
          alreadyLogged = Boolean(sessionStorage.getItem(VISIT_FLAG));
        } catch {
          alreadyLogged = false;
        }

        if (!alreadyLogged) {
          const postRes = await fetch(getApiUrl('/api/visits'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ path: window.location.pathname }),
          });
          if (postRes.ok) {
            try {
              sessionStorage.setItem(VISIT_FLAG, '1');
            } catch {
              // Ignore storage failures (e.g. private mode).
            }
          }
        }

        const res = await fetch(getApiUrl('/api/visits/recent'), {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) return;

        const json = await res.json();
        if (active && json && Array.isArray(json.recent)) {
          setData({
            total: typeof json.total === 'number' ? json.total : json.recent.length,
            recent: json.recent,
          });
        }
      } catch {
        // Fail silently — render nothing when the API is unreachable.
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  if (!data) return null;

  return (
    <section className="relative isolate overflow-hidden border-t border-sky-500/20 bg-gray-950 px-5 py-16 text-white md:px-6 md:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-300">
              <Activity className="h-3.5 w-3.5" /> Live on dspng.tech
            </div>
            <div className="ml-auto flex items-baseline gap-2">
              <span className="font-montserrat text-3xl font-extrabold text-white">{data.total}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">total visitors</span>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {data.recent.map((visit, index) => (
              <li
                key={`${visit.timestamp}-${index}`}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {timeAgo(visit.timestamp)}
                </span>
                <span className="truncate font-medium text-slate-200">{visit.path}</span>
                {visit.location && (
                  <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs font-bold text-sky-300">
                    <MapPin className="h-3 w-3" />
                    {visit.location}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[11px] text-slate-500">Anonymous visit stats only.</p>
        </div>
      </div>
    </section>
  );
};

export default VisitorsLog;
