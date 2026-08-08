import client from "./client";

export const notificationApi = {

    getAll() {
        return client.get("/notifications");
    },

    markAsRead(id) {
        return client.put(`/notifications/${id}/read`);
    },

    markAllAsRead() {
        return client.put("/notifications/read-all");
    }

};