import { useEffect, useState } from "react";
import { notificationApi } from "../api/notificationApi";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const res =
        await notificationApi.getAll();

      setNotifications(res.data);
    } catch (err) {
      setError("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id) => {
    await notificationApi.markAsRead(id);

    loadNotifications();
  };

  const markAllAsRead = async () => {
    await notificationApi.markAllAsRead();

    loadNotifications();
  };

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refresh: loadNotifications,
    markAsRead,
    markAllAsRead,
  };
}