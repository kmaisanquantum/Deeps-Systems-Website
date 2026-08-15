/**
 * Returns the fully qualified API URL based on the environment (development vs production).
 * Removes duplicated backend routing logic across frontend components.
 */
export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const base = '';
  return `${base}${cleanPath}`;
};
