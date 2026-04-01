import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "@/store/userStore";

const api = axios.create({
  baseURL: "http://localhost:3030/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const forceLogout = () => {
  useUserStore.getState().logout();
  window.location.href = "/login";
};


api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch {
        forceLogout();
        return Promise.reject(error);
      }
    }

    if (status === 401) {
      forceLogout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
