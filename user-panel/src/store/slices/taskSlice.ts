import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Toast } from "@case-study/ui";
import {
  fetchTasksApi,
  createTaskApi,
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
      if (error instanceof AxiosError) {
        if (error.name === "CanceledError") {
          return rejectWithValue("Aborted");
        }

        return rejectWithValue(
          error.response?.data?.message || "common.fetchError",
        );
      }

      return rejectWithValue("common.fetchError");
    }
  },
);

export const createTaskAsync = createAsyncThunk(
  "tasks/create",
  async (
    task: Omit<Task, "id" | "createdBy" | "createdAt" | "status">,
    { rejectWithValue },
  ) => {
    try {
      const response = await createTaskApi(task);

      Toast.toastManager.add({
        title: i18n.t("common.success"),
        description: i18n.t("success.requestCreated"),
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const messageKey =
          error.response?.data?.message || "common.createError";

        Toast.toastManager.add({
          title: i18n.t("common.error"),
          description: i18n.t(messageKey),
        });

        return rejectWithValue(messageKey);
      }

      return rejectWithValue("common.createError");
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskCreated: (state, action: PayloadAction<Task>) => {
      // Avoid double unshift if the task was already added by the async thunk
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
      .addCase(createTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.isLoading = false;
          state.tasks.unshift(action.payload);
        },
      )
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { taskCreated, taskUpdated, taskDeleted } = taskSlice.actions;
export default taskSlice.reducer;
