import { useAuthContext } from "../context/AuthContext";
import AdminLogin from "../pages/admin/AdminLogin";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return <AdminLogin />;
  }

  return children;
}