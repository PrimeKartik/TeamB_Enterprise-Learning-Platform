import api from "./client";

export const courseApi = {
  getAll: () => api.get("/courses"),

  getAdminAll: () =>
    api.get("/courses/admin"),

  getById: (id) =>
    api.get(`/courses/${id}`),

  create: (course) =>
    api.post("/courses", course),

  update: (id, course) =>
    api.put(`/courses/${id}`, course),

  remove: (id) =>
    api.delete(`/courses/${id}`),
};