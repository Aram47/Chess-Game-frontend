import api from "./axiosIntance";
import type { UserSearchHit, PublicProfile } from "../types/profile";
import { getErrorMessage } from "./profile";

export async function searchUsers(
  q: string,
  limit = 10,
): Promise<UserSearchHit[]> {
  try {
    const { data } = await api.get<UserSearchHit[]>(
      "user-service/users/search",
      {
        params: { q: q.trim(), limit: Math.min(20, limit) },
      },
    );
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Search failed"));
  }
}

export async function getPublicProfile(userId: number): Promise<PublicProfile> {
  try {
    const { data } = await api.get<PublicProfile>(
      `user-service/profile/${userId}`,
    );
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "User not found"));
  }
}
