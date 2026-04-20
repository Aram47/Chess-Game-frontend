import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotificationInbox,
  notificationQueryKeys,
} from "../api/notificationApi";
import { getNotificationsSseUrl } from "../lib/notification/sse-url";
import { FRIENDSHIP_SSE_EVENTS } from "../lib/friends/friendship-sse-events";

export interface NotificationStreamEvent {
  eventType: string;
  rawData: string;
  parsedData: unknown;
}

interface UseNotificationInboxOptions {
  onNotification?: (event: NotificationStreamEvent) => void;
}

function parseSsePayload(rawData: string): unknown {
  try {
    return JSON.parse(rawData);
  } catch {
    return rawData;
  }
}

export function useNotificationInbox(
  isLoggedIn: boolean,
  options?: UseNotificationInboxOptions,
) {
  const queryClient = useQueryClient();
  const onNotification = options?.onNotification;

  useEffect(() => {
    if (!isLoggedIn) return;

    let es: EventSource | null = null;

    const emitNotification = (eventType: string, rawData: string) => {
      onNotification?.({
        eventType,
        rawData,
        parsedData: parseSsePayload(rawData),
      });

      // Keep inbox query fresh when backend emits a notification event.
      void queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.inbox,
      });
    };

    try {
      es = new EventSource(getNotificationsSseUrl(), { withCredentials: true });
    } catch {
      return;
    }

    es.onmessage = (evt) => {
      emitNotification("message", evt.data);
    };

    const namedEventHandlers = [
      FRIENDSHIP_SSE_EVENTS.RECEIVED,
      FRIENDSHIP_SSE_EVENTS.SENT,
      FRIENDSHIP_SSE_EVENTS.ACCEPTED,
      FRIENDSHIP_SSE_EVENTS.REJECTED,
      FRIENDSHIP_SSE_EVENTS.CANCELLED,
      FRIENDSHIP_SSE_EVENTS.REMOVED,
    ] as const;

    for (const eventName of namedEventHandlers) {
      es.addEventListener(eventName, (evt) => {
        const messageEvent = evt as MessageEvent;
        emitNotification(eventName, messageEvent.data);
      });
    }

    return () => {
      es?.close();
      es = null;
    };
  }, [isLoggedIn, onNotification, queryClient]);

  return useQuery({
    queryKey: notificationQueryKeys.inbox,
    queryFn: () => fetchNotificationInbox({ limit: 50 }),
    enabled: isLoggedIn,
    staleTime: 30000,
    refetchInterval: 30000,
  });
}
