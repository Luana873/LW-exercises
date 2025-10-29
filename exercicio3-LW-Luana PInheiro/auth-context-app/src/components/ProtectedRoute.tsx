import { useContext } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
