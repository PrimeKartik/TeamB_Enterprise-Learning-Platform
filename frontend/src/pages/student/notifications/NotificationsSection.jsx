import { useState } from "react";
import { useNotificationContext } from "../../../context/NotificationContext";
import NotificationCard from "./components/NotificationCard";
import { Bell, CheckCheck, Info } from "lucide-react";

export default function NotificationsSection() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
  } = useNotificationContext();

  const [activeTab, setActiveTab] = useState("all");

  // Real backend notification types: ENROLLMENT, COMPLETION, SYSTEM
  const filtered = notifications.filter((n) => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "enrollment") return n.type === "ENROLLMENT";
    if (activeTab === "completion") return n.type === "COMPLETION";
    if (activeTab === "system") return n.type === "SYSTEM";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-panel border border-soft rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold w-fit mb-3">
              <Bell size={14} /> Notification Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">
              Notifications
            </h1>
            <p className="text-sm text-muted mt-1 max-w-xl">
              Real updates from your account — new enrollments, completed courses, and system messages.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 transition flex items-center gap-1.5 shadow-md"
            >
              <CheckCheck size={16} /> Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* How notifications work */}
      <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
            <Info size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-heading">How notifications work</h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Notifications are created automatically by the server when something real happens on your
              account — enrolling in a course, or reaching 100% progress on one. They're checked
              automatically every 30 seconds while you're on the site, so new ones show up without needing
              to refresh the page.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-soft pb-3">
        {[
          { id: "all", label: `All (${notifications.length})` },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "enrollment", label: "Enrollments" },
          { id: "completion", label: "Completions" },
          { id: "system", label: "System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-md"
                : "bg-panel border border-soft text-muted hover:text-heading"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-panel border border-soft rounded-2xl p-12 text-center space-y-3">
          <Bell size={36} className="mx-auto text-muted/50" />
          <h3 className="text-base font-bold text-heading">No notifications yet</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Enroll in a course or complete one to see a real notification appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={markAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
