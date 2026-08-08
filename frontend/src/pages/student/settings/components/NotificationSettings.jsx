import { Bell } from "lucide-react";

export default function NotificationSettings({ enabled, onToggle }) {
  return (
    <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-5">
      <div className="border-b border-soft pb-4">
        <h2 className="text-lg font-bold text-heading flex items-center gap-2">
          <Bell size={18} className="text-primary" /> Notification Preferences
        </h2>
        <p className="text-xs text-muted mt-1">
          Notifications are created by real account events (enrolling in or completing a course)
          and checked automatically every 30 seconds. This controls whether a pop-up toast appears
          when a new one arrives — they'll still be waiting in your Notifications page either way.
        </p>
      </div>

      <label className="flex items-center justify-between p-3.5 rounded-xl bg-base border border-soft cursor-pointer hover:bg-soft transition">
        <div>
          <p className="text-xs font-bold text-heading">Show pop-up toast for new notifications</p>
          <p className="text-[11px] text-muted">Turn off to only see them in the Notifications page</p>
        </div>
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="w-4 h-4 rounded accent-primary cursor-pointer"
        />
      </label>
    </div>
  );
}
