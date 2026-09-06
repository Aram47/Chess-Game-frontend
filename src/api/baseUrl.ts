/**
 * Browser-facing API origin.
 * Dev and Dokploy (backend nginx on the same public host) use relative URLs.
 * Set VITE_APP_API_URL only when the API is on a different public origin.
 */
export const API_BASE_URL = import.meta.env.DEV
  ? ""
  : (
      import.meta.env.VITE_APP_API_URL ||
      import.meta.env.VITE_API_BASE_URL ||
      ""
    ).replace(/\/$/, "");
