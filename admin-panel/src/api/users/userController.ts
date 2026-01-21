import axiosInstance from "@/api/axios";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Moderator" | "Viewer";
}

export interface CreateAdminUserPayload {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Moderator" | "Viewer";
}

export interface UpdateAdminUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: "Admin" | "Moderator" | "Viewer";
}

export const fetchAdminUsersApi = (abortSignal?: AbortSignal) => {
  return axiosInstance.get<AdminUser[]>("/admin-users", {
    signal: abortSignal,
  });
};

export const createAdminUserApi = (user: CreateAdminUserPayload) => {
  return axiosInstance.post<AdminUser>("/admin-users", user);
};

export const updateAdminUserApi = (
  userId: string,
  user: UpdateAdminUserPayload,
) => {
  return axiosInstance.patch<AdminUser>(`/admin-users/${userId}`, user);
};

export const deleteAdminUserApi = (userId: string) => {
  return axiosInstance.delete(`/admin-users/${userId}`);
};
