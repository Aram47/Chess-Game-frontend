import api from "./axiosIntance";

export interface InboxNotificationItem {
  id: number;
  eventType: string;
  data: unknown;
  readAt: string | null;
  createdAt: string;
}

export const notificationQueryKeys = {
  inbox: ["notifications", "inbox"] as const,
};

export async function fetchNotificationInbox(options?: {
  unreadOnly?: boolean;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (options?.unreadOnly) params.set("unreadOnly", "true");
  if (options?.limit) params.set("limit", String(options.limit));

  const q = params.toString();

  const response = await api.get(`/notifications/inbox${q ? `?${q}` : ""}`);

  return response.data;
}
export async function markAllNotificationsRead(): Promise<void> {
  await api.post("/notifications/inbox/read-all");
}
