import { useNotificationInbox } from "../../hooks/useNotificationInbox";

interface NotificationBellProps {
  isLoggedIn: boolean;
  onNotification?: (event: { eventType: string; parsedData: unknown }) => void;
}

function NotificationBell({ isLoggedIn, onNotification }: NotificationBellProps) {
  const { data, isLoading, error } = useNotificationInbox(isLoggedIn, {
    onNotification: (event) => {
      onNotification?.({
        eventType: event.eventType,
        parsedData: event.parsedData,
      });
    },
  });

  if (!isLoggedIn) return null;

  if (isLoading) return null;

  if (error) return null;

  return (
    <>
      {data?.map((n) => (
        <div key={n.id}>
          {n.eventType} - {n.createdAt}
        </div>
      ))}
    </>
  );
}

export default NotificationBell;
