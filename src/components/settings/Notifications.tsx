import { Section } from "./Section";
import { ToggleRow } from "../../helpers/ToggleRow";
import { useTranslation } from "../../hooks/useTranslation";
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
  const { t } = useTranslation();

  return (
    <Section
      icon={<img src={notification} alt="notification" />}
      title={t("notifications_title")}
      subtitle={t("notifications_subtitle")}
    >
      <ToggleRow
        name={t("game_invites")}
        desc={t("game_invites_desc")}
        checked={notifications.gameInvites}
        onChange={(v) =>
          setNotifications((prev) => ({ ...prev, gameInvites: v }))
        }
      />

      <ToggleRow
        name={t("friend_requests")}
        desc={t("friend_requests_desc")}
        checked={notifications.friendRequests}
        onChange={(v) =>
          setNotifications((prev) => ({ ...prev, friendRequests: v }))
        }
      />
    </Section>
  );
};

export default Notifications;
