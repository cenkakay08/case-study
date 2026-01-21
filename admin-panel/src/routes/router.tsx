import { createBrowserRouter, Navigate } from "react-router";
import Login from "@/pages/Login/Login";
import AuthGuardLayout from "@/components/Layouts/AuthGuardLayout/AuthGuardLayout";
import LoginGuardLayout from "@/components/Layouts/LoginGuardLayout/LoginGuardLayout";

// Temporary Dashboard component until implemented
const Dashboard = () => <div>Admin Dashboard (Work in Progress)</div>;

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
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
