import { getApiUrl } from './api';

export interface TrialRecord {
  id: number;
  name: string;
  email: string;
  company: string;
  productSlug: string;
  productName: string;
  teamSize: string | null;
  phone: string | null;
  status: string;
  emailVerified: boolean;
  trialStartedAt: string;
  trialEndsAt: string;
  verifiedAt: string | null;
  createdAt: string;
  daysLeft: number;
}

export interface StartTrialPayload {
  name: string;
  email: string;
  company: string;
  productSlug: string;
  teamSize?: string;
  phone?: string;
  source?: string;
  companyWebsite?: string;
  acceptTerms: boolean;
}

interface TrialMessageResponse {
  success: boolean;
  message: string;
}

async function readJson<T>(response: Response): Promise<T> {
  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    // Keep the fallback message when the server returns a non-JSON response.
  }

  if (!response.ok) {
    const message = (data as { error?: string } | null)?.error;
    throw new Error(message || 'Something went wrong. Please try again.');
  }

  return data as T;
}

export async function startTrial(payload: StartTrialPayload): Promise<TrialMessageResponse> {
  const response = await fetch(getApiUrl('/api/trials'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  return readJson<TrialMessageResponse>(response);
}

export async function verifyTrial(token: string): Promise<TrialRecord> {
  const response = await fetch(getApiUrl('/api/trials/verify'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ token }),
  });
  const data = await readJson<{ success: boolean; trial: TrialRecord }>(response);
  return data.trial;
}

export async function getTrial(): Promise<TrialRecord | null> {
  const response = await fetch(getApiUrl('/api/trials/me'), {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });

  if (response.status === 401) return null;

  const data = await readJson<{ trial: TrialRecord }>(response);
  return data.trial;
}

export async function requestTrialMagicLink(email: string): Promise<TrialMessageResponse> {
  const response = await fetch(getApiUrl('/api/trials/magic-link'), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email }),
  });
  return readJson<TrialMessageResponse>(response);
}

export async function logoutTrial(): Promise<void> {
  await fetch(getApiUrl('/api/trials/logout'), {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
}
