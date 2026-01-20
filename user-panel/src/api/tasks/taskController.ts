import axiosInstance from "@/api/axios";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "normal" | "high" | "urgent";
  category: string;
  status: "pending" | "approved" | "rejected";
  createdBy: string;
  createdAt: string;
  rejectionReason?: string;
}

export const fetchTasksApi = (abortSignal?: AbortSignal) => {
  return axiosInstance.get<Task[]>("/tasks", { signal: abortSignal });
};

export const createTaskApi = (
  task: Omit<Task, "id" | "createdBy" | "createdAt" | "status">,
) => {
  return axiosInstance.post<Task>("/tasks", task);
};
