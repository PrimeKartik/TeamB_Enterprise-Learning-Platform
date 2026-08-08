import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Crown,
  Database,
  Code,
  Terminal,
  Cpu,
  Cloud,
  CheckCircle2,
  Lock
} from 'lucide-react';

const BADGE_DEFINITIONS = [
  { key: 'FIRST_SOLVED', title: 'First Problem Solved', description: 'Solved your first coding practice question!', icon: Trophy, color: 'from-amber-500 to-yellow-500' },
  { key: '10_SOLVED', title: '10 Problems Solved', description: 'Completed 10 coding challenges successfully!', icon: Award, color: 'from-purple-500 to-pink-500' },
  { key: '50_SOLVED', title: '50 Problems Solved', description: 'Mastered 50 programming challenges!', icon: Sparkles, color: 'from-indigo-500 to-blue-500' },
  { key: '100_SOLVED', title: '100 Problems Solved', description: 'Century Club: 100 challenges solved!', icon: Crown, color: 'from-amber-400 to-orange-500' },
  { key: 'SQL_MASTER', title: 'SQL Master', description: 'Mastered database querying, joins & subqueries!', icon: Database, color: 'from-cyan-500 to-blue-500' },
  { key: 'JAVA_EXPERT', title: 'Java Expert', description: 'Demonstrated Java Object Oriented expertise!', icon: Code, color: 'from-orange-500 to-red-500' },
  { key: 'PYTHON_PRO', title: 'Python Pro', description: 'Solved Python data analysis & algorithms!', icon: Terminal, color: 'from-emerald-500 to-teal-500' },
  { key: 'REACT_NINJA', title: 'React Ninja', description: 'Mastered React state, hooks & component logic!', icon: Cpu, color: 'from-cyan-400 to-teal-400' },
  { key: 'CLOUD_EXPLORER', title: 'Cloud Explorer', description: 'Constructed serverless & cloud compute code!', icon: Cloud, color: 'from-purple-400 to-pink-400' },
];

export default function BadgeSection({ userBadges = [] }) {
  const isUnlocked = (key) => {
    return userBadges.some(b => b.badgeKey === key || b.badge_key === key || b.badgeTitle === key);
  };

  const unlockedCount = BADGE_DEFINITIONS.filter(b => isUnlocked(b.key)).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-4 bg-panel border border-soft p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-heading">Achievement Badges</h3>
            <p className="text-xs text-muted">Solve coding problems across courses to unlock exclusive badges</p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-base border border-soft text-xs font-bold text-amber-400 flex items-center gap-1.5">
          <Sparkles size={15} /> {unlockedCount} / {BADGE_DEFINITIONS.length} Unlocked
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {BADGE_DEFINITIONS.map((badge) => {
          const unlocked = isUnlocked(badge.key);
          const Icon = badge.icon;

          return (
            <div
              key={badge.key}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                unlocked
                  ? 'bg-panel border-purple-500/30 shadow-lg shadow-purple-950/20 hover:-translate-y-1'
                  : 'bg-panel/40 border-soft/50 opacity-60 grayscale'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${badge.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={24} />
                  </div>

                  {unlocked ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Unlocked
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-base border border-soft text-muted flex items-center gap-1">
                      <Lock size={12} /> Locked
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-heading mb-1">{badge.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{badge.description}</p>
              </div>

              <div className="pt-3 mt-4 border-t border-soft/50 text-[11px] font-semibold text-purple-300">
                {unlocked ? 'Achievement Unlocked 🎉' : 'Solve matching course challenges to unlock'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
