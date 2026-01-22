import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import taskReducer from "@/store/slices/taskSlice";
import { authListenerMiddleware } from "@/store/listenerMiddleware";
import { injectStore as injectAxiosStore } from "@/api/axios";
import { injectStore as injectWSStore } from "@/api/websocket";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
});

// Inject store into API utilities to avoid circular dependencies
injectAxiosStore(store);
injectWSStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
