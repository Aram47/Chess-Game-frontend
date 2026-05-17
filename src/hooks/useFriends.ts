import { useQuery } from "@tanstack/react-query";
import { listFriends } from "../api/friends";

export const useFriends = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: listFriends,
    enabled: options?.enabled ?? true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
