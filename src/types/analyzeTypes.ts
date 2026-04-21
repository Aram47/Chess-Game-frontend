import type { Dispatch, SetStateAction } from "react";
import type { GameHistoryItem } from "./gameType";

export type MoveType = {
  from: string;
  to: string;
  promotion?: string;
};

export interface AnalysisEvaluation {
  kind: "cp" | "mate";
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

export interface AnalyzePositionResult extends AnalyzePositionPayload {
  depthReached: number;
  bestMove: MoveType | null;
  lines: AnalysisLine[];
}

export interface AnalysisContextType {
  games: GameHistoryItem[];
  setGames: Dispatch<SetStateAction<GameHistoryItem[]>>;
  selectedGameId: string | null;
  selectedGame: GameHistoryItem | null;
  setSelectedGameId: (id: string | null) => void;
  plyIndex: number;
  setPlyIndex: Dispatch<SetStateAction<number>>;
}
