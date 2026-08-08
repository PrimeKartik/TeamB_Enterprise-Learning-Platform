import api from "./client";

export const authApi = {
  login: (email, password) =>
    api.post("/auth/login", { email, password }),

  register: (name, email, password) =>
    api.post("/auth/register", {
      name,
      email,
      password,
    }),

  google: (credential) =>
    api.post("/auth/google", { credential }),

  forgotPassword: (email) =>
    api.post("/auth/forgot-password", { email }),

  verifyResetToken: (token) =>
    api.get(`/auth/verify-reset-token?token=${token}`),

  resetPassword: (token, newPassword) =>
    api.post("/auth/reset-password", {
      token,
      newPassword,
    }),
};