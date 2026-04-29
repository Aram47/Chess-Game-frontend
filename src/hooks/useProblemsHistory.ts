import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetProblemsParams } from "../types/problems";
import { problemsApi } from "../api/problems";

export const PROBLEMS_QUERY_KEY = "problems";

export const useProblemsQuery = (params: GetProblemsParams = {}) => {
  return useQuery({
    queryKey: [PROBLEMS_QUERY_KEY, params],
    queryFn: () => problemsApi.getProblems(params),
    refetchOnWindowFocus: false,
  });
};

export const useProblemByIdQuery = (id: number) => {
  return useQuery({
    queryKey: [PROBLEMS_QUERY_KEY, id],
    queryFn: () => problemsApi.getProblemById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useSubmitMoveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      move,
    }: {
      id: number;
      move: { from: string; to: string };
    }) => problemsApi.submitMove(id, move),
    onSuccess: (updatedProblem) => {
      // Update the cache so the history updates automatically
      queryClient.setQueryData(
        [PROBLEMS_QUERY_KEY, updatedProblem.id],
        updatedProblem,
      );
    },
  });
};
