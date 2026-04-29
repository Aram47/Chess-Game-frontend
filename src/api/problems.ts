import type {
  //   GetProblemsParams,
  //   GetProblemsResponse,
  GetProblemsParams,
  ChessProblem,
} from "../types/problems";
import api from "./axiosIntance";

export const problemsApi = {
  getProblems: async (params: GetProblemsParams) => {
    const res = await api.get("/game/problems", { params });
    console.log("res", res);
    return res.data;
  },

  // Replace your getSearchProblems with this:
  //   getSearchProblems: async (
  //     params: GetProblemsParams = {},
  //   ): Promise<GetProblemsResponse> => {
  //     const { page, limit, categoryId, ...rest } = params;

  //     const response = await api.get("/game/problems", {
  //       params: {
  //         ...rest,
  //         page: page ? Number(page) : 1,
  //         limit: limit ? Number(limit) : 10,
  //         categoryId: categoryId ? Number(categoryId) : undefined,
  //       },
  //     });
  //     return response.data;
  //   },

  getProblemById: async (id: number): Promise<ChessProblem> => {
    const response = await api.get(`/problems/${id}`);
    return response.data;
  },

  submitMove: async (
    id: number,
    move: { from: string; to: string; promotion?: string },
  ): Promise<any> => {
    const response = await api.post(`/problems/${id}/move`, move);
    return response.data;
  },
};
