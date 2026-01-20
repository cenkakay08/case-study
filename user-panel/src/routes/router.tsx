import { createBrowserRouter, Navigate } from "react-router";
import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CreateRequest from "@/pages/CreateRequest/CreateRequest";
import MyRequests from "@/pages/MyRequests/MyRequests";
import ProviderLayout from "@/components/Layouts/ProviderLayout/ProviderLayout";
import AuthGuardLayout from "@/components/Layouts/AuthGuardLayout/AuthGuardLayout";
import MainLayout from "@/components/Layouts/MainLayout/MainLayout";

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
            element: <MainLayout />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "create-request",
                element: <CreateRequest />,
              },
              {
                path: "my-requests",
                element: <MyRequests />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
