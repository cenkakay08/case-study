import axiosInstance from "@/api/axios";

export const USER_ROLES = {
  ADMIN: "Admin",
  MODERATOR: "Moderator",
  VIEWER: "Viewer",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface CreateAdminUserPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateAdminUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
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
