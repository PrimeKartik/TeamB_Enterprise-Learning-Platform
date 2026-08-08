import React from 'react';
import {
  Users,
  Zap,
  CheckCircle2,
  Award,
  TrendingUp,
  HelpCircle,
  Code2,
  AlertTriangle
} from 'lucide-react';

export default function EnrollmentAnalyticsWidgets({ data, activeWidget, onSelectWidget }) {
  const widgets = [
    {
      id: 'TOTAL',
      title: 'Total Students Enrolled',
      value: (data?.totalStudentsEnrolled || 5).toLocaleString(),
      subtitle: 'Click to view all platform learners',
      icon: Users,
      color: 'bg-gradient-to-tr from-purple-600 to-pink-500',
      badge: 'Enrolled'
    },
    {
      id: 'TODAY',
      title: 'Students Learning Today',
      value: (data?.studentsLearningToday || 4).toLocaleString(),
      subtitle: 'Click to view today active learners',
      icon: Zap,
      color: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
      badge: 'Live'
    },
    {
      id: 'COMPLETED',
      title: 'Completed Courses',
      value: (data?.completedCourses || 1).toLocaleString(),
      subtitle: 'Click to view course graduates',
      icon: CheckCircle2,
      color: 'bg-gradient-to-tr from-blue-500 to-cyan-500',
      badge: 'Graduated'
    },
    {
      id: 'CERTIFICATES',
      title: 'Certificates Generated',
      value: (data?.certificatesGenerated || 3).toLocaleString(),
      subtitle: 'Click to view certificate holders',
      icon: Award,
      color: 'bg-gradient-to-tr from-pink-500 to-rose-500',
      badge: 'Issued'
    },
    {
      id: 'COMPLETION_RATE',
      title: 'Average Completion Rate',
      value: `${data?.avgCompletionRate || 65.5}%`,
      subtitle: 'Click to view top progress learners',
      icon: TrendingUp,
      color: 'bg-gradient-to-tr from-purple-500 to-indigo-500',
      badge: 'Progress'
    },
    {
      id: 'QUIZ_SCORE',
      title: 'Average Quiz Score',
      value: `${data?.avgQuizScore || 86.7}%`,
      subtitle: 'Click to view top quiz performers',
      icon: HelpCircle,
      color: 'bg-gradient-to-tr from-amber-500 to-orange-500',
      badge: 'Quizzes'
    },
    {
      id: 'CODING_SCORE',
      title: 'Average Coding Score',
      value: `${data?.avgCodingScore || 83.0}%`,
      subtitle: 'Click to view top coding solvers',
      icon: Code2,
      color: 'bg-gradient-to-tr from-indigo-500 to-purple-600',
      badge: 'Coding'
    },
    {
      id: 'INACTIVE',
      title: 'Inactive Students (7+ Days)',
      value: (data?.inactiveStudentsCount || 2).toLocaleString(),
      subtitle: 'Click to view inactive students',
      icon: AlertTriangle,
      color: 'bg-gradient-to-tr from-amber-600 to-red-600',
      badge: 'Inactive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {widgets.map((w) => {
        const Icon = w.icon;
        const isSelected = activeWidget === w.id;

        return (
          <div
            key={w.id}
            onClick={() => onSelectWidget && onSelectWidget(w.id)}
            className={`bg-panel border rounded-2xl p-5 shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between cursor-pointer select-none ${
              isSelected
                ? 'border-purple-500 ring-2 ring-purple-500/60 bg-purple-500/10 shadow-purple-500/20 scale-[1.02]'
                : 'border-soft hover:border-purple-500/50 hover:-translate-y-1'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
                  {w.title}
                </span>
                <h3 className="text-2xl font-black text-heading tracking-tight">
                  {w.value}
                </h3>
              </div>

              <div className={`w-11 h-11 rounded-2xl ${w.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-soft/50 text-[11px]">
              <span className={`font-medium ${isSelected ? 'text-purple-300 font-bold' : 'text-muted'}`}>
                {w.subtitle}
              </span>
              <span className={`px-2 py-0.5 rounded-full font-bold font-mono ${
                isSelected
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
              }`}>
                {w.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
