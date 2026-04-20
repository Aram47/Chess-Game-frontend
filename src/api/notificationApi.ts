import api from "./axiosIntance";

interface ApiErrorBody {
  message?: string | string[];
  statusCode?: number;
}

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

export async function readApiErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const data = (await response.json()) as ApiErrorBody;
    if (Array.isArray(data.message)) return data.message.join(", ");
    if (typeof data.message === "string") return data.message;
  } catch {
    /* ignore */
  }
  return fallback;
}

export async function fetchNotificationInbox(options?: {
  unreadOnly?: boolean;
  limit?: number;
}): Promise<InboxNotificationItem[]> {
  const params = new URLSearchParams();
  if (options?.unreadOnly) params.set("unreadOnly", "true");
  if (options?.limit != null) params.set("limit", String(options.limit));
  const q = params.toString();
  const response = await api.get(`notifications/inbox${q ? `?${q}` : ""}`);
  if (!response.ok) {
    throw new Error(
      await readApiErrorMessage(
        response.data,
        `Failed to load notifications (${response.status})`,
      ),
    );
  }
  return response.data;
}

export async function markNotificationRead(id: number): Promise<void> {
  const response = await api.patch(`notifications/inbox/${id}/read`, { method: 'PATCH' });
  if (!response.ok) {
    throw new Error(
      await readApiErrorMessage(response.data, `Could not update notification (${response.status})`),
    );
  }
}

export async function markAllNotificationsRead(): Promise<void> {
  const response = await api.post('notifications/inbox/read-all', { method: 'POST' });
  if (!response.ok) {
    throw new Error(
      await readApiErrorMessage(response.data, `Could not mark notifications read (${response.status})`),
    );
  }
}