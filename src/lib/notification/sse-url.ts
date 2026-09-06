import { API_BASE_URL } from "../../api/baseUrl";

/**
 * SSE URL for NotificationsController — GET /notifications/stream
 * Prefers explicit env URL, then the public API origin, then same-origin.
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
    API_BASE_URL ||
    ""
  ).trim();
  if (notificationsBase) {
    return `${notificationsBase.replace(/\/$/, "")}/notifications/stream`;
  }

  return "/notifications/stream";
}
