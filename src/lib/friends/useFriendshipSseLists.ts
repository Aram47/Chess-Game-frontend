import { useEffect, useRef } from "react";
import { getNotificationsSseUrl } from "../notification/sse-url";
import { FRIENDSHIP_SSE_EVENTS } from "./friendship-sse-events";
import {
  handleNamedSseEvent,
  hydrateFriendshipSseFromSession,
  resetFriendshipSseState,
  setActiveFriendshipSseUser,
  setFriendshipSseConnectionStatus,
} from "./friendship-sse-store";

const SUBSCRIBED_EVENTS: string[] = [
  FRIENDSHIP_SSE_EVENTS.RECEIVED,
  FRIENDSHIP_SSE_EVENTS.SENT,
  FRIENDSHIP_SSE_EVENTS.ACCEPTED,
  FRIENDSHIP_SSE_EVENTS.REJECTED,
  FRIENDSHIP_SSE_EVENTS.CANCELLED,
  FRIENDSHIP_SSE_EVENTS.REMOVED,
];

/**
 * Keeps `/notifications/stream` open while authenticated; merges friend rows from SSE.
 * No GET `/friends` / `/friends/pending` — state comes from events + sessionStorage.
 */
export function useFriendshipNotificationsSse(
  enabled: boolean,
  userId: number | null,
): void {
  const prevUserIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || userId == null) {
      setActiveFriendshipSseUser(null);
      resetFriendshipSseState();
      prevUserIdRef.current = null;
      return;
    }

    if (prevUserIdRef.current !== userId) {
      resetFriendshipSseState();
      prevUserIdRef.current = userId;
    }

    setActiveFriendshipSseUser(userId);
    hydrateFriendshipSseFromSession(userId);

    let cancelled = false;
    let es: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let attempt = 0;

    const clearReconnect = () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = undefined;
      }
    };

    const attachHandlers = (source: EventSource) => {
      source.onopen = () => {
        attempt = 0;
        setFriendshipSseConnectionStatus("open", null);
      };

      for (const name of SUBSCRIBED_EVENTS) {
        source.addEventListener(name, (evt) => {
          const me = evt as MessageEvent;
          if (typeof me.data === "string") {
            handleNamedSseEvent(name, me.data);
          }
        });
      }

      source.addEventListener(FRIENDSHIP_SSE_EVENTS.PING, () => {
        /* heartbeat */
      });
    };

    const connect = () => {
      if (cancelled) return;
      clearReconnect();
      setFriendshipSseConnectionStatus("connecting", null);

      try {
        es = new EventSource(getNotificationsSseUrl(), {
          withCredentials: true,
        });
      } catch (e) {
        setFriendshipSseConnectionStatus(
          "error",
          e instanceof Error ? e.message : "Could not open EventSource",
        );
        scheduleReconnect();
        return;
      }

      attachHandlers(es);

      es.onerror = () => {
        if (cancelled) return;
        setFriendshipSseConnectionStatus("error", "Connection interrupted");
        es?.close();
        es = null;
        scheduleReconnect();
      };
    };

    const scheduleReconnect = () => {
      if (cancelled) return;
      const delay = Math.min(30_000, 1000 * 2 ** Math.min(attempt, 5));
      attempt += 1;
      reconnectTimer = setTimeout(() => connect(), delay);
    };

    connect();

    return () => {
      cancelled = true;
      clearReconnect();
      es?.close();
      es = null;
    };
  }, [enabled, userId]);
}
