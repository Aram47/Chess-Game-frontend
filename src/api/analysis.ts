
import type { MoveType } from "../types/gameType";
import api from "./axiosIntance";

export type AnalysisEvaluationKind = "cp" | "mate";

export interface AnalysisEvaluation {
  kind: AnalysisEvaluationKind;
  value: number;
}

export interface AnalysisLine {
  rank: number;
  move: MoveType;
  evaluation: AnalysisEvaluation;
  pvUci: string[];
}

export interface AnalyzePositionPayload {
  fen: string;
  recommendedMovesCount?: number;
  depth?: number;
}

export interface AnalyzePositionResult {
  fen: string;
  depth: number;
  depthReached: number;
  bestMove: MoveType | null;
  lines: AnalysisLine[];
}

interface ApiError {
  message: string | string[];
  statusCode: number;
}

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
      body
    );

    console.log('data', response)

    return response.data;

  } catch (error: any) {
    const errorData: ApiError = error.response?.data;
    const status = error.response?.status;

    throw new Error(
      toErrorMessage(
        errorData, 
        `Analysis failed: ${status || 'Unknown error'}`
      )
    );
  }
}