import { authApi } from "../api/authApi";

const authService = {
  login: (data) => authApi.login(data),

  register: (data) =>
    authApi.register(data),

  logout: () => {
    localStorage.clear();
  },

  getProfile: () =>
    authApi.getProfile(),
};

export default authService;