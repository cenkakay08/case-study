import { createBrowserRouter, Navigate } from "react-router";
import Login from "@/pages/Login/Login";
import AuthGuardLayout from "@/components/Layouts/AuthGuardLayout/AuthGuardLayout";
import LoginGuardLayout from "@/components/Layouts/LoginGuardLayout/LoginGuardLayout";
import MainLayout from "@/components/Layouts/MainLayout/MainLayout";

// Temporary components until implemented
const Dashboard = () => <div>Admin Dashboard (Work in Progress)</div>;
const PendingRequests = () => <div>Pending Requests (Work in Progress)</div>;
const AllRequests = () => <div>All Requests (Work in Progress)</div>;
const UserManagement = () => <div>User Management (Work in Progress)</div>;

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
                path: "pending-requests",
                element: <PendingRequests />,
              },
              {
                path: "all-requests",
                element: <AllRequests />,
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
