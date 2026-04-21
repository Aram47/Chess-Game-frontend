import { useQuery } from "@tanstack/react-query";
import { getMyGameHistory } from "../api/history";

export const useGameHistory = () => {
  return useQuery({
    queryKey: ["game-history"],
    queryFn: () => getMyGameHistory(1, 50),
    refetchOnWindowFocus: false
  });
};
