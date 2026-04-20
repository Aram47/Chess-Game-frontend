/**
 * SSE URL for NotificationsController — GET /notifications/stream
 * Prefers explicit env URL, then backend base URL.
 */
export function getNotificationsSseUrl(): string {
  const explicitStreamUrl = (
    import.meta.env.VITE_NOTIFICATIONS_SSE_URL || ""
  ).trim();
  if (explicitStreamUrl) {
    return explicitStreamUrl;
  }

  const notificationsBase = (
    import.meta.env.VITE_NOTIFICATIONS_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    ""
  ).trim();
  if (notificationsBase) {
    return `${notificationsBase.replace(/\/$/, "")}/notifications/stream`;
  }

  if (import.meta.env.DEV) {
    // Local fallback so SSE reaches backend directly in development.
    return "http://localhost:3000/notifications/stream";
  }

  throw new Error(
    "Configure VITE_NOTIFICATIONS_SSE_URL, VITE_NOTIFICATIONS_BASE_URL, or VITE_API_BASE_URL",
  );
}
