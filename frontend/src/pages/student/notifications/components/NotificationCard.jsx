import { Bell, BookOpen, CheckCircle2, Check } from "lucide-react";

function formatTimestamp(createdAt) {
  if (!createdAt) return "Recent";
  const date = new Date(createdAt);
  if (isNaN(date.getTime())) return "Recent";

  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function NotificationCard({ notification, onRead }) {
  const getIcon = () => {
    switch (notification.type) {
      case "ENROLLMENT":
        return <BookOpen size={18} className="text-purple-400" />;
      case "COMPLETION":
        return <CheckCircle2 size={18} className="text-emerald-400" />;
      default:
        return <Bell size={18} className="text-[#EC4899]" />;
    }
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${
        notification.read
          ? "bg-panel border-soft"
          : "bg-panel border-primary/40 shadow-lg shadow-purple-500/10"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-base border border-soft flex items-center justify-center shrink-0 mt-0.5">
            {getIcon()}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-heading text-sm sm:text-base">
                {notification.title}
              </h3>
              {!notification.read && (
                <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-ping" />
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
              {notification.message}
            </p>

            <span className="inline-block text-[11px] text-muted/80 mt-3 font-mono">
              {formatTimestamp(notification.createdAt)}
            </span>
          </div>
        </div>

        {!notification.read && (
          <button
            onClick={() => onRead(notification.id)}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition flex items-center gap-1 shrink-0"
            title="Mark as Read"
          >
            <Check size={14} /> Mark Read
          </button>
        )}
      </div>
    </div>
  );
}