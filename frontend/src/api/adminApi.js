import client from "./client";

export const adminApi = {

    dashboard() {
        return client.get("/admin/stats");
    },

    getCourses() {
        return client.get("/admin/courses");
    },

    createCourse(course) {
        return client.post("/admin/courses", course);
    },

    updateCourse(id, course) {
        return client.put(`/admin/courses/${id}`, course);
    },

    deleteCourse(id) {
        return client.delete(`/admin/courses/${id}`);
    },

    getStudents() {
        return client.get("/admin/students");
    },

    getCertificates() {
        return client.get("/admin/certificates");
    },

    getReports() {
        return client.get("/admin/reports");
    }

}