import { Users, UserCheck, GraduationCap, Award } from "lucide-react";

export default function StudentStats({ stats }) {
  const cards = [
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "bg-purple-600",
    },
    {
      title: "Active Students",
      value: stats?.activeStudents || 0,
      icon: UserCheck,
      color: "bg-emerald-500",
    },
    {
      title: "Completed Courses",
      value: stats?.completedCourses || 0,
      icon: GraduationCap,
      color: "bg-pink-500",
    },
    {
      title: "Certificates Awarded",
      value: stats?.certificates || 0,
      icon: Award,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-panel border border-soft rounded-2xl shadow-xl p-6 flex items-center justify-between transition-all hover:border-primary/40"
          >
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                {card.title}
              </p>
              <h2 className="text-3xl font-extrabold text-heading mt-1">
                {card.value}
              </h2>
            </div>

            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 shrink-0`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}