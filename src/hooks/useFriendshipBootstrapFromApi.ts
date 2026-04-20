import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  listFriends,
  listPendingFriends,
  profileQueryKeys,
} from "../api/friends";
import {
  syncAcceptedFriendsFromApi,
  syncPendingFriendshipsFromApi,
} from "../lib/friends/friendship-sse-store";

/**
 * Loads accepted friends and pending requests from the API into the friendship store
 * so offline / pre-SSE state matches the server after login.
 */
export function useFriendshipBootstrapFromApi(enabled: boolean) {
  const friendsQuery = useQuery({
    queryKey: profileQueryKeys.friends,
    queryFn: listFriends,
    enabled,
    staleTime: 30_000,
  });

  const pendingQuery = useQuery({
    queryKey: profileQueryKeys.friendsPending,
    queryFn: listPendingFriends,
    enabled,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (friendsQuery.data) {
      syncAcceptedFriendsFromApi(friendsQuery.data);
    }
  }, [friendsQuery.data]);

  useEffect(() => {
    if (pendingQuery.data) {
      syncPendingFriendshipsFromApi(pendingQuery.data);
    }
  }, [pendingQuery.data]);

  return { friendsQuery, pendingQuery };
}
