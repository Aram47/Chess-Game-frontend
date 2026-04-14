import type {
  AnalyzePositionPayload,
  AnalyzePositionResult,
} from "../types/analyzeTypes";
import type { ApiError } from "../types/gameType";
import api from "./axiosIntance";

function toErrorMessage(errorData: ApiError, fallback: string) {
  if (Array.isArray(errorData.message)) {
    return errorData.message.join(", ");
  }
  return errorData.message || fallback;
}

export async function analyzePosition(
  payload: AnalyzePositionPayload,
): Promise<AnalyzePositionResult> {
  const body: Record<string, unknown> = { fen: payload.fen };

  if (payload.recommendedMovesCount != null) {
    body.recommendedMovesCount = payload.recommendedMovesCount;
  }
  if (payload.depth != null) {
    body.depth = payload.depth;
  }

  try {
    const response = await api.post<AnalyzePositionResult>(
      "game/position/analyze",
      body,
      { withCredentials: true },
    );

    console.log("Full Data from API:", response.data);

    console.log("Lines count:", response.data.lines?.length);

    return response.data;
  } catch (error: any) {
    const errorData: ApiError = error.response?.data;
    const status = error.response?.status;

    throw new Error(
      toErrorMessage(
        errorData,
        `Analysis failed: ${status || "Unknown error"}`,
      ),
    );
  }
}
