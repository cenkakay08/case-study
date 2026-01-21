import { createBrowserRouter, Navigate } from "react-router";
import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import PendingTasks from "@/pages/PendingTasks/PendingTasks";
import AllTasks from "@/pages/AllTasks/AllTasks";
import UserManagement from "@/pages/UserManagement/UserManagement";
import AuthGuardLayout from "@/components/Layouts/AuthGuardLayout/AuthGuardLayout";
import LoginGuardLayout from "@/components/Layouts/LoginGuardLayout/LoginGuardLayout";
import MainLayout from "@/components/Layouts/MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
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
                path: "pending-tasks",
                element: <PendingTasks />,
              },
              {
                path: "all-tasks",
                element: <AllTasks />,
              },

              {
                path: "user-management",
                element: <UserManagement />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
