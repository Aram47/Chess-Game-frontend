import api from "./axiosIntance";
import type {
  FriendshipRow,
  PendingFriendships,
  SendFriendRequestBody,
  UserSearchHit,
} from "../types/profile";
import { getErrorMessage } from "./profile";

interface ApiErrorBody {
  message?: string | string[];
  statusCode?: number;
}

export async function readApiErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const data = (await response.json()) as ApiErrorBody;
    if (Array.isArray(data.message)) return data.message.join(", ");
    if (typeof data.message === "string") return data.message;
  } catch {
    /* ignore */
  }
  return fallback;
}

export const profileQueryKeys = {
  me: ["profile", "me"] as const,
  public: (id: number) => ["profile", "public", id] as const,
  friends: ["friends", "list"] as const,
  friendsPending: ["friends", "pending"] as const,
  userSearch: (q: string, limit: number) =>
    ["users", "search", q, limit] as const,
};

export async function listFriends(): Promise<FriendshipRow[]> {
  try {
    const res = await api.get("user-service/friends");
    return res.data;
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

export async function acceptFriendRequest(id: number): Promise<FriendshipRow> {
  const response = await api.patch(`user-service/friends/${id}/accept`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error(
      await readApiErrorMessage(
        response.data,
        `Could not accept request (${response.status})`,
      ),
    );
  }
  return response.data;
}

export async function rejectFriendRequest(id: number): Promise<FriendshipRow> {
  const response = await api.patch(`user-service/friends/${id}/reject`, {
    method: "PATCH",
  });
  if (!response.ok) {
    throw new Error(
      await readApiErrorMessage(
        response.data,
        `Could not reject request (${response.status})`,
      ),
    );
  }
  return response.data;
}

export async function listPendingFriends(): Promise<PendingFriendships> {
  const response = await api.get("user-service/friends/pending", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(
      await readApiErrorMessage(
        response.data,
        `Failed to load friend requests (${response.status})`,
      ),
    );
  }
  return response.data;
}
