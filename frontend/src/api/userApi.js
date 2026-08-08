import api from "./client";

export const userApi = {
  getProfile: () =>
    api.get("/users/profile"),

  updateProfile: (data) =>
    api.put("/users/profile", data),

  getMyCertificates: () =>
    api.get("/users/certificates"),
};