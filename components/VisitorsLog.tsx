import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
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

interface VisitStats {
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  daily: number[];
}

// Sparkline geometry (viewBox units).
const SPARK_W = 240;
const SPARK_H = 64;
const PAD_X = 6;
const PAD_Y = 6;

const buildPoints = (daily: number[]): { x: number; y: number }[] => {
  if (!daily.length) return [];
  const max = Math.max(...daily, 1);
  const innerW = SPARK_W - PAD_X * 2;
  const innerH = SPARK_H - PAD_Y * 2;
  return daily.map((value, index) => ({
    x: PAD_X + (daily.length === 1 ? innerW / 2 : (index / (daily.length - 1)) * innerW),
    y: PAD_Y + innerH - (value / max) * innerH,
  }));
};

const STAT_COLUMNS: { key: keyof Omit<VisitStats, 'daily'>; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'thisWeek', label: 'This week' },
  { key: 'lastWeek', label: 'Last week' },
];

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
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      // Record one visit per browser session (not per mount/refresh).
      let alreadyLogged = false;
      try {
        alreadyLogged = Boolean(sessionStorage.getItem(VISIT_FLAG));
      } catch {
        alreadyLogged = false;
      }

      if (!alreadyLogged) {
        try {
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
        } catch {
          // Ignore POST failures — still try to read the stats below.
        }
      }

      // Recent visits + total (required to render the card).
      try {
        const res = await fetch(getApiUrl('/api/visits/recent'), {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`);

        const json = await res.json();
        if (!json || !Array.isArray(json.recent)) throw new Error('Malformed response');

        if (active) {
          setData({
            total: typeof json.total === 'number' ? json.total : json.recent.length,
            recent: json.recent,
          });
        }
      } catch {
        // Fail silently — render nothing when the API is unreachable.
        if (active) setFailed(true);
        return;
      }

      // Aggregated stats (optional — falls back to dashes if unavailable).
      try {
        const res = await fetch(getApiUrl('/api/visits/stats'), {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) return;

        const json = await res.json();
        if (active && json && Array.isArray(json.daily)) {
          setStats({
            today: Number(json.today) || 0,
            yesterday: Number(json.yesterday) || 0,
            thisWeek: Number(json.thisWeek) || 0,
            lastWeek: Number(json.lastWeek) || 0,
            daily: json.daily.map((n: unknown) => Number(n) || 0),
          });
        }
      } catch {
        // Stats unavailable — keep the dashes placeholder.
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  if (failed || !data) return null;

  const points = stats ? buildPoints(stats.daily) : [];
  const recentVisits = data.recent.slice(0, 3);

  return (
    <section className="relative isolate overflow-hidden border-t border-sky-500/20 bg-gray-950 px-5 py-16 text-white md:px-6 md:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          {/* Header: pill + total visitors */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-300">
              <Activity className="h-3.5 w-3.5" /> Live on dspng.tech
            </div>
            <div className="ml-auto flex items-baseline gap-2">
              <span className="font-montserrat text-3xl font-extrabold text-white">{data.total}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">total visitors</span>
            </div>
          </div>

          {/* Middle: sparkline + counters */}
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
            <div className="min-w-0 md:flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Traffic · last 14 days</p>
              <svg
                viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
                className="mt-3 h-16 w-full text-emerald-400"
                preserveAspectRatio="none"
                role="img"
                aria-label="Daily visit sparkline"
              >
                {points.length > 0 ? (
                  <>
                    <polyline
                      points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {points.map((p, index) => (
                      <circle key={index} cx={p.x} cy={p.y} r="2.5" fill="currentColor" />
                    ))}
                  </>
                ) : (
                  <line
                    x1={PAD_X}
                    y1={SPARK_H - PAD_Y}
                    x2={SPARK_W - PAD_X}
                    y2={SPARK_H - PAD_Y}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="text-slate-600"
                  />
                )}
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
              {STAT_COLUMNS.map(({ key, label }) => (
                <div key={key} className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
                  <p className="mt-1 text-2xl font-extrabold text-white">
                    {stats ? stats[key] : '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: compact recent visits */}
          {recentVisits.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <span className="font-bold uppercase tracking-widest text-slate-500">Recent:</span>
              {recentVisits.map((visit, index) => (
                <span
                  key={`${visit.timestamp}-${index}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-2.5 py-1 font-medium text-slate-300"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {timeAgo(visit.timestamp)} · {visit.path}
                </span>
              ))}
            </div>
          )}

          <p className="mt-6 text-[11px] text-slate-500">Anonymous visit stats only.</p>
        </div>
      </div>
    </section>
  );
};

export default VisitorsLog;
