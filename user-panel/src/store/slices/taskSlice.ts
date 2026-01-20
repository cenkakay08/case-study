import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { toastManager } from "@/components/Toast/Toast";
import {
  fetchTasksApi,
  createTaskApi,
  type Task,
} from "@/api/tasks/taskController";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
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
        error.response?.data?.message || "Görevler yüklenemedi",
      );
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

      toastManager.add({
        title: "Başarılı",
        description: "Talebiniz başarıyla oluşturuldu.",
      });

      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Talep oluşturulamadı";

      toastManager.add({
        title: "Hata",
        description: message,
      });

      return rejectWithValue(message);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTasksAsync.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.isLoading = false;
          state.tasks = action.payload;
        },
      )
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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

export default taskSlice.reducer;
