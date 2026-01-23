import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Toast } from "@case-study/ui";
import {
  fetchTasksApi,
  approveTaskApi,
  rejectTaskApi,
  type Task,
} from "@/api/tasks/taskController";
import i18n from "@/i18n/config";
import { AxiosError } from "axios";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  currentRequestId: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
  currentRequestId: null,
};

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await fetchTasksApi(signal);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.message || "pendingTasks.fetchError"
          : "pendingTasks.fetchError",
      );
    }
  },
);

export const approveTaskAsync = createAsyncThunk(
  "tasks/approve",
  async (taskId: string, { rejectWithValue, signal }) => {
    try {
      const response = await approveTaskApi(taskId, signal);

      Toast.toastManager.add({
        title: i18n.t("common.success"),
        description: i18n.t("pendingTasks.approveSuccess"),
        type: "success",
      });

      return response.data;
    } catch (error: unknown) {
      const messageKey =
        error instanceof AxiosError
          ? error.response?.data?.message || "pendingTasks.approveError"
          : "pendingTasks.approveError";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
        type: "error",
      });

      return rejectWithValue(messageKey);
    }
  },
);

export const rejectTaskAsync = createAsyncThunk(
  "tasks/reject",
  async (
    { taskId, rejectionReason }: { taskId: string; rejectionReason: string },
    { rejectWithValue, signal },
  ) => {
    try {
      const response = await rejectTaskApi(taskId, rejectionReason, signal);

      Toast.toastManager.add({
        title: i18n.t("common.success"),
        description: i18n.t("pendingTasks.rejectSuccess"),
        type: "success",
      });

      return response.data;
    } catch (error: unknown) {
      const messageKey =
        error instanceof AxiosError
          ? error.response?.data?.message || "pendingTasks.rejectError"
          : "pendingTasks.rejectError";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
        type: "error",
      });

      return rejectWithValue(messageKey);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskCreated: (state, action: PayloadAction<Task>) => {
      const exists = state.tasks.find((t) => t.id === action.payload.id);
      if (!exists) {
        state.tasks.unshift(action.payload);
      }
    },
    taskUpdated: (state, action: PayloadAction<Task>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload);
      }
    },
    taskDeleted: (state, action: PayloadAction<{ id: string }>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state, action) => {
        state.isLoading = true;
        state.currentRequestId = action.meta.requestId;
        state.error = null;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.isLoading = false;
          state.currentRequestId = null;
        }
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.isLoading = false;
          state.currentRequestId = null;
          state.error = action.payload as string;
        }
      })
      .addCase(
        approveTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (t) => t.id === action.payload.id,
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        },
      )
      .addCase(
        rejectTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (t) => t.id === action.payload.id,
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        },
      );
  },
});

export const { taskCreated, taskUpdated, taskDeleted } = taskSlice.actions;
export default taskSlice.reducer;
