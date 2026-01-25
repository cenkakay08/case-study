import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { adminLoginAsync, logout } from "@/store/slices/authSlice";
import type { RootState } from "@/store/store";
import { connectWebSocket, disconnectWebSocket } from "@/api/websocket";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  matcher: isAnyOf(adminLoginAsync.fulfilled, logout),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const authState = state.auth;

    // Persist entire auth slice
    localStorage.setItem("adminAuthState", JSON.stringify(authState));

    if (authState.isAuthenticated && authState.token) {
      connectWebSocket(authState.token);
    } else {
      disconnectWebSocket();
    }
  },
});
