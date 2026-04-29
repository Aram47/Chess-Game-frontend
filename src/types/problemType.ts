export type ProblemTheme =
  | "All"
  | "Tactical"
  | "Endgame"
  | "Opening"
  | "Positional";
  
export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export const DIFFICULTY_FILTERS: Array<"All" | Difficulty> = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

export interface Problem {
  id: number;
  name: string;
  tag: ProblemTheme;
  difficulty: Difficulty;
  fen: string;
}

export const DIFFICULTY_MAP: Record<Difficulty, "Easy" | "Medium" | "Hard"> = {
  Beginner: "Easy",
  Intermediate: "Medium",
  Advanced: "Hard",
  Expert: "Hard",
};
