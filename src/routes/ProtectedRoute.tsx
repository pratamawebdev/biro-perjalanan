import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined") {
    return <Navigate to={"/login"} />;
  }

  return <div>{children || <Outlet />}</div>;
};

export default ProtectedRoute;
