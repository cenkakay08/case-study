import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hooks";
import type { UserRole } from "@/api/users/userController";

interface RoleGuardLayoutProps {
  allowedRoles: UserRole[];
  mode: "AND" | "OR";
}

export const RoleGuardLayout: React.FC<RoleGuardLayoutProps> = ({
  allowedRoles,
  mode,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasAccess = user
    ? mode === "OR"
      ? allowedRoles.includes(user.role)
      : allowedRoles.every((role) => user.role === role)
    : false;

  return hasAccess ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
