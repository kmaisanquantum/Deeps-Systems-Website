/**
 * Returns the fully qualified API URL based on the environment (development vs production).
 * Removes duplicated backend routing logic across frontend components.
 *
 * Defaults to same-origin relative paths (`/api/...`), which is correct for the monolithic
 * deployment where the Node server (server/index.js) serves both the SPA and the API.
 * If the frontend is deployed separately from the backend, set VITE_API_BASE_URL at build
 * time to the backend origin (e.g. https://api.dspng.tech) and requests target it instead.
 */
export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const configuredBase = (import.meta as unknown as { env?: Record<string, string | undefined> }).env
    ?.VITE_API_BASE_URL;
  const base = (configuredBase || '').replace(/\/+$/, '');
  return `${base}${cleanPath}`;
};
