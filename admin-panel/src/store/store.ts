import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import userReducer from "./slices/userSlice";
import { injectStore as injectAxiosStore } from "@/api/axios";
import { injectStore as injectWSStore } from "@/api/websocket";
import { authListenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
});

// Inject store into API utilities to avoid circular dependencies
injectAxiosStore(store);
injectWSStore(store);

// Connect WebSocket on initial load if token exists
if (store.getState().auth.token) {
  import("@/api/websocket").then(({ connectWebSocket }) => {
    connectWebSocket();
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
