import { createBrowserRouter, Navigate } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProviderLayout from "../components/Layouts/ProviderLayout";
import AuthGuardLayout from "../components/Layouts/AuthGuardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProviderLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <AuthGuardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
