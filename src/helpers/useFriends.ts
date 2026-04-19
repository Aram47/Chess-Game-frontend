import { useQuery } from "@tanstack/react-query";
import { listFriends } from "../api/friends";

export const useFriends = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: listFriends,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
