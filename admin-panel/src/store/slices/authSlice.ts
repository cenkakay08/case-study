import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Moderator" | "Viewer";
}

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const getInitialState = (): AuthState => {
  const savedState = localStorage.getItem("adminAuthState");
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch {
      // ignore
    }
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

export const adminLoginAsync = createAsyncThunk(
  "auth/adminLogin",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/admin/login",
        credentials,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        adminLoginAsync.fulfilled,
        (state, action: PayloadAction<{ user: AdminUser; token: string }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
      )
      .addCase(adminLoginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
