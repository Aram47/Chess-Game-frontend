import api from "./axiosIntance";
import { getErrorMessage } from "./profile";

export interface CompletedProblemsStats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

export async function getCompletedProblemsStats(): Promise<CompletedProblemsStats> {
  try {
    const { data } = await api.get<CompletedProblemsStats>(
      "snapshot-service/problems/stats",
    );
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "Failed to load puzzle stats"));
  }
}
