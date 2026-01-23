import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  adminLoginApi,
  type AdminUser,
  type LoginPayload,
} from "@/api/login/loginController";
import { Toast } from "@case-study/ui";
import i18n from "@/i18n/config";

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
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await adminLoginApi(credentials);

      Toast.toastManager.add({
        title: i18n.t("common.success"),
        description: i18n.t("login.success"),
        type: "success",
      });

      return response.data;
    } catch (error: unknown) {
      const messageKey =
        error instanceof AxiosError
          ? error.response?.data?.message || "login.error"
          : "login.error";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
        type: "error",
      });

      return rejectWithValue(messageKey);
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
