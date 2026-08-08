import { useState, useRef, useEffect } from 'react'
import {
  GraduationCap,
  LayoutDashboard,
  UserCircle,
  LogOut,
  User as UserIcon,
  Settings,
  Bell,
  Menu,
  X
} from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { getCurrentUser } from '../utils/auth'
import { useAuthContext } from '../context/AuthContext'
import { useNotificationContext } from '../context/NotificationContext'

const PUBLIC_LINKS = [
  { to: '/#home', label: 'Home' },
  { to: '/#features', label: 'Features' },
  { to: '/#about', label: 'About Us' },
  { to: '/#courses', label: 'Courses' },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation() // This forces Navbar to re-render on route changes
  const user = getCurrentUser()
  const isLoggedIn = !!user
  const { logout: authLogout } = useAuthContext()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef(null)

  const [mobileOpen, setMobileOpen] = useState(false)

  const { notifications, unreadCount, markAsRead, markAllRead } = useNotificationContext() ?? {
    notifications: [],
    unreadCount: 0,
    markAsRead: () => {},
    markAllRead: () => {},
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close dropdowns/mobile menu on route change
  useEffect(() => {
    setDropdownOpen(false)
    setNotifOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  const logout = () => {
    authLogout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-base/80 backdrop-blur-md border-b border-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-brand-gradient flex items-center justify-center">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-heading font-bold text-sm">SkillSphere</p>
            <p className="text-muted text-[10px]">Learning Nexus</p>
          </div>
        </Link>

        {!isLoggedIn && (
          <div className="hidden md:flex items-center gap-8 text-sm text-body">
            {PUBLIC_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-heading transition">
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => {
                      setNotifOpen(!notifOpen)
                      if (dropdownOpen) setDropdownOpen(false)
                    }}
                    className="w-9 h-9 rounded-lg border border-soft flex items-center justify-center text-heading hover-tint-10 transition relative focus:outline-none"
                    title="Notifications"
                  >
                    <Bell size={16} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    )}
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-panel border border-soft rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-soft flex justify-between items-center bg-base/50">
                        <p className="text-sm font-semibold text-heading">Notifications</p>
                        {notifications.length > 0 && (
                          <button
                            onClick={markAllRead}
                            className="text-xs text-primary hover:underline"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-muted text-xs">
                            You're all caught up — no notifications.
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((n) => (
                            <button
                              key={n.id}
                              onClick={() => markAsRead(n.id)}
                              className="w-full text-left p-4 border-b border-soft last:border-0 hover:bg-soft transition cursor-pointer"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-sm font-medium text-heading mb-1">{n.title}</h3>
                                {!n.read && <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary shrink-0" />}
                              </div>
                              <p className="text-xs text-muted mb-2 leading-relaxed">{n.body ?? n.message}</p>
                            </button>
                          ))
                        )}
                      </div>
                      <div className="p-2 border-t border-soft bg-base/50">
                        <Link to="/dashboard/notifications" onClick={() => setNotifOpen(false)} className="block text-center text-xs text-primary font-medium p-2 hover:bg-soft rounded transition">
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen)
                    if (notifOpen) setNotifOpen(false)
                  }}
                  className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base"
                >
                  <UserCircle size={20} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-panel border border-soft rounded-xl shadow-xl overflow-hidden py-1 z-50">
                    <div className="px-4 py-2 border-b border-soft mb-1">
                      <p className="text-xs font-medium text-heading truncate">{user.email}</p>
                      <p className="text-[10px] text-muted capitalize">{user.role?.toLowerCase() || 'User'}</p>
                    </div>

                    <Link
                      to={user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-soft hover:text-heading transition"
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </Link>

                    {user.role !== 'ADMIN' && (
                      <>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-soft hover:text-heading transition"
                        >
                          <UserIcon size={14} /> My Profile
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-soft hover:text-heading transition"
                        >
                          <Settings size={14} /> Settings
                        </Link>
                      </>
                    )}

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition mt-1 border-t border-soft pt-2"
                    >
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm text-heading border border-soft-20 hover-tint-10 transition">
                Log In
              </Link>
              <Link to="/register" className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm text-white font-medium bg-brand-gradient hover:opacity-90 transition">
                Sign Up
              </Link>
            </>
          )}

          {!isLoggedIn && (
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-lg border border-soft flex items-center justify-center text-heading hover-tint-10 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav menu — public visitors only */}
      {!isLoggedIn && mobileOpen && (
        <div className="md:hidden border-t border-soft bg-base/95 backdrop-blur-md px-6 py-4 space-y-3">
          {PUBLIC_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block text-sm text-body hover:text-heading transition"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 sm:hidden">
            <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-lg text-sm text-heading border border-soft-20 hover-tint-10 transition">
              Log In
            </Link>
            <Link to="/register" className="flex-1 text-center px-4 py-2 rounded-lg text-sm text-white font-medium bg-brand-gradient hover:opacity-90 transition">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
