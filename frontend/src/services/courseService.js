import { adminCourseApi } from "../api/adminCourseApi";

const courseService = {
  getCourses: () =>
    adminCourseApi.getAllCourses(),

  createCourse: (data) =>
    adminCourseApi.createCourse(data),

  updateCourse: (id, data) =>
    adminCourseApi.updateCourse(id, data),

  deleteCourse: (id) =>
    adminCourseApi.deleteCourse(id),
};

export default courseService;