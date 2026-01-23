import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hooks";

const LoginGuardLayout: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default LoginGuardLayout;
