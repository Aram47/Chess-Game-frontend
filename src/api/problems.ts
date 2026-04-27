import type {
  ChessProblem,
//   GetProblemsParams,
//   GetProblemsResponse,
  ProblemTheme,
  ProblemCategory,
} from "../types/problems";
import api from "./axiosIntance";

export const problemsApi = {
  getProblems: async () => {
    const res = await api.get("/game/problems");
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

  getCategories: async (): Promise<ProblemCategory[]> => {
    const response = await api.get("/problem-categories");
    return response.data;
  },

  getProblemById: async (
    id: number,
  ): Promise<ChessProblem & { themes: ProblemTheme[] }> => {
    const response = await api.get(`/problems/${id}`);
    return response.data;
  },
};
