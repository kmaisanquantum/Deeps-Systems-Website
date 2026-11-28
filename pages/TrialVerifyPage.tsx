import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';
import Seo from '../components/Seo';
import { getTrialProduct } from '../components/trial/trialData';
import { verifyTrial } from '../utils/trialApi';
import type { TrialRecord } from '../utils/trialApi';

const TrialVerifyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [trial, setTrial] = useState<TrialRecord | null>(null);
  const [error, setError] = useState('');
  const lastVerifiedToken = useRef('');

  useEffect(() => {
    if (!token) {
      setError('This trial link is missing its secure token. Request a new link.');
      setStatus('error');
      return;
    }

    if (lastVerifiedToken.current === token) return;
    lastVerifiedToken.current = token;

    verifyTrial(token)
      .then((result) => {
        setTrial(result);
        setStatus('success');
      })
      .catch((verifyError) => {
        setError(verifyError instanceof Error ? verifyError.message : 'We could not activate your trial. Request a new link.');
        setStatus('error');
      });
  }, [token]);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => navigate('/trial', { replace: true }), 2200);
    return () => window.clearTimeout(timer);
  }, [status, navigate]);

  const product = getTrialProduct(trial?.productSlug);

  return (
    <div className="bg-white pt-16 dark:bg-[#0a0a0a] sm:pt-24">
      <Seo
        title="Activating your trial | Deeps Systems"
        description="Securely activating your Deeps Systems SaaS trial."
        canonicalUrl="https://dspng.tech/trial/verify"
        robots="noindex, nofollow"
      />
      <section className="px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-gray-200 bg-white p-7 text-center shadow-2xl shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
          {status === 'verifying' && (
            <>
              <Loader2 className="mx-auto mb-5 h-14 w-14 animate-spin text-emerald-600" />
              <h1 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white">Activating your trial</h1>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                Confirming your email and preparing your trial workspace. This only takes a moment.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-emerald-600" />
              <h1 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white">Your trial is active</h1>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                Welcome, <strong className="text-gray-900 dark:text-white">{trial?.name}</strong>. Your{' '}
                <strong className="text-gray-900 dark:text-white">{trial?.productName}</strong> trial is ready with{' '}
                <strong className="text-gray-900 dark:text-white">{trial?.daysLeft} days</strong> remaining.
              </p>
              {product && (
                <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">
                  Opening your trial workspace automatically...
                </p>
              )}
              <Link
                to="/trial"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white transition hover:bg-emerald-500"
              >
                Open my trial <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle className="mx-auto mb-5 h-14 w-14 text-amber-500" />
              <h1 className="font-montserrat text-3xl font-bold text-gray-900 dark:text-white">Link could not be used</h1>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{error}</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/start-trial?mode=login"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-500"
                >
                  <Mail className="h-4 w-4" /> Email me a new link
                </Link>
                <Link
                  to="/start-trial"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 font-bold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                >
                  Start a new trial
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrialVerifyPage;
