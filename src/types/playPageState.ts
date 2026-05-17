import type { BotLevel } from "./gameType";

export type GamePageLocationState = {
  mode?: "bot" | "live";
  level?: BotLevel;
};
