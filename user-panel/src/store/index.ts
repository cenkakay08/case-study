import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import taskReducer from "@/store/slices/taskSlice";
import { authListenerMiddleware } from "@/store/listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
