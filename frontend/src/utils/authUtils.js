export const hasRole = (
  user,
  role
) => user?.role === role;

export const isAdmin = (user) =>
  user?.role === "ADMIN";

export const isStudent = (user) =>
  user?.role === "STUDENT";

export const isLoggedIn = () =>
  !!localStorage.getItem("token");