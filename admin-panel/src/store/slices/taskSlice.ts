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
    } catch (error: any) {
      if (error.name === "CanceledError") {
        return rejectWithValue("Aborted");
      }
      return rejectWithValue(
        error.response?.data?.message || "common.fetchError",
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
      });

      return response.data;
    } catch (error: any) {
      const messageKey = error.response?.data?.message || "common.error";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
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
      });

      return response.data;
    } catch (error: any) {
      const messageKey = error.response?.data?.message || "common.error";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
      });

      return rejectWithValue(messageKey);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
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

export default taskSlice.reducer;
