import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Award,
  BarChart3,
  LogOut,
  Shield,
  GraduationCap,
  Briefcase,
  LifeBuoy,
} from "lucide-react";
import { useAuthContext } from "../../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Courses",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      name: "Students",
      icon: Users,
      path: "/admin/students",
    },
    {
      name: "Student Enrollments",
      icon: GraduationCap,
      path: "/admin/enrollments",
    },
    {
      name: "Certificates",
      icon: Award,
      path: "/admin/certificates",
    },
    {
      name: "Jobs & Internships",
      icon: Briefcase,
      path: "/admin/jobs",
    },
    {
      name: "Support Complaints",
      icon: LifeBuoy,
      path: "/admin/complaints",
    },
    {
      name: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-panel border-r border-soft text-heading shadow-xl flex flex-col justify-between z-30">
      <div>
        <div className="h-20 flex items-center px-6 border-b border-soft gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Shield size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-heading leading-tight">SkillSphere</h1>
            <p className="text-[11px] text-muted font-medium">Admin Control Panel</p>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1.5 px-3">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                    isActive
                      ? "bg-brand-gradient text-white shadow-md shadow-purple-500/20"
                      : "text-muted hover:bg-soft hover:text-heading"
                  }`
                }
              >
                <Icon size={18} />
                <span>{menu.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-soft">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 hover:bg-red-500/20 transition text-xs font-semibold"
        >
          <LogOut size={16} /> Logout Admin
        </button>
      </div>
    </aside>
  );
}