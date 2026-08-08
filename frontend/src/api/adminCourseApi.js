import client from "./client";

export const adminCourseApi = {

  // Admin listing includes enrollment/completion stats per course
  getAllCourses() {
    return client.get("/courses/admin");
  },

  getCourseById(id) {
    return client.get(`/courses/${id}`);
  },

  createCourse(course) {
    return client.post("/courses", course);
  },

  updateCourse(id, course) {
    return client.put(`/courses/${id}`, course);
  },

  deleteCourse(id) {
    return client.delete(`/courses/${id}`);
  }

};
