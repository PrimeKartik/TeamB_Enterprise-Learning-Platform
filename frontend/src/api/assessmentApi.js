import api from "./client";

export const assessmentApi = {
  // Returns one assessment summary per course the current user is enrolled in.
  getAssessments: () => api.get("/assessments"),

  // Generates a fresh set of AI questions for this course (must be enrolled).
  startAssessment: (courseId) => api.post(`/assessments/${courseId}/start`),
};