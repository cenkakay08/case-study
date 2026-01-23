import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Toast } from "@case-study/ui";
import {
  fetchAdminUsersApi,
  createAdminUserApi,
  updateAdminUserApi,
  deleteAdminUserApi,
  type AdminUser,
  type CreateAdminUserPayload,
  type UpdateAdminUserPayload,
} from "@/api/users/userController";
import i18n from "@/i18n/config";
import { AxiosError } from "axios";

interface UserState {
  users: AdminUser[];
  isLoading: boolean;
  error: string | null;
  currentRequestId: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  currentRequestId: null,
};

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await fetchAdminUsersApi(signal);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data?.message || "common.fetchError"
          : "common.error",
      );
    }
  },
);

export const createUserAsync = createAsyncThunk(
  "users/create",
  async (user: CreateAdminUserPayload, { rejectWithValue }) => {
    try {
      const response = await createAdminUserApi(user);

      Toast.toastManager.add({
        title: i18n.t("common.success"),
        description: i18n.t("userManagement.createSuccess"),
        type: "success",
      });

      return response.data;
    } catch (error: unknown) {
      const messageKey =
        error instanceof AxiosError
          ? error.response?.data?.message || "common.error"
          : "common.error";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
      });

      return rejectWithValue(messageKey);
    }
  },
);

export const updateUserAsync = createAsyncThunk(
  "users/update",
  async (
    { userId, user }: { userId: string; user: UpdateAdminUserPayload },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateAdminUserApi(userId, user);

      Toast.toastManager.add({
        title: i18n.t("common.success"),
        description: i18n.t("userManagement.updateSuccess"),
        type: "success",
      });

      return response.data;
    } catch (error: unknown) {
      const messageKey =
        error instanceof AxiosError
          ? error.response?.data?.message || "common.error"
          : "common.error";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
      });

      return rejectWithValue(messageKey);
    }
  },
);

export const deleteUserAsync = createAsyncThunk(
  "users/delete",
  async (userId: string, { rejectWithValue }) => {
    try {
      await deleteAdminUserApi(userId);

      Toast.toastManager.add({
        title: i18n.t("common.success"),
        description: i18n.t("userManagement.deleteSuccess"),
        type: "success",
      });

      return userId;
    } catch (error: unknown) {
      const messageKey =
        error instanceof AxiosError
          ? error.response?.data?.message || "common.error"
          : "common.error";

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t(messageKey),
        type: "error",
      });

      return rejectWithValue(messageKey);
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userCreated: (state, action: PayloadAction<AdminUser>) => {
      const exists = state.users.find((u) => u.id === action.payload.id);
      if (!exists) {
        state.users.push(action.payload);
      }
    },
    userUpdated: (state, action: PayloadAction<AdminUser>) => {
      const user = state.users.find((u) => u.id === action.payload.id);
      if (user) {
        Object.assign(user, action.payload);
      }
    },
    userDeleted: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.filter((u) => u.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(
        fetchUsersAsync.fulfilled,
        (
          state,
          action: PayloadAction<AdminUser[], string, { requestId: string }>,
        ) => {
          if (
            state.currentRequestId === action.meta.requestId ||
            state.currentRequestId === null
          ) {
            state.isLoading = false;
            state.currentRequestId = null;
            state.users = action.payload;
          }
        },
      )
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        if (
          state.currentRequestId === action.meta.requestId ||
          state.currentRequestId === null
        ) {
          state.isLoading = false;
          state.currentRequestId = null;
          state.error = action.payload as string;
        }
      })
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<AdminUser>) => {
          const exists = state.users.find((u) => u.id === action.payload.id);
          if (!exists) {
            state.users.push(action.payload);
          }
        },
      )
      .addCase(
        updateUserAsync.fulfilled,
        (state, action: PayloadAction<AdminUser>) => {
          const index = state.users.findIndex(
            (u) => u.id === action.payload.id,
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        },
      )
      .addCase(
        deleteUserAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.users = state.users.filter((u) => u.id !== action.payload);
        },
      );
  },
});

export const { userCreated, userUpdated, userDeleted } = userSlice.actions;
export default userSlice.reducer;
