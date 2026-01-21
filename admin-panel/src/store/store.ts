import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { injectStore } from "@/api/axios";
import { authListenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authListenerMiddleware.middleware),
});

// Inject store into axios instance to avoid circular dependencies
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
