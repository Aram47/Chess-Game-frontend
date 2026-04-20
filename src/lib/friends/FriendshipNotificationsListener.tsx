import { useFriendshipBootstrapFromApi } from "../../hooks/useFriendshipBootstrapFromApi";
import { useFriendshipNotificationsSse } from "./useFriendshipSseLists";

/**
 * Mount once (e.g. in Navbar) while logged in so friend SSE state stays warm on all routes.
 */
export function FriendshipNotificationsListener({
  userId,
}: {
  userId: number;
}) {
  useFriendshipNotificationsSse(true, userId);
  useFriendshipBootstrapFromApi(!!userId);
  return null;
}
