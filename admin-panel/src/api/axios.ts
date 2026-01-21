import axios from "axios";
import { logout } from "@/store/slices/authSlice";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (store) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
