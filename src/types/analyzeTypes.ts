import type { MoveType } from "./gameType";

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

export interface ApiError {
  message: string | string[];
  statusCode: number;
}
