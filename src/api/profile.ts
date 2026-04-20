import api from "./axiosIntance";
import type {
  MyProfile,
  PublicProfile,
  UpdateProfileRequest,
} from "../types/profile";

export function getErrorMessage(error: any, fallback: string): string {
  const serverMessage = error.response?.data?.message;
  if (Array.isArray(serverMessage)) return serverMessage.join(", ");
  if (typeof serverMessage === "string") return serverMessage;
  return fallback;
}

export async function getMyProfile(): Promise<MyProfile> {
  try {
    const { data } = await api.get<MyProfile>("user-service/profile/me");
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Failed to load profile"));
  }
}

export async function updateMyProfile(
  body: UpdateProfileRequest,
): Promise<MyProfile> {
  try {
    const { data } = await api.patch<MyProfile>(
      "user-service/profile/me",
      body,
    );
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Failed to update profile"));
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
