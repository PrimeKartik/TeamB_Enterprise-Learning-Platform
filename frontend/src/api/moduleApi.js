import api from "./client";

export const moduleApi = {
  getByCourse: (courseId) => api.get(`/courses/${courseId}/modules`),
};
