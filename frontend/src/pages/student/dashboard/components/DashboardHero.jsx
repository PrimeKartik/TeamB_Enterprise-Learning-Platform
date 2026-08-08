import { Sparkles, ArrowRight, Flame, Bell, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DashboardHero({
  name,
  email,
  totalCourses,
  completedCourses,
}) {
  const hour = new Date().getHours()

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 18
      ? 'Good Afternoon'
      : 'Good Evening'

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#7C3AED] via-purple-900 to-[#EC4899] text-white p-8 mb-8 shadow-2xl border border-white/10">
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold text-white border border-white/20">
              <Sparkles size={14} className="text-[#EC4899]" />
              Welcome to SkillSphere Learning Nexus
            </div>

            {/* Learning Streak Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-500/30 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-extrabold text-amber-200 border border-amber-400/30 shadow-sm">
              <Flame size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
              7 Day Streak!
            </div>

            {/* Study Reminder Notification Badge */}
            <Link to="/dashboard/notifications" className="inline-flex items-center gap-1.5 bg-purple-950/50 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold text-purple-200 border border-purple-400/30 hover:bg-purple-900/60 transition">
              <Bell size={14} className="text-[#EC4899]" />
              Study Reminder Active
            </Link>
          </div>

          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
            {greeting}
            {name ? `, ${name.split(' ')[0]}` : ''} 👋
          </h1>

          {email && (
            <p className="text-white/80 text-sm mb-4 font-medium">
              {email}
            </p>
          )}

          <p className="text-white/90 leading-relaxed max-w-xl text-base">
            Continue learning and master top skills. Every lesson completed brings you closer to your goals.
          </p>

          <Link
            to="/dashboard/learning"
            className="inline-flex items-center gap-2 mt-6 bg-white text-purple-950 px-6 py-3 rounded-xl font-extrabold hover:scale-105 transition shadow-lg"
          >
            Continue Learning
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Stats & Badges Grid */}
        <div className="grid grid-cols-2 gap-4 min-w-[280px]">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 shadow-lg">
            <p className="text-3xl font-extrabold">{totalCourses}</p>
            <p className="text-xs font-semibold text-white/80 mt-1">Enrolled Courses</p>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10 shadow-lg">
            <p className="text-3xl font-extrabold">{completedCourses}</p>
            <p className="text-xs font-semibold text-white/80 mt-1">Completed</p>
          </div>

          <div className="col-span-2 rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/10 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <Award className="text-amber-300" size={24} />
              <div>
                <p className="text-xs font-bold text-white">Skill Badges</p>
                <p className="text-[11px] text-white/70">Full Stack & Java Explorer</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-200 text-xs font-bold border border-amber-300/30">
              Level 4
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
