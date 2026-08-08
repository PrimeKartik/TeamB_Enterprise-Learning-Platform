import client from "./client";

export const adminStudentApi = {
  getAllStudents: () => client.get("/admin/students"),

  getStudentById: (id) =>
    client.get(`/admin/students/${id}`),

  createStudent: (student) =>
    client.post("/admin/students", student),

  updateStudent: (id, student) =>
    client.put(`/admin/students/${id}`, student),

  deleteStudent: (id) =>
    client.delete(`/admin/students/${id}`),

  getDashboardStats: () =>
    client.get("/admin/students/stats"),
};