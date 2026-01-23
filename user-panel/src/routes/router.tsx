import { createBrowserRouter, Navigate } from "react-router";
import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CreateTask from "@/pages/CreateTask/CreateTask";
import MyTasks from "@/pages/MyTasks/MyTasks";
import ProviderLayout from "@/components/Layouts/ProviderLayout/ProviderLayout";
import AuthGuardLayout from "@/components/Layouts/AuthGuardLayout/AuthGuardLayout";
import MainLayout from "@/components/Layouts/MainLayout/MainLayout";

import LoginGuardLayout from "@/components/Layouts/LoginGuardLayout/LoginGuardLayout";

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
        element: <LoginGuardLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
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
                path: "create-task",
                element: <CreateTask />,
              },
              {
                path: "my-tasks",
                element: <MyTasks />,
              },
            ],
          },
          {
            path: "*",
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ],
  },
]);
