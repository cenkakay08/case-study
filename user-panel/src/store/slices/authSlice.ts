import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Toast } from "@case-study/ui";
import { router } from "@/routes/router";
import {
  loginApi,
  type LoginPayload,
  type User,
} from "@/api/login/loginController";
import { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const getInitialState = (): AuthState => {
  const savedState = localStorage.getItem("authState");
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch {
      // If parsing fails, use default initial state
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

export const loginAsyncThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);

      Toast.toastManager.add({
        title: "Başarılı",
        description: "Giriş yapıldı, hoş geldiniz!",
      });

      router.navigate("/dashboard");

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || "Giriş başarısız oldu";

        Toast.toastManager.add({
          title: "Hata",
          description: message,
        });

        return rejectWithValue(message);
      }

      Toast.toastManager.add({
        title: "Hata",
        description: "Giriş başarısız oldu",
      });

      return rejectWithValue("Giriş başarısız oldu");
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
      .addCase(loginAsyncThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginAsyncThunk.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
      )
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
