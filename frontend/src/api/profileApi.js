import client from "./client";

export const profileApi = {

  getProfile() {
    return client.get("/users/profile");
  },

  updateProfile(data) {
    return client.put("/users/profile", data);
  },

};