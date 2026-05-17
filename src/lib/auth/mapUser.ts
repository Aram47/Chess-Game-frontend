import type { UserProfile } from "../../types/authType";
import type { MyProfile } from "../../types/profile";

export function mapProfileToUserProfile(profile: MyProfile): UserProfile {
  return {
    id: String(profile.id),
    username: profile.username,
    email: profile.email,
    name: profile.name,
    surname: profile.surname,
  };
}

export function normalizeUserFromApi(data: unknown): UserProfile | null {
  if (!data || typeof data !== "object") return null;

  const candidate =
    "user" in data && data.user && typeof data.user === "object"
      ? data.user
      : data;

  const record = candidate as Record<string, unknown>;
  if (
    record.id == null ||
    typeof record.username !== "string" ||
    typeof record.email !== "string"
  ) {
    return null;
  }

  return {
    id: String(record.id),
    username: record.username,
    email: record.email,
    name: typeof record.name === "string" ? record.name : "",
    surname: typeof record.surname === "string" ? record.surname : "",
  };
}
