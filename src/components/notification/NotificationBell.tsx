import { useNotificationInbox } from "../../hooks/useNotificationInbox";

interface NotificationBellProps {
  isLoggedIn: boolean;
  onNotification?: (event: { eventType: string; parsedData: unknown }) => void;
}

/**
 * Subscribes to notification SSE and keeps inbox query fresh.
 * No header UI — notifications are not shown in the nav bar.
 */
function NotificationBell({ isLoggedIn, onNotification }: NotificationBellProps) {
  useNotificationInbox(isLoggedIn, {
    onNotification: (event) => {
      onNotification?.({
        eventType: event.eventType,
        parsedData: event.parsedData,
      });
    },
  });

  return null;
}

export default NotificationBell;
