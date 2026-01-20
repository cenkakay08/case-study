import axiosInstance from "@/api/axios";

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const loginApi = (payload: LoginPayload) => {
  return axiosInstance.post<LoginResponse>("/auth/login", payload);
};
