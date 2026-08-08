import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  TrendingUp,
  ClipboardCheck,
  Award,
  Sparkles,
  Compass,
  X,
  Eye,
  ArrowLeft,
  FileText,
  Briefcase,
  Trophy,
  Code2,
  LifeBuoy,
  MapPin,
} from 'lucide-react'
import { getCurrentUser } from '../../utils/auth'
import { useAuthContext } from '../../context/AuthContext'
import Chatbot from '../../components/Chatbot'
import DashboardTopbar from './components/DashboardTopbar'


// NOTE: Sidebar navigation is shown in this layout.
const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { key: 'courses', label: 'All Courses', icon: BookOpen, to: '/dashboard/courses' },
  { key: 'coding-practice', label: 'Coding Practice', icon: Code2, to: '/dashboard/coding-practice' },
  { key: 'learning', label: 'My Learning', icon: Compass, to: '/dashboard/learning' },
  { key: 'progress', label: 'Progress', icon: TrendingUp, to: '/dashboard/progress' },
  { key: 'assessments', label: 'Assessments', icon: ClipboardCheck, to: '/dashboard/assessments' },
  { key: 'certificates', label: 'Certificates', icon: Award, to: '/dashboard/certificates' },
  { key: 'roadmaps', label: 'Career Roadmaps', icon: MapPin, to: '/dashboard/career-roadmaps' },
  { key: 'support', label: 'Support & Help', icon: LifeBuoy, to: '/dashboard/support' },
  { key: 'resume', label: 'Resume Builder', icon: FileText, to: '/dashboard/resume' },
  { key: 'jobs', label: 'Jobs & Internships', icon: Briefcase, to: '/dashboard/jobs' },
  { key: 'contests', label: 'Contests', icon: Trophy, to: '/dashboard/contests' },
]


function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={
        'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ' +
        (isActive ? 'bg-brand-gradient/15 text-heading border border-brand-gradient/25' : 'text-muted hover:text-heading hover-tint-10 border border-transparent')
      }
    >
      <Icon size={16} />
      <span className="font-medium">{item.label}</span>
    </Link>
  )
}

function SidebarContent({ user, activeKey, onNavigate }) {
  return (
    <div className="card-glow rounded-2xl p-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-heading font-bold text-sm">{user?.name || 'Student'}</p>
          <p className="text-muted text-xs break-all">{user?.email}</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.key} item={item} isActive={activeKey === item.key} onClick={onNavigate} />
        ))}
      </nav>
    </div>
  )
}

export default function StudentDashboardLayout() {
  const user = getCurrentUser()
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthContext()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const isCoursePlayer = location.pathname.includes('/player')

  const activeKey = useMemo(() => {
    const path = location.pathname
    if (path === '/dashboard') return 'dashboard'
    const seg = path.split('/')[2]
    return seg || 'dashboard'
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-base">
      {user?.role === 'ADMIN' && (
        <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-yellow-400 px-4 py-2 text-xs font-semibold text-yellow-950 shadow-sm">
          <Eye size={14} />
          <span>You're viewing as a student (Admin mode)</span>
          <Link
            to="/admin/dashboard"
            className="ml-2 inline-flex items-center gap-1 rounded-lg bg-yellow-950/10 px-2.5 py-1 font-bold hover:bg-yellow-950/20 transition"
          >
            <ArrowLeft size={12} /> Back to Admin
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <DashboardTopbar
          user={user}
          onLogout={handleLogout}
          onOpenSidebar={() => setMobileNavOpen(true)}
        />

        <div className={`grid grid-cols-1 ${!isCoursePlayer ? 'md:grid-cols-[280px_1fr]' : ''} gap-6`}>
          {!isCoursePlayer && (
            <aside className="hidden md:block md:sticky md:top-24 self-start">
              <SidebarContent user={user} activeKey={activeKey} />
            </aside>
          )}

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[80vw] overflow-y-auto bg-base p-4">
            <button
              onClick={() => setMobileNavOpen(false)}
              className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-soft text-heading"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
            <SidebarContent user={user} activeKey={activeKey} onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      {/* AI Chatbot — student dashboard only */}
      <Chatbot />
    </div>
  )
}
