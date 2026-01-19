import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authListenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
