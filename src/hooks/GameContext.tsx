import { createContext, useContext } from "react";
import type { GameContextType } from "../types/playType";

export const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used inside GameProvider");
  return context;
};
