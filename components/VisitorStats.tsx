import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

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

const VisitorStats: React.FC = () => {
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        // Record this visit, then read the aggregated stats.
        await fetch(getApiUrl('/api/visits'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ path: window.location.pathname }),
        });

        const res = await fetch(getApiUrl('/api/visits/stats'), {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`);

        const json = await res.json();
        if (!json || !Array.isArray(json.daily)) throw new Error('Malformed stats response');

        if (active) {
          setStats({
            today: Number(json.today) || 0,
            yesterday: Number(json.yesterday) || 0,
            thisWeek: Number(json.thisWeek) || 0,
            lastWeek: Number(json.lastWeek) || 0,
            daily: json.daily.map((n: unknown) => Number(n) || 0),
          });
        }
      } catch {
        // Static hosting / unreachable API: fail silently and hide the widget.
        if (active) setFailed(true);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  if (failed) return null;

  const points = stats ? buildPoints(stats.daily) : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/90 p-6 shadow-xl md:p-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
        {/* Sparkline */}
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

        {/* Stat columns */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-8">
          {STAT_COLUMNS.map(({ key, label }) => (
            <div key={key} className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="mt-1 text-2xl font-extrabold text-white md:text-3xl">
                {stats ? stats[key] : '—'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[11px] text-slate-500">Anonymous visit stats only.</p>
    </div>
  );
};

export default VisitorStats;
