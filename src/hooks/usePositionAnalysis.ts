import { useQuery } from "@tanstack/react-query";
import { analyzePosition } from "../api/analysis";

export function usePositionAnalysis(
  fen: string | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["position-analysis", fen],
    queryFn: () =>
      analyzePosition({
        fen: fen!,
        recommendedMovesCount: 3,
        depth: 14,
      }),
    enabled: Boolean(enabled && fen),
    staleTime: 30_000,
    retry: 1,
  });
}
