import api from "./client";

export const chatApi = {
  send: (message, history = []) =>
    api.post("/chat", {
      message,
      history,
    }),
};