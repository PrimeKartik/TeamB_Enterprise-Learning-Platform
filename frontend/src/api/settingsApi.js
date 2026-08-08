import client from "./client";

// Profile data lives on profileApi (/api/users/profile) — this module only
// covers the one genuinely separate settings action: changing your password.
// The previous version of this file pointed at /settings/*, none of which
// exist on the backend, so every settings action silently failed.
export const settingsApi = {

  changePassword(data) {
    return client.put("/users/change-password", data);
  },

};
