import api from "./client";

export const wishlistApi = {
  getMyWishlist: () => api.get("/wishlist"),

  save: (courseId) => api.post(`/wishlist/${courseId}`),

  remove: (courseId) => api.delete(`/wishlist/${courseId}`),

  toggle: (courseId) => api.post(`/wishlist/${courseId}/toggle`),
};
