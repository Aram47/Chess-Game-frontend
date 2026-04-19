import { useMemo, useSyncExternalStore } from 'react';
import {
  getFriendshipSseSnapshot,
  subscribeFriendshipSse,
} from '../../lib/friends/friendship-sse-store';

export function useFriendshipSseLists() {
  const friendSse = useSyncExternalStore(
    subscribeFriendshipSse,
    getFriendshipSseSnapshot,
    getFriendshipSseSnapshot,
  );

  return useMemo(
    () => ({
      friendSse,
      incomingPending: friendSse.incoming.filter((r) => r.status === 'pending'),
      outgoingPending: friendSse.outgoing.filter((r) => r.status === 'pending'),
      acceptedFriends: friendSse.accepted.filter((r) => r.status === 'accepted'),
    }),
    [friendSse],
  );
}
