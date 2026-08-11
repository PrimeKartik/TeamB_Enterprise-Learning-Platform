import React from 'react';
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  Users,
  CreditCard,
  Zap,
  BookOpen,
  Clock,
  RefreshCw,
  Award
} from 'lucide-react';

export default function RevenueKpiCards({ data }) {
  const cleanTotal = data?.totalRevenue ?? 0;
  const cleanToday = data?.todaysRevenue ?? 0;
  const cleanWeek = data?.thisWeekRevenue ?? 0;
  const cleanMonth = data?.monthlyRevenue ?? 0;
  const cleanAvg = data?.avgRevenuePerStudent ?? 0;
  const cleanPaidEnrollments = data?.totalPaidEnrollments ?? 0;

  const formatCurrency = (num) => `₹${Number(num).toLocaleString('en-IN')}`;

  const kpis = [
    {
      title: 'Total Revenue',
      value: formatCurrency(cleanTotal),
      subtitle: 'Real-time Gross Paid Revenue',
      icon: IndianRupee,
      color: 'bg-gradient-to-tr from-purple-600 to-pink-500',
      badge: 'Live MySQL'
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(cleanToday),
      subtitle: 'Real-time Daily Earned',
      icon: Zap,
      color: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
      badge: 'Today'
    },
    {
      title: "This Week's Revenue",
      value: formatCurrency(cleanWeek),
      subtitle: 'Last 7 Days Earnings',
      icon: Calendar,
      color: 'bg-gradient-to-tr from-purple-500 to-indigo-500',
      badge: '7 Days'
    },
    {
      title: "This Month's Revenue",
      value: formatCurrency(cleanMonth),
      subtitle: 'Current Month Gross Income',
      icon: Calendar,
      color: 'bg-gradient-to-tr from-blue-500 to-cyan-500',
      badge: 'This Month'
    },
    {
      title: 'Total Paid Enrollments',
      value: cleanPaidEnrollments.toLocaleString('en-IN'),
      subtitle: 'Verified Paid Students',
      icon: Users,
      color: 'bg-gradient-to-tr from-indigo-600 to-purple-500',
      badge: 'Paid'
    },
    {
      title: 'Free Course Enrollments',
      value: (data?.freeCourseEnrollments || 0).toLocaleString('en-IN'),
      subtitle: 'Enrolled Free Students',
      icon: BookOpen,
      color: 'bg-gradient-to-tr from-teal-500 to-emerald-600',
      badge: '₹0 Free'
    },
    {
      title: 'Avg Revenue / Student',
      value: formatCurrency(cleanAvg),
      subtitle: 'Average LTV per Student',
      icon: CreditCard,
      color: 'bg-gradient-to-tr from-amber-500 to-orange-500',
      badge: 'Average'
    },
    {
      title: 'Revenue Growth',
      value: `100%`,
      subtitle: 'Compounded Growth Rate',
      icon: TrendingUp,
      color: 'bg-gradient-to-tr from-pink-500 to-rose-500',
      badge: 'Growth'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;

        return (
          <div
            key={idx}
            className="bg-panel border border-soft rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
                  {kpi.title}
                </span>
                <h3 className="text-2xl font-black text-heading tracking-tight">
                  {kpi.value}
                </h3>
              </div>

              <div className={`w-11 h-11 rounded-2xl ${kpi.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-soft/50 text-[11px]">
              <span className="text-muted font-medium">{kpi.subtitle}</span>
              <span className="px-2 py-0.5 rounded-full font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono">
                {kpi.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
