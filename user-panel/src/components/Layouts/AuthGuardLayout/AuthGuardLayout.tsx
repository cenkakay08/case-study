import React from "react";
import { Navigate, Outlet } from "react-router";
import { Toast, ToastList } from "@case-study/ui";
import { useAppSelector } from "@/store/hooks";

const AuthGuardLayout: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuardLayout;
