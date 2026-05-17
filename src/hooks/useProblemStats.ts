import { useQuery } from "@tanstack/react-query";
import { getCompletedProblemsStats } from "../api/snapshot";

export const PROBLEM_STATS_QUERY_KEY = "problem-stats";

export function useProblemStats(enabled = true) {
  return useQuery({
    queryKey: [PROBLEM_STATS_QUERY_KEY],
    queryFn: getCompletedProblemsStats,
    enabled,
    refetchOnWindowFocus: false,
  });
}
