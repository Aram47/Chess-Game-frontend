import api from "./axiosIntance";

let refreshInFlight: Promise<void> | null = null;

/**
 * Rotates access/refresh cookies via POST /api/refresh.
 * Deduplicates concurrent refresh calls (e.g. multiple 401s on page load).
 */
export async function refreshAccessToken(): Promise<void> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = api
    .post("/api/refresh", undefined, { skipAuthRefresh: true })
    .then(() => undefined)
    .finally(() => {
      refreshInFlight = null;
    });

  return refreshInFlight;
}
