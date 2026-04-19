import { z } from 'zod';
import type { FriendshipRow, PendingFriendships } from '../../types/profile';
import { FRIENDSHIP_SSE_EVENTS } from './friendship-sse-events';

const friendSnippetSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  surname: z.string(),
  elo: z.number(),
});

const friendshipRowSchema = z.object({
  id: z.number(),
  status: z.enum(['pending', 'accepted', 'rejected']),
  requestedBy: z.number(),
  createdAt: z.string(),
  otherUser: friendSnippetSchema,
});

export type FriendshipSseConnectionStatus = 'idle' | 'connecting' | 'open' | 'error';

export interface FriendshipSseState {
  incoming: FriendshipRow[];
  outgoing: FriendshipRow[];
  accepted: FriendshipRow[];
  connectionStatus: FriendshipSseConnectionStatus;
  lastError: string | null;
}

const STORAGE_PREFIX = 'chess_mvp_friends_sse_v1';

function storageKey(userId: number): string {
  return `${STORAGE_PREFIX}_${userId}`;
}

function upsertById(list: FriendshipRow[], row: FriendshipRow): FriendshipRow[] {
  const i = list.findIndex((r) => r.id === row.id);
  if (i >= 0) {
    const next = [...list];
    next[i] = row;
    return next;
  }
  return [...list, row];
}

const subscribers = new Set<() => void>();

let state: FriendshipSseState = {
  incoming: [],
  outgoing: [],
  accepted: [],
  connectionStatus: 'idle',
  lastError: null,
};

let activeUserId: number | null = null;

function emit(): void {
  if (activeUserId != null) {
    try {
      sessionStorage.setItem(
        storageKey(activeUserId),
        JSON.stringify({
          incoming: state.incoming,
          outgoing: state.outgoing,
          accepted: state.accepted,
        }),
      );
    } catch {
      /* ignore quota / private mode */
    }
  }
  subscribers.forEach((s) => s());
}

export function subscribeFriendshipSse(cb: () => void): () => void {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

export function getFriendshipSseSnapshot(): FriendshipSseState {
  return state;
}

export function hydrateFriendshipSseFromSession(userId: number): void {
  try {
    const raw = sessionStorage.getItem(storageKey(userId));
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      incoming?: FriendshipRow[];
      outgoing?: FriendshipRow[];
      accepted?: FriendshipRow[];
    };
    state = {
      ...state,
      incoming: Array.isArray(parsed.incoming) ? parsed.incoming : [],
      outgoing: Array.isArray(parsed.outgoing) ? parsed.outgoing : [],
      accepted: Array.isArray(parsed.accepted) ? parsed.accepted : [],
    };
    emit();
  } catch {
    /* ignore */
  }
}

export function setActiveFriendshipSseUser(userId: number | null): void {
  activeUserId = userId;
}

export function resetFriendshipSseState(): void {
  state = {
    incoming: [],
    outgoing: [],
    accepted: [],
    connectionStatus: 'idle',
    lastError: null,
  };
  emit();
}

export function setFriendshipSseConnectionStatus(
  status: FriendshipSseConnectionStatus,
  error: string | null = null,
): void {
  state = { ...state, connectionStatus: status, lastError: error };
  emit();
}

function parseFriendshipPayload(raw: string): FriendshipRow | null {
  try {
    const data = JSON.parse(raw) as unknown;
    const rec = z.object({ friendship: friendshipRowSchema }).safeParse(data);
    if (!rec.success) return null;
    return rec.data.friendship as FriendshipRow;
  } catch {
    return null;
  }
}

function parseIdPayload(raw: string): number | null {
  try {
    const data = JSON.parse(raw) as unknown;
    const rec = z.object({ friendshipId: z.number() }).safeParse(data);
    return rec.success ? rec.data.friendshipId : null;
  } catch {
    return null;
  }
}

export function applyFriendRequestReceived(friendship: FriendshipRow): void {
  state = {
    ...state,
    incoming: upsertById(state.incoming, friendship),
    outgoing: state.outgoing.filter((r) => r.id !== friendship.id),
  };
  emit();
}

export function applyFriendRequestSent(friendship: FriendshipRow): void {
  state = {
    ...state,
    outgoing: upsertById(state.outgoing, friendship),
    incoming: state.incoming.filter((r) => r.id !== friendship.id),
  };
  emit();
}

export function applyFriendRequestAccepted(friendship: FriendshipRow): void {
  state = {
    ...state,
    incoming: state.incoming.filter((r) => r.id !== friendship.id),
    outgoing: state.outgoing.filter((r) => r.id !== friendship.id),
    accepted: upsertById(state.accepted, friendship),
  };
  emit();
}

export function removeFriendshipById(friendshipId: number): void {
  state = {
    ...state,
    incoming: state.incoming.filter((r) => r.id !== friendshipId),
    outgoing: state.outgoing.filter((r) => r.id !== friendshipId),
    accepted: state.accepted.filter((r) => r.id !== friendshipId),
  };
  emit();
}

/** Replaces accepted friends from GET `/friends` (server truth). Pending lists stay SSE-driven. */
export function syncAcceptedFriendsFromApi(rows: FriendshipRow[]): void {
  const accepted = rows.filter((r) => r.status === 'accepted');
  state = {
    ...state,
    accepted,
  };
  emit();
}

/** Replaces pending incoming/outgoing from GET `/friends/pending` (server truth for offline catch-up). */
export function syncPendingFriendshipsFromApi(dto: PendingFriendships): void {
  const incoming = dto.incoming.filter((r) => r.status === 'pending');
  const outgoing = dto.outgoing.filter((r) => r.status === 'pending');
  state = {
    ...state,
    incoming,
    outgoing,
  };
  emit();
}

export function handleNamedSseEvent(eventName: string, dataRaw: string): void {
  switch (eventName) {
    case FRIENDSHIP_SSE_EVENTS.RECEIVED: {
      const f = parseFriendshipPayload(dataRaw);
      if (f) applyFriendRequestReceived(f);
      break;
    }
    case FRIENDSHIP_SSE_EVENTS.SENT: {
      const f = parseFriendshipPayload(dataRaw);
      if (f) applyFriendRequestSent(f);
      break;
    }
    case FRIENDSHIP_SSE_EVENTS.ACCEPTED: {
      const f = parseFriendshipPayload(dataRaw);
      if (f) applyFriendRequestAccepted(f);
      break;
    }
    case FRIENDSHIP_SSE_EVENTS.REJECTED:
    case FRIENDSHIP_SSE_EVENTS.CANCELLED:
    case FRIENDSHIP_SSE_EVENTS.REMOVED: {
      const id = parseIdPayload(dataRaw);
      if (id != null) removeFriendshipById(id);
      break;
    }
    default:
      break;
  }
}
