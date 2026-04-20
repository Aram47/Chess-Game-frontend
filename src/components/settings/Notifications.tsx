import { Section } from "./Section";
import { ToggleRow } from "../../helpers/ToggleRow";
import notification from "../../assets/icons/settings/notification.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotificationInbox,
  notificationQueryKeys,
  markNotificationRead,
} from "../../api/notificationApi";
import { inboxItemLabel, getFriendshipId } from "../notification/inbox-labels";
import { profileQueryKeys } from "../../api/friends";
import { useFriendMutations } from "../../helpers/useFriendMutations";
import { getMyProfile } from "../../api/profile";

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
  const queryClient = useQueryClient();

  // 1. Get current user ID (needed for labels and logic)
  const { data: me } = useQuery({
    queryKey: profileQueryKeys.me,
    queryFn: getMyProfile,
  });
  const myId = me?.id;

  const inboxQuery = useQuery({
    queryKey: notificationQueryKeys.inbox,
    queryFn: () => fetchNotificationInbox({ limit: 50 }),
    staleTime: 30_000,
  });

  const { acceptMutation, rejectMutation } = useFriendMutations();

  // 2. Mark specific notification as read when interacting
  const markRead = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.inbox }),
  });

  const handleAccept = async (notificationId: number, friendshipId: number) => {
    await acceptMutation.mutateAsync(friendshipId);
    await markRead.mutateAsync(notificationId);
  };

  const handleReject = async (notificationId: number, friendshipId: number) => {
    await rejectMutation.mutateAsync(friendshipId);
    await markRead.mutateAsync(notificationId);
  };

  const unreadInbox = inboxQuery.data?.filter((n) => n.readAt === null) ?? [];

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

      {unreadInbox.length > 0 && (
        <>
          <p className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide mt-4">
            While you were away
          </p>
          <ul className="space-y-2 px-1 pb-2">
            {unreadInbox.map((item) => {
              const friendshipId = getFriendshipId(item.data);
              // Only show actions for received friend requests
              const isFriendReq = item.eventType === "friend.request.received";

              return (
                <li
                  key={item.id}
                  className="rounded-md border px-3 py-2 text-sm bg-muted/10 border-dashed"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-foreground leading-snug">
                        {inboxItemLabel(item, myId ?? 0)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    {isFriendReq && friendshipId && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleAccept(item.id, friendshipId)}
                          disabled={acceptMutation.isPending}
                          className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold hover:opacity-90"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(item.id, friendshipId)}
                          disabled={rejectMutation.isPending}
                          className="bg-destructive/10 text-destructive px-2 py-1 rounded text-xs font-bold hover:bg-destructive/20"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

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
