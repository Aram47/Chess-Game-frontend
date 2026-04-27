import type { Dispatch, SetStateAction } from "react";

export interface ChessProblem {
  id: number;
  category: ProblemCategory;
  fen: string;
  solutionMoves: MoveType[];
  description: string;
  difficultyLevel: ProblemDifficultyLevel;
  isPayable: boolean;
  isActive: boolean;
}

export interface ProblemCategory {
  id: number;
  name: string;
}

export interface MoveType {
  from: string;
  to: string;
}

export type ProblemDifficultyLevel = "Easy" | "Medium" | "Hard";

export interface GetProblemsParams {
  page?: number;
  limit?: number;
  difficultyLevel?: ProblemDifficultyLevel;
  categoryId?: number;
  themeId?: number;     // Added
  isPayable?: boolean;
}

export interface GetProblemsResponse {
  data: ChessProblem[];
  total: number;
  page: number;
  limit: number;
}

export interface Theme {
  id: number;
  themeId: number;
  problemId: number;
  problem: string;
  theme: string;
  name: string;
}

export interface ProblemTheme {
  id: number;
  problemId: number;
  themeId: number;
  problem?: ChessProblem;
  theme?: Theme;
}

export interface ProblemsContextType {
  problems: ChessProblem[];
  setProblems: Dispatch<SetStateAction<ChessProblem[]>>;
  fen: string;
  setFen: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  fetchProblems: (query?: ProblemDifficultyLevel) => Promise<void>;
  isLoading: boolean;
}
