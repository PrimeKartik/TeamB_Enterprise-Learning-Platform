import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bell,
  Menu,
  LogOut,
  UserCircle,
  Settings,
  User as UserIcon,
  GraduationCap,
} from 'lucide-react'

import ThemeToggle from '../../../components/ThemeToggle'
import { useNotificationContext } from '../../../context/NotificationContext'

export default function DashboardTopbar({ user, onLogout, onOpenSidebar }) {
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const { notifications, unreadCount, markAsRead, markAllRead } = useNotificationContext() ?? {
    notifications: [],
    unreadCount: 0,
    markAsRead: () => {},
    markAllRead: () => {},
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 mb-6 flex items-center justify-between rounded-2xl border border-soft bg-base/80 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-soft text-heading hover-tint-10 transition"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
            <GraduationCap size={16} className="text-white" />
          </div>
          <span className="hidden sm:inline text-heading font-bold text-sm">SkillSphere</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((o) => !o)
              setProfileOpen(false)
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-soft text-heading hover-tint-10 transition"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-soft bg-panel shadow-xl sm:w-80">
              <div className="flex items-center justify-between border-b border-soft bg-base/50 px-4 py-3">
                <p className="text-sm font-semibold text-heading">Notifications</p>
                {notifications.length > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted">
                    You&apos;re all caught up — no notifications.
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className="w-full border-b border-soft p-4 text-left transition last:border-0 hover:bg-soft"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="mb-1 text-sm font-medium text-heading">{n.title}</h3>
                        {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                      </div>
                      <p className="text-xs leading-relaxed text-muted">{n.body ?? n.message}</p>
                    </button>
                  ))
                )}
              </div>
              <div className="border-t border-soft bg-base/50 p-2">
                <Link
                  to="/dashboard/notifications"
                  onClick={() => setNotifOpen(false)}
                  className="block rounded p-2 text-center text-xs font-medium text-primary transition hover:bg-soft"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((o) => !o)
              setNotifOpen(false)
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white transition hover:opacity-90"
          >
            <UserCircle size={20} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-soft bg-panel py-1 shadow-xl">
              <div className="mb-1 border-b border-soft px-4 py-2">
                <p className="truncate text-xs font-medium text-heading">{user?.email}</p>
                <p className="text-[10px] capitalize text-muted">{user?.role?.toLowerCase() || 'Student'}</p>
              </div>

              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-body transition hover:bg-soft hover:text-heading"
              >
                <UserIcon size={14} /> My Profile
              </Link>
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-body transition hover:bg-soft hover:text-heading"
              >
                <Settings size={14} /> Settings
              </Link>

              <button
                onClick={onLogout}
                className="mt-1 flex w-full items-center gap-2 border-t border-soft px-4 py-2 pt-2 text-sm text-red-500 transition hover:bg-red-500/10"
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
