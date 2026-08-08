import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function PublicRoute({
  children,
}) {
  const { isAuthenticated, user } =
    useAuthContext();

  if (isAuthenticated) {
    return (
      <Navigate
        to={
          user?.role === "ADMIN"
            ? "/admin/dashboard"
            : "/dashboard"
        }
        replace
      />
    );
  }

  return children;
}