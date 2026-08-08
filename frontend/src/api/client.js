import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // getToken() resolves to whichever storage the current login marked as
    // active — never a leftover token from a previous session in the other
    // storage. Reading with `localStorage || sessionStorage` here previously
    // meant every API request (enrollments, wishlist-adjacent data, etc.)
    // could silently authenticate as a stale, previously-logged-in user.
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Defense-in-depth: the browser's HTTP cache keys GET responses by URL
    // only, NOT by the Authorization header. Without these, a GET made by
    // User1 (e.g. /api/wishlist) could be served straight from cache to
    // User2 after they log in, making per-user data look "shared". The
    // backend also sends Cache-Control: no-store on every response, but we
    // set it here too so a fresh network request is always made.
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;