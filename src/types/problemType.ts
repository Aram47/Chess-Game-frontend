// import { ProblemDifficultyLevel } from "./problems";

export type ProblemTheme = "Tactical" | "Endgame" | "Opening" | "Positional";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export const DIFFICULTY_FILTERS: Array<"All" | Difficulty> = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export interface Problem {
  id: number;
  name: string;
  tag: ProblemTheme;
  difficulty: Difficulty;
  fen: string;
}
