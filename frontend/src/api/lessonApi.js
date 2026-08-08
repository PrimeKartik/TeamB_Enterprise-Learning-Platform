import api from "./client";

export const lessonApi = {
  getByCourse: (courseId) =>
    api.get(`/courses/${courseId}/lessons`),

  getById: (lessonId) =>
    api.get(`/lessons/${lessonId}`),

  complete: (lessonId) =>
    api.patch(`/lessons/${lessonId}/complete`),
};