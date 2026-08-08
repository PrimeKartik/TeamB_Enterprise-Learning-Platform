import api from "./client";

export const newsletterApi = {
  subscribe: (email) =>
    api.post("/newsletter/subscribe", {
      email,
    }),
};