import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { injectStore } from "@/api/axios";
import "@/index.css";
import { RouterProvider } from "react-router";
import { router } from "@/routes/router";
import "@/i18n/config";

injectStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
