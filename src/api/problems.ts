import type {
  GetProblemsParams,
  ChessProblem,
  GetProblemsResponse,
} from "../types/problems";
import api from "./axiosIntance";

export const problemsApi = {
  getProblems: async (
    params: GetProblemsParams = {},
  ): Promise<GetProblemsResponse> => {
    const { data } = await api.get<GetProblemsResponse>("/game/problems", {
      params,
    });
    return data;
  },

  startProblem: async (id: number): Promise<ChessProblem> => {
    const { data } = await api.post<ChessProblem>(`/game/problems/${id}/start`);
    return data;
  },

  submitMove: async (
    id: number,
    move: { from: string; to: string; promotion?: string },
  ): Promise<ChessProblem> => {
    const { data } = await api.post<ChessProblem>(
      `/game/problems/${id}/move`,
      move,
    );
    return data;
  },
};
