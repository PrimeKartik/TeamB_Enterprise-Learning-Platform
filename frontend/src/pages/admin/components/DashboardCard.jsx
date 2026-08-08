import { Users, BookOpen, Award, GraduationCap } from "lucide-react";

const icons = {
  students: Users,
  courses: BookOpen,
  certificates: Award,
  enrollments: GraduationCap,
};

export default function DashboardCard({
  title,
  value,
  icon,
  color = "bg-purple-600",
}) {
  const Icon = icons[icon] || BookOpen;

  return (
    <div className="bg-panel border border-soft rounded-2xl shadow-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider">
          {title}
        </p>
        <h2 className="text-3xl font-extrabold text-heading mt-1">
          {value}
        </h2>
      </div>

      <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 shrink-0`}>
        <Icon size={24} />
      </div>
    </div>
  );
}