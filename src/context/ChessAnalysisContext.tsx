import { createContext, useContext } from "react";
import type { AnalysisContextType } from "../types/analyzeTypes";

export const ChessAnalysisContext = createContext<
  AnalysisContextType | undefined
>(undefined);

export const useChessAnalysis = () => {
  const context = useContext(ChessAnalysisContext);
  if (!context)
    throw new Error("useChessAnalysis must be used within Provider");
  return context;
};
