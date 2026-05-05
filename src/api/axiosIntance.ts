import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isRefreshCall = originalRequest.url?.includes("/api/refresh");
    const isLoginCall = originalRequest.url?.includes("/api/login");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall &&
      !isLoginCall
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/api/refresh");
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
