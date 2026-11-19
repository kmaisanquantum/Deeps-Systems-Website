import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { CheckCircle2, Loader2, LogOut, Mail } from 'lucide-react';
import { getApiUrl } from '../utils/api';

/**
 * Shared email trial sign-in (magic link) helpers for the platform demos.
 *
 * - Optional and anonymous-friendly: visitors can keep using the demo with
 *   localStorage only. Signing in adds server-side workspace persistence so
 *   their trial data follows them across devices.
 * - Session state is held in a tiny module-level store keyed by platform so the
 *   header badge and the sign-in panel stay in sync without prop drilling.
 */

type Session = { email: string | null; token: string | null };

const EMPTY_SESSION: Session = { email: null, token: null };
const sessions = new Map<string, Session>();
const listeners = new Map<string, Set<() => void>>();

function getSession(platform: string): Session {
  return sessions.get(platform) ?? EMPTY_SESSION;
}

function setSession(platform: string, session: Session) {
  sessions.set(platform, session);
  const set = listeners.get(platform);
  if (set) set.forEach(listener => listener());
}

function subscribeSession(platform: string, cb: () => void): () => void {
  const set = listeners.get(platform) ?? new Set<() => void>();
  set.add(cb);
  listeners.set(platform, set);
  return () => {
    set.delete(cb);
  };
}

function tokenStorageKey(platform: string): string {
  return `trial-token-${platform}`;
}

/** Subscribe to the trial session for a platform. */
export function useTrialSession(platform: string): Session {
  return useSyncExternalStore(
    useCallback((cb: () => void) => subscribeSession(platform, cb), [platform]),
    useCallback(() => getSession(platform), [platform]),
  );
}

type BootstrapArgs = {
  platform: string;
  onRemoteState: (remote: unknown) => void;
};

/**
 * On mount: pick up and verify a `?token=` from the URL (or a remembered token),
 * then hydrate the server-side workspace. Invalid tokens are cleared silently.
 */
function useTrialBootstrap({ platform, onRemoteState }: BootstrapArgs) {
  const onRemoteRef = useRef(onRemoteState);
  onRemoteRef.current = onRemoteState;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;

    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');
      const storedToken = window.localStorage.getItem(tokenStorageKey(platform));
      const token = urlToken || storedToken || '';
      if (!token) return;

      if (urlToken) {
        // Keep the token out of the address bar / history.
        params.delete('token');
        const query = params.toString();
        window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
      }

      try {
        const verifyRes = await fetch(getApiUrl(`/api/trial/verify?token=${encodeURIComponent(token)}`));
        if (!verifyRes.ok) throw new Error('Unable to verify trial token.');
        const identity = await verifyRes.json();
        if (cancelled) return;
        setSession(platform, { email: identity.email, token });
        window.localStorage.setItem(tokenStorageKey(platform), token);

        const wsRes = await fetch(getApiUrl('/api/trial/workspace'), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (wsRes.ok) {
          const body = await wsRes.json();
          if (!cancelled && body && body.state) onRemoteRef.current(body.state);
        }
      } catch {
        if (cancelled) return;
        setSession(platform, EMPTY_SESSION);
        window.localStorage.removeItem(tokenStorageKey(platform));
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [platform]);
}

/** Debounce-save the demo state to the server while signed in. */
function useTrialWorkspaceSync(platform: string, state: unknown) {
  const session = useTrialSession(platform);
  const sentRef = useRef<string>('');

  useEffect(() => {
    if (!session.token) return;
    let payload: string;
    try {
      payload = JSON.stringify(state);
    } catch {
      return;
    }
    if (payload === sentRef.current) return;

    const timer = window.setTimeout(() => {
      sentRef.current = payload;
      fetch(getApiUrl('/api/trial/workspace'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ state }),
      }).catch(() => {});
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [platform, state, session.token]);
}

type TrialSignInProps = {
  platform: string;
  state: unknown;
  onRemoteState: (remote: unknown) => void;
};

/**
 * "Sign in with email" panel. Place at the top of a demo's registration section.
 * Owns the bootstrap + cross-device workspace sync for that demo.
 */
export const TrialSignInPanel: React.FC<TrialSignInProps> = ({ platform, state, onRemoteState }) => {
  useTrialBootstrap({ platform, onRemoteState });
  useTrialWorkspaceSync(platform, state);
  const session = useTrialSession(platform);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const requestLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch(getApiUrl('/api/trial/request'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), platform }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Could not send the sign-in link.');
      }
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send the sign-in link.');
    }
  };

  const signOut = () => {
    setSession(platform, EMPTY_SESSION);
    window.localStorage.removeItem(tokenStorageKey(platform));
  };

  const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-900';

  return (
    <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
      {session.email ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Signed in as {session.email} · Trial — your workspace syncs across devices.
          </p>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-500/30 dark:bg-slate-900 dark:text-emerald-300">
            <LogOut className="h-3.5 w-3.5" />Sign out
          </button>
        </div>
      ) : (
        <form onSubmit={requestLink} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1">
            <span className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">Sign in with email</span>
            <span className="relative block">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={event => { setEmail(event.target.value); if (status !== 'idle') setStatus('idle'); }}
                placeholder="you@company.com"
                className={`${inputClass} pl-9`}
              />
            </span>
          </label>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Send sign-in link
          </button>
          {status === 'sent' && <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 sm:self-center">Check your inbox — we sent a sign-in link to {email}.</p>}
          {status === 'error' && error && <p className="text-xs font-semibold text-red-600 sm:self-center">{error}</p>}
        </form>
      )}
    </div>
  );
};

/** Small "Signed in as {email} · Trial" badge for the demo header. */
export const TrialBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const session = useTrialSession(platform);
  if (!session.email) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
      Signed in as {session.email} · Trial
    </span>
  );
};
