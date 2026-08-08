import api from "./client";

export const enrollmentApi = {
  enroll: (courseId) =>
    api.post("/enrollments", { courseId }),

  getDashboard: () =>
    api.get("/enrollments/dashboard"),

  getMyEnrollments: () =>
    api.get("/enrollments/my"),

  // Alias kept for pages that call getMine() — same endpoint as getMyEnrollments.
  getMine: () =>
    api.get("/enrollments/my"),

  updateProgress: (courseId, progress) =>
    api.patch(
      `/enrollments/${courseId}/progress`,
      { progress }
    ),

  continueLearning: (courseId) =>
    api.get(`/enrollments/${courseId}/continue`),

  completeAssessment: (courseId, score, total) =>
    api.post(`/enrollments/${courseId}/complete-assessment`, { score, total }),
};