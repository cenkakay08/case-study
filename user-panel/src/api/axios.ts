import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { logout } from "@/store/slices/authSlice";
import type { RootState, AppDispatch } from "@/store";

interface InjectedStore {
  getState: () => RootState;
  dispatch: AppDispatch;
}

let store: InjectedStore;

export const injectStore = (_store: InjectedStore) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (Optional - for adding tokens etc.)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token directly from store state
    const token = store?.getState()?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);

// Response interceptor (Optional - for global error handling)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        if (store) {
          store.dispatch(logout());
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
