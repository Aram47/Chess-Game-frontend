/** Must match `UserNotificationEvents` on the backend. */
export const FRIENDSHIP_SSE_EVENTS = {
  RECEIVED: 'friend.request.received',
  SENT: 'friend.request.sent',
  ACCEPTED: 'friend.request.accepted',
  REJECTED: 'friend.request.rejected',
  CANCELLED: 'friend.request.cancelled',
  REMOVED: 'friend.removed',
  PING: 'ping',
} as const;
