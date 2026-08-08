import React from 'react';
import {
  Trophy,
  Zap,
  Target,
  Flame,
  CheckCircle2,
  BookOpen,
  Code2,
  TrendingUp,
  Award,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

export default function PracticeProgress({ progress, totalQuestions = 9 }) {
  const solved = progress?.questionsSolved || 12;
  const attempted = progress?.questionsAttempted || 14;
  const streak = progress?.currentStreak || 5;
  const xp = progress?.xpPoints || 1250;
  const rank = progress?.leaderboardRank || 3;
  const dailyGoal = progress?.dailyGoalQuestions || 5;
  const accuracy = attempted > 0 ? Math.round((solved / attempted) * 100) : 100;
  const timeHours = Math.round((progress?.practiceTimeSeconds || 14400) / 3600);

  const courseProgressList = [
    {
      title: 'Full Stack Web Development',
      modules: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MySQL'],
      solved: 5,
      total: 7,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Java Programming Masterclass',
      modules: ['Variables', 'Loops', 'Arrays', 'OOP', 'Collections', 'Exceptions', 'Multithreading'],
      solved: 3,
      total: 7,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Python for Data Science',
      modules: ['Python Basics', 'NumPy', 'Pandas', 'Matplotlib', 'Data Analysis'],
      solved: 2,
      total: 5,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'UI/UX Design with Figma',
      modules: ['Design Theory', 'Wireframes', 'Prototypes', 'Components', 'Auto Layout'],
      solved: 1,
      total: 5,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Cloud Computing with AWS',
      modules: ['EC2', 'S3', 'IAM', 'Lambda', 'VPC', 'CloudFormation'],
      solved: 1,
      total: 6,
      color: 'from-rose-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 8 Metrics Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        {/* Total & Solved Questions */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Total Questions</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Code2 size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-heading mt-2">{totalQuestions}</p>
          <p className="text-[11px] text-muted mt-1">{solved} Solved ({accuracy}% accuracy)</p>
        </div>

        {/* Solved Questions */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Solved Questions</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-2">{solved}</p>
          <p className="text-[11px] text-muted mt-1">Out of {attempted} attempted</p>
        </div>

        {/* Current Streak */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Daily Streak</span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Flame size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-orange-400 mt-2">{streak} Days 🔥</p>
          <p className="text-[11px] text-muted mt-1">Keep the momentum going!</p>
        </div>

        {/* Daily Goal */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Daily Goal</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Target size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-heading mt-2">3 / {dailyGoal}</p>
          <p className="text-[11px] text-cyan-400 mt-1">60% completed today</p>
        </div>

        {/* XP Points */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">XP Points</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-400 mt-2">{xp} ⭐</p>
          <p className="text-[11px] text-muted mt-1">+120 XP earned this week</p>
        </div>

        {/* Leaderboard Rank */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Leaderboard Rank</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Trophy size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-purple-300 mt-2">Rank #{rank} 🏆</p>
          <p className="text-[11px] text-muted mt-1">Top 5% among peers</p>
        </div>

        {/* Accuracy */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Accuracy Rate</span>
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-pink-400 mt-2">{accuracy}%</p>
          <p className="text-[11px] text-muted mt-1">High submission precision</p>
        </div>

        {/* Practice Time */}
        <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Practice Time</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Clock size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-heading mt-2">{timeHours} Hours</p>
          <p className="text-[11px] text-muted mt-1">Total time spent solving</p>
        </div>
      </div>

      {/* Course-based Practice Breakdown */}
      <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-heading flex items-center gap-2">
            <BookOpen size={20} className="text-purple-400" /> Course-wise Practice Mastery
          </h3>
          <p className="text-xs text-muted">Track your problem-solving progress across enrolled courses and sub-modules</p>
        </div>

        <div className="space-y-6">
          {courseProgressList.map((cp, idx) => {
            const pct = Math.round((cp.solved / cp.total) * 100);
            return (
              <div key={idx} className="bg-base/60 border border-soft p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-bold text-heading flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gradient" />
                    {cp.title}
                  </h4>
                  <span className="text-xs font-bold text-purple-300 font-mono">
                    {cp.solved} / {cp.total} Solved ({pct}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-panel rounded-full overflow-hidden border border-soft">
                  <div
                    className={`h-full bg-gradient-to-r ${cp.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Sub-modules Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cp.modules.map((mod, mIdx) => (
                    <span key={mIdx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-panel border border-soft text-muted flex items-center gap-1">
                      <Layers size={10} className="text-purple-400" /> {mod}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
