import axiosInstance from "../axios";

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

export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    payload,
  );
  return response.data;
};
