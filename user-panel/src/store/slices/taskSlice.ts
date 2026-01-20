import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchTasksApi, type Task } from "../../api/tasks/taskController";

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
      });
  },
});

export default taskSlice.reducer;
