import { useQuery } from "@tanstack/react-query";
import { getAchievements } from "../api/achievements";

export const ACHIEVEMENTS_QUERY_KEY = "achievements";

export function useAchievements(enabled = true) {
  return useQuery({
    queryKey: [ACHIEVEMENTS_QUERY_KEY],
    queryFn: getAchievements,
    enabled,
    refetchOnWindowFocus: false,
  });
}
