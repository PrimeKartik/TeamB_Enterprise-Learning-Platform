import { notificationApi } from "../api/notificationApi";

const notificationService = {
  getNotifications: () =>
    notificationApi.getAll(),

  markRead: (id) =>
    notificationApi.markAsRead(id),

  markAllRead: () =>
    notificationApi.markAllAsRead(),
};

export default notificationService;