import React from 'react';
import { Trophy, Award, Flame, Zap, Target, Star, CheckCircle2, TrendingUp } from 'lucide-react';

export default function StudentStatsHeader({ stats }) {
  const defaultStats = {
    totalContestsParticipated: 14,
    contestsWon: 3,
    bestRank: 1,
    totalProblemsSolved: 52,
    successRate: 91.2,
    totalPoints: 5400,
    currentRating: 1720,
    highestRating: 1780,
    badgesEarned: 8,
    codingStreak: 14
  };

  const s = stats || defaultStats;

  return (
    <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block">Participated</span>
        <span className="text-lg font-black text-heading block mt-0.5">{s.totalContestsParticipated}</span>
      </div>

      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block flex items-center justify-center gap-1">
          <Trophy size={11} className="text-amber-400" /> Contests Won
        </span>
        <span className="text-lg font-black text-amber-400 block mt-0.5">{s.contestsWon} 🥇</span>
      </div>

      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block">Best Rank</span>
        <span className="text-lg font-black text-purple-300 block mt-0.5">#{s.bestRank}</span>
      </div>

      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block">Problems Solved</span>
        <span className="text-lg font-black text-emerald-400 block mt-0.5">{s.totalProblemsSolved}</span>
      </div>

      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block">Success Rate</span>
        <span className="text-lg font-black text-cyan-400 block mt-0.5">{s.successRate}%</span>
      </div>

      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block flex items-center justify-center gap-1">
          <Zap size={11} className="text-amber-400" /> Rating
        </span>
        <span className="text-lg font-black text-amber-400 block mt-0.5">{s.currentRating} ⭐</span>
      </div>

      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block flex items-center justify-center gap-1">
          <Flame size={11} className="text-orange-400" /> Streak
        </span>
        <span className="text-lg font-black text-orange-400 block mt-0.5">{s.codingStreak}d 🔥</span>
      </div>

      <div className="p-3 bg-base/50 rounded-xl border border-soft/60">
        <span className="text-[10px] uppercase font-bold text-muted block">Badges</span>
        <span className="text-lg font-black text-pink-400 block mt-0.5">{s.badgesEarned} 🏆</span>
      </div>
    </div>
  );
}
