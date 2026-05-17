import axios, { type InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from "./refreshSession";

export const API_BASE_URL = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

type AuthAxiosConfig = InternalAxiosRequestConfig & {
  skipAuthRefresh?: boolean;
  _retry?: boolean;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AuthAxiosConfig | undefined;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url ?? "";
    const isRefreshCall = requestUrl.includes("/api/refresh");
    const isLoginCall = requestUrl.includes("/api/login");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh &&
      !isRefreshCall &&
      !isLoginCall
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return api(originalRequest);
      } catch {
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
