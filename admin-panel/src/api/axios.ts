import axios from "axios";
import { logout } from "@/store/slices/authSlice";
import type { AppDispatch, RootState } from "@/store/store";

interface InjectedStore {
  getState: () => RootState;
  dispatch: AppDispatch;
}

let store: InjectedStore | null = null;
let clientId: string | null = null;

export const injectAxiosStore = (_store: InjectedStore, _clientId: string) => {
  store = _store;
  clientId = _clientId;
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
    config.headers["x-client-id"] = clientId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (store) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
