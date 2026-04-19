import type { InboxNotificationItem } from "../../api/notificationApi";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

// Add this helper to your inbox-labels.ts file
export function getFriendshipId(data: unknown): number | null {
  if (typeof data === "object" && data !== null && "friendship" in data) {
    const f = (data as any).friendship;
    return typeof f.id === "number" ? f.id : null;
  }
  return null;
}

function friendshipFields(data: unknown): {
  otherUsername: string | null;
  requestedBy: number | null;
} {
  if (!isRecord(data)) return { otherUsername: null, requestedBy: null };
  const friendship = data.friendship;
  if (!isRecord(friendship)) return { otherUsername: null, requestedBy: null };
  const other = friendship.otherUser;
  const rb = friendship.requestedBy;
  const u =
    isRecord(other) && typeof other.username === "string"
      ? other.username
      : null;
  const requestedBy = typeof rb === "number" ? rb : null;
  return { otherUsername: u, requestedBy };
}

/** Short label for persisted inbox rows (missed SSE). */
export function inboxItemLabel(
  item: InboxNotificationItem,
  myUserId: number,
): string {
  const { eventType, data } = item;
  const { otherUsername: who, requestedBy } = friendshipFields(data);

  switch (eventType) {
    case "friend.request.accepted":
      if (who && requestedBy != null) {
        if (requestedBy === myUserId) {
          return `@${who} accepted your friend request`;
        }
        return `You are now friends with @${who}`;
      }
      return "A friend request was accepted";
    case "friend.request.rejected":
      return who
        ? `@${who} declined your friend request`
        : "A friend request was declined";
    case "friend.request.cancelled":
      return who
        ? `@${who} cancelled their friend request`
        : "A friend request was cancelled";
    case "friend.removed":
      return who
        ? `@${who} removed you from friends`
        : "Someone removed the friendship";
    default:
      return eventType;
  }
}
