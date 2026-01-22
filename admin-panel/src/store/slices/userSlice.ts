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
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await fetchAdminUsersApi(signal);
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

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t("common.error"),
      });

      return rejectWithValue("common.error");
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
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const messageKey = error.response?.data?.message || "common.error";

        Toast.toastManager.add({
          title: i18n.t("common.error"),
          description: i18n.t(messageKey),
        });

        return rejectWithValue(messageKey);
      }

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t("common.error"),
      });

      return rejectWithValue("common.error");
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
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const messageKey = error.response?.data?.message || "common.error";

        Toast.toastManager.add({
          title: i18n.t("common.error"),
          description: i18n.t(messageKey),
        });

        return rejectWithValue(messageKey);
      }

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t("common.error"),
      });

      return rejectWithValue("common.error");
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
      });

      return userId;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const messageKey = error.response?.data?.message || "common.error";

        Toast.toastManager.add({
          title: i18n.t("common.error"),
          description: i18n.t(messageKey),
        });

        return rejectWithValue(messageKey);
      }

      Toast.toastManager.add({
        title: i18n.t("common.error"),
        description: i18n.t("common.error"),
      });

      return rejectWithValue("common.error");
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
      .addCase(fetchUsersAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersAsync.fulfilled,
        (state, action: PayloadAction<AdminUser[]>) => {
          state.isLoading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createUserAsync.fulfilled,
        (state, action: PayloadAction<AdminUser>) => {
          state.users.push(action.payload);
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
