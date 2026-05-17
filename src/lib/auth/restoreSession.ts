import { refreshAccessToken } from "../../api/refreshSession";
import { getMyProfile } from "../../api/profile";
import { mapProfileToUserProfile } from "./mapUser";
import type { UserProfile } from "../../types/authType";

/**
 * Restores the logged-in user after a full page reload:
 * 1) refresh httpOnly cookies
 * 2) load GET user-service/profile/me
 */
export async function restoreSession(): Promise<UserProfile | null> {
  try {
    await refreshAccessToken();
    const profile = await getMyProfile();
    return mapProfileToUserProfile(profile);
  } catch {
    return null;
  }
}
