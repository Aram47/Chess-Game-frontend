import { Section } from "./Section";
import { ToggleRow } from "../../helpers/ToggleRow";
import notification from "../../assets/icons/settings/notification.svg";

interface NotificationsProps {
  notifications: {
    gameInvites: boolean;
    friendRequests: boolean;
  };
  setNotifications: React.Dispatch<
    React.SetStateAction<{
      gameInvites: boolean;
      friendRequests: boolean;
    }>
  >;
}

const Notifications = ({
  notifications,
  setNotifications,
}: NotificationsProps) => {
  return (
    <Section
      icon={<img src={notification} alt="notification" />}
      title="Notifications"
      subtitle="Manage how you receive notifications"
    >
      <ToggleRow
        name="Game Invites"
        desc="Get notified when someone challenges you"
        checked={notifications.gameInvites}
        onChange={(v) =>
          setNotifications((prev) => ({ ...prev, gameInvites: v }))
        }
      />
      <ToggleRow
        name="Friend Requests"
        desc="Be notified of new friend requests"
        checked={notifications.friendRequests}
        onChange={(v) =>
          setNotifications((prev) => ({ ...prev, friendRequests: v }))
        }
      />
    </Section>
  );
};

export default Notifications;
