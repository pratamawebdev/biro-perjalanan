import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRouteToLogin: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={"/"} />;
  }

  return <div>{children || <Outlet />}</div>;
};

export default ProtectedRouteToLogin;
