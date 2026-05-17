import api from "./axiosIntance";
import { getErrorMessage } from "./profile";
import { normalizeListResponse } from "../lib/api/normalizeListResponse";

export interface AchievementDto {
  name: string;
  description: string;
  iconUrl: string;
}

export async function getAchievements(): Promise<AchievementDto[]> {
  try {
    const { data } = await api.get<unknown>("/achievements");
    const list = normalizeListResponse<AchievementDto>(data);

    if (!Array.isArray(data) && list.length === 0 && data != null) {
      console.warn(
        "[achievements] Unexpected response shape; expected an array.",
        data,
      );
    }

    return list;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Failed to load achievements"));
  }
}
