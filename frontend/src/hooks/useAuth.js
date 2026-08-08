import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";

export default function useAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError("");

      const res = await authApi.login(credentials);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      setError("");

      const res = await authApi.register(data);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return {
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated,
    loading,
    error,
  };
}