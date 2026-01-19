import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { loginAsyncThunk, logout } from "./slices/authSlice";
import type { RootState } from "./index";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  matcher: isAnyOf(loginAsyncThunk.fulfilled, logout),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const authState = state.auth;

    // Persist entire auth slice
    localStorage.setItem("authState", JSON.stringify(authState));
  },
});
