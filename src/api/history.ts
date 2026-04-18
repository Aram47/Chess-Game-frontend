import type { GameHistoryItem } from "../types/gameType";
import api from "./axiosIntance";

export interface GameHistoryResponse {
  data: GameHistoryItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ApiError {
  message: string | string[];
  statusCode: number;
}

function toErrorMessage(errorData: ApiError | undefined, fallback: string) {
  if (!errorData) return fallback;
  if (Array.isArray(errorData.message)) {
    return errorData.message.join(", ");
  }
  return errorData.message || fallback;
}

export async function getMyGameHistory(
  page = 1,
  limit = 20,
): Promise<GameHistoryResponse> {
  try {
    const response = await api.get<GameHistoryResponse>(
      `snapshot-service/games/my`,
      {
        params: { page, limit },
      },
    );

    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data as ApiError;
    const status = error.response?.status;
    throw new Error(
      toErrorMessage(
        errorData,
        `Failed to load game history: ${status || "Unknown"}`,
      ),
    );
  }
}

export async function getMyGameHistoryItem(
  id: string,
): Promise<GameHistoryItem> {
  try {
    const response = await api.get<GameHistoryItem>(
      `snapshot-service/games/my/${id}`,
    );

    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data as ApiError;
    const status = error.response?.status;
    throw new Error(
      toErrorMessage(
        errorData,
        `Failed to load game details: ${status || "Unknown"}`,
      ),
    );
  }
}
