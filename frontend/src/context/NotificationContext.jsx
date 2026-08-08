import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { notificationApi } from "../api/notificationApi";
import { getCurrentUser } from "../utils/auth";
import { getNotificationToastsEnabled } from "../utils/notificationPreference";

const NotificationContext = createContext();

const POLL_INTERVAL_MS = 30000;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);
  const knownIds = useRef(new Set());
  const isFirstLoad = useRef(true);

  const loadNotifications = async () => {
    // Notifications are per-user — skip the request entirely when logged
    // out instead of firing an API call that will just 401.
    if (!getCurrentUser()) {
      setNotifications([]);
      return;
    }

    try {
      let fresh = [];
      try {
        const res = await notificationApi.getAll();
        fresh = Array.isArray(res.data) ? res.data : [];
      } catch(e) {}
      
      const user = getCurrentUser();
      if (user && user.email) {
        const localNotes = JSON.parse(localStorage.getItem(`skillSphereNotifications_${user.email}`) || '[]');
        fresh = [...fresh, ...localNotes].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      }

      // Pop a toast for any notification that arrived since the last poll
      // (skip on the very first load — that would toast every past one).
      if (!isFirstLoad.current) {
        const newOnes = fresh.filter((n) => !knownIds.current.has(n.id));
        if (newOnes.length > 0 && getNotificationToastsEnabled()) {
          setToast(newOnes[0]);
          setTimeout(() => setToast(null), 5000);
        }
      }

      knownIds.current = new Set(fresh.map((n) => n.id));
      isFirstLoad.current = false;

      setNotifications(fresh);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNotifications();

    // Poll periodically so notifications created by real events (enrolling,
    // completing a course) show up without a manual page refresh.
    const interval = setInterval(loadNotifications, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      const user = getCurrentUser();
      if (user && user.email && String(id).startsWith('LOC-')) {
         const localNotes = JSON.parse(localStorage.getItem(`skillSphereNotifications_${user.email}`) || '[]');
         const updated = localNotes.map(n => n.id === id ? { ...n, read: true } : n);
         localStorage.setItem(`skillSphereNotifications_${user.email}`, JSON.stringify(updated));
      } else {
         await notificationApi.markAsRead(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await notificationApi.markAllAsRead();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        markAsRead,
        markAllRead,
        refreshNotifications: loadNotifications,
      }}
    >
      {children}

      {/* Floating toast for newly-arrived notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-panel border border-primary/50 text-heading p-4 rounded-2xl shadow-2xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center text-white shrink-0 mt-0.5">
            ⚡
          </div>
          <div>
            <h4 className="text-xs font-bold text-heading">{toast.title}</h4>
            <p className="text-[11px] text-muted mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => useContext(NotificationContext);
