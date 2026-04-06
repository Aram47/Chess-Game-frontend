import { createContext, useContext } from "react";
import type { PlayContextType } from "../types/playType";

export const PlayContext = createContext<PlayContextType | null>(null);

export const usePlay = () => {
  const context = useContext(PlayContext);
  if (!context) throw new Error("usePlay must be used inside PlayProvider");
  return context;
};
