import axiosInstance from "@/api/axios";
import type { UserRole } from "../users/userController";

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

export const adminLoginApi = (payload: LoginPayload) => {
  return axiosInstance.post<LoginResponse>("/auth/admin/login", payload);
};
