import { adminStudentApi } from "../api/adminStudentApi";

const studentService = {
  getStudents: () =>
    adminStudentApi.getAllStudents(),

  createStudent: (data) =>
    adminStudentApi.createStudent(data),

  updateStudent: (id, data) =>
    adminStudentApi.updateStudent(id, data),

  deleteStudent: (id) =>
    adminStudentApi.deleteStudent(id),
};

export default studentService;