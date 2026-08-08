import client from "./client";

export const adminCourseApi = {

    getAll() {
        return client.get("/admin/courses");
    },

    getById(id) {
        return client.get(`/admin/courses/${id}`);
    },

    create(course) {
        return client.post("/admin/courses", course);
    },

    update(id, course) {
        return client.put(`/admin/courses/${id}`, course);
    },

    delete(id) {
        return client.delete(`/admin/courses/${id}`);
    }

};