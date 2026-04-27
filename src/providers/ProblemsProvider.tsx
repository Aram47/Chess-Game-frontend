import { useCallback, useEffect, useRef, useState } from "react";
import { ProblemsContext } from "../context/ProblemsContext";
import { Chess } from "chess.js";
import { problemsApi } from "../api/problems";
import type { ChessProblem } from "../types/problems";

export const ProblemsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const chessRef = useRef(new Chess());

  const [searchTerm, setSearchTerm] = useState("");
  const [problems, setProblems] = useState<ChessProblem[]>([]);
  const [fen, setFen] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFen(chessRef.current.fen());
  }, []);

  const fetchProblems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await problemsApi.getProblems();
      setProblems(response.data);
    } catch (error) {
      console.error("Failed to fetch problems:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       const difficultyLevel =
//         searchTerm === "Easy" ||
//         searchTerm === "Medium" ||
//         searchTerm === "Hard"
//           ? searchTerm
//           : undefined;
//       void fetchProblems(difficultyLevel);
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [fetchProblems, searchTerm]);

  return (
    <ProblemsContext.Provider
      value={{
        problems,
        setProblems,
        fen,
        setFen,
        searchTerm,
        setSearchTerm,
        fetchProblems,
        isLoading,
      }}
    >
      {children}
    </ProblemsContext.Provider>
  );
};
