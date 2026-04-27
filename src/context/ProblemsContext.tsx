import { createContext, useContext } from "react";
import type { ProblemsContextType } from "../types/problems";

export const ProblemsContext = createContext<
  ProblemsContextType | undefined
>(undefined);

export const useProblems = () => {
  const context = useContext(ProblemsContext);
  if (!context)
    throw new Error("useProblems must be used within Provider");
  return context;
};
