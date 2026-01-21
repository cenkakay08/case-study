import axiosInstance from "@/api/axios";

export const TASK_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "normal" | "high" | "urgent";
  category: string;
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
  createdBy: string;
  createdAt: string;
  rejectionReason?: string;
}

export const fetchTasksApi = (abortSignal?: AbortSignal) => {
  return axiosInstance.get<Task[]>("/tasks", { signal: abortSignal });
};

export const approveTaskApi = (taskId: string, signal?: AbortSignal) => {
  return axiosInstance.patch<Task>(
    `/tasks/${taskId}`,
    {
      status: TASK_STATUS.APPROVED,
    },
    { signal },
  );
};

export const rejectTaskApi = (
  taskId: string,
  rejectionReason: string,
  signal?: AbortSignal,
) => {
  return axiosInstance.patch<Task>(
    `/tasks/${taskId}`,
    {
      status: TASK_STATUS.REJECTED,
      rejectionReason,
    },
    { signal },
  );
};
