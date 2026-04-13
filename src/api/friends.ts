import api from "./axiosIntance";
import type {
  FriendshipRow,
  PendingFriendships,
  SendFriendRequestBody,
  UserSearchHit,
} from "../types/profile";
import { getErrorMessage } from "./profile";

/** Lists all accepted friends for the "Friends Online" sidebar */
export async function listFriends(): Promise<FriendshipRow[]> {
  try {
    const { data } = await api.get<FriendshipRow[]>("user-service/friends");
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Failed to load friends list"));
  }
}

/** For the "Find Players" search functionality */
export async function searchUsers(
  q: string,
  limit = 10,
): Promise<UserSearchHit[]> {
  try {
    const { data } = await api.get<UserSearchHit[]>(
      "user-service/users/search",
      {
        params: { q: q.trim(), limit },
      },
    );
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Search failed"));
  }
}

export async function sendFriendRequest(
  body: SendFriendRequestBody,
): Promise<FriendshipRow> {
  try {
    const { data } = await api.post<FriendshipRow>(
      "user-service/friends/request",
      body,
    );
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Could not send request"));
  }
}

export async function listPendingRequests(): Promise<PendingFriendships> {
  try {
    const { data } = await api.get<PendingFriendships>(
      "user-service/friends/pending",
    );
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Failed to load pending requests"));
  }
}

export async function removeFriendship(id: number): Promise<void> {
  try {
    await api.delete(`user-service/friends/${id}`);
  } catch (err) {
    throw new Error(getErrorMessage(err, "Action failed"));
  }
}
