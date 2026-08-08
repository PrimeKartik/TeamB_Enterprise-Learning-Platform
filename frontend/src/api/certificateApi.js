import api from "./client";

export const certificateApi = {
  generateCertificate: (courseId) =>
    api.post(`/certificates/generate/${courseId}`),

  getMyCertificates: () =>
    api.get("/certificates/my-certificates"),

  getStudentCertificates: (studentId) =>
    api.get(`/certificates/student/${studentId}`),

  getById: (id) =>
    api.get(`/certificates/${id}`),

  verify: (certificateId) =>
    api.get(`/certificates/verify/${certificateId}`),

  download: (id) =>
    api.get(`/certificates/download/${id}`, {
      responseType: "blob",
    }),
};