import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateMyProfile } from "../api/profile";

export const useProfileApi = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      // ONLY invalidate the profile query, not the friends query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
