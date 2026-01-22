import axiosInstance from "@/api/axios";

export const TASK_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const TASK_PRIORITY = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];
  category: string;
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
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
