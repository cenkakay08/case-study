import { createBrowserRouter, Navigate } from "react-router";
import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import PendingTasks from "@/pages/PendingTasks/PendingTasks";
import AllTasks from "@/pages/AllTasks/AllTasks";
import UserManagement from "@/pages/UserManagement/UserManagement";
import AuthGuardLayout from "@/components/Layouts/AuthGuardLayout/AuthGuardLayout";
import LoginGuardLayout from "@/components/Layouts/LoginGuardLayout/LoginGuardLayout";
import MainLayout from "@/components/Layouts/MainLayout/MainLayout";
import ProviderLayout from "@/components/Layouts/ProviderLayout/ProviderLayout";
import { RoleGuardLayout } from "@/components/Layouts/RoleGuardLayout/RoleGuardLayout";
import { USER_ROLES } from "@/api/users/userController";

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
                path: "pending-tasks",
                element: <PendingTasks />,
              },
              {
                element: (
                  <RoleGuardLayout
                    allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]}
                    mode="OR"
                  />
                ),
                children: [
                  {
                    path: "all-tasks",
                    element: <AllTasks />,
                  },
                ],
              },
              {
                element: (
                  <RoleGuardLayout
                    allowedRoles={[USER_ROLES.ADMIN]}
                    mode="AND"
                  />
                ),
                children: [
                  {
                    path: "user-management",
                    element: <UserManagement />,
                  },
                ],
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
