import type {
  AuthResponse,
  ILoginPayload,
  IRegisterPayload,
  IResetPassword,
  RefreshResponse,
} from "../types/authType";
import api from "./axiosIntance";

export const loginProvider = async (
  data: ILoginPayload,
): Promise<AuthResponse> => {
  const response = await api.post(`/api/login`, data);
  return response.data;
};

export const registerProvider = async (
  data: IRegisterPayload,
): Promise<void> => {
  const response = await api.post(`/api/register`, data);
  return response.data;
};

export const refreshProvider = async (
  refreshToken: string,
): Promise<RefreshResponse> => {
  const response = await api.post(`/api/refresh`, { refreshToken });
  return response.data;
};

export const resetPasswordProvider = async (data: IResetPassword): Promise<void> => {
  const response = await api.post(`/api/reset-password`, data);
  return response.data;
};

