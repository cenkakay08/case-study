<<<<<<< Updated upstream
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { injectAxiosStore } from "@/api/axios";
import { injectWebSocketStore } from "@/api/websocket";
import "@/index.css";
import { RouterProvider } from "react-router";
import { router } from "@/routes/router";
import "@/i18n/config";

const clientId =
  crypto.randomUUID?.() || Math.random().toString(36).substring(2);

injectAxiosStore(store, clientId);
injectWebSocketStore(store, clientId);

createRoot(document.getElementById("root")!).render(
>>>>>>> Stashed changes
  <StrictMode>
    <App />
  </StrictMode>,
)
