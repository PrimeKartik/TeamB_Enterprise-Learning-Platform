import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { getToken, getStoredUser, setActiveStorage, logout as clearAuthStorage } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(false);

  // credentials: { email, password }
  // rememberMe: true -> persist in localStorage, false -> sessionStorage only
  const login = async (credentials, rememberMe = true) => {
    setLoading(true);

    try {
      const res = await authApi.login(credentials.email, credentials.password);
      return applyAuthResponse(res.data, rememberMe);
    } finally {
      setLoading(false);
    }
  };

  // Shared by login() and register() — backend returns a flat
  // { token, name, email, role } for both endpoints.
  function applyAuthResponse(data, rememberMe = true) {
    const loggedInUser = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    // Marks exactly one storage as authoritative and clears the other,
    // so a previous session's leftover token can never be read again.
    const storage = setActiveStorage(rememberMe);

    storage.setItem("token", data.token);
    storage.setItem("user", JSON.stringify(loggedInUser));

    setToken(data.token);
    setUser(loggedInUser);

    return { token: data.token, user: loggedInUser };
  }

  const register = async (data) => {
    const res = await authApi.register(data.name, data.email, data.password);
    return applyAuthResponse(res.data, true);
  };

  const logout = () => {
    clearAuthStorage();
    setUser(null);
    setToken(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authApi.getProfile?.();
      if (res) {
        setUser(res.data);

        // Write back into whichever storage is currently active, not
        // always localStorage — otherwise a sessionStorage-only login
        // would leak a stale user record into localStorage.
        const active = localStorage.getItem("auth-storage") === "local" ? localStorage : sessionStorage;
        active.setItem("user", JSON.stringify(res.data));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token && !user) {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
        applyAuthResponse,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
export const useAuth = () => useContext(AuthContext);
