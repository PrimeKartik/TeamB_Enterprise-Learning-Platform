import React from 'react';
import { Trophy, Zap, Flame, Award, Crown, CheckCircle2 } from 'lucide-react';

export default function Leaderboard({ leaderboard = [] }) {
  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 bg-panel border border-soft p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-heading">Global Coding Leaderboard</h3>
            <p className="text-xs text-muted">Compete with SkillSphere peers and climb the practice rankings</p>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Highlights */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rank 2 */}
          <div className="bg-panel border border-soft p-5 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center relative order-2 md:order-1 hover:-translate-y-1 transition">
            <div className="w-8 h-8 rounded-full bg-slate-400/20 text-slate-300 font-black text-xs flex items-center justify-center border border-slate-400/40">
              #2
            </div>
            <img src={topThree[1].avatarUrl} alt={topThree[1].userName} className="w-16 h-16 rounded-full object-cover border-2 border-slate-400" />
            <div>
              <h4 className="font-bold text-heading text-sm">{topThree[1].userName}</h4>
              <p className="text-xs text-amber-400 font-bold flex items-center justify-center gap-1 mt-0.5">
                <Zap size={13} /> {topThree[1].xpPoints} XP
              </p>
            </div>
            <span className="text-xs text-muted">{topThree[1].solvedCount} Solved • 🔥 {topThree[1].streakDays}d</span>
          </div>

          {/* Rank 1 (Center Winner) */}
          <div className="bg-panel border-2 border-amber-500/50 p-6 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center relative order-1 md:order-2 shadow-xl shadow-amber-500/10 hover:-translate-y-1 transition bg-gradient-to-b from-amber-500/10 via-panel to-panel">
            <Crown size={28} className="text-amber-400 absolute -top-3" />
            <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center border-2 border-amber-300 shadow-md">
              #1
            </div>
            <img src={topThree[0].avatarUrl} alt={topThree[0].userName} className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-lg" />
            <div>
              <h4 className="font-black text-heading text-base">{topThree[0].userName}</h4>
              <p className="text-xs text-amber-400 font-black flex items-center justify-center gap-1 mt-0.5">
                <Zap size={14} /> {topThree[0].xpPoints} XP
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-bold">{topThree[0].solvedCount} Solved • 🔥 {topThree[0].streakDays}d Streak</span>
          </div>

          {/* Rank 3 */}
          <div className="bg-panel border border-soft p-5 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center relative order-3 hover:-translate-y-1 transition">
            <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-500 font-black text-xs flex items-center justify-center border border-amber-700/40">
              #3
            </div>
            <img src={topThree[2].avatarUrl} alt={topThree[2].userName} className="w-16 h-16 rounded-full object-cover border-2 border-amber-600" />
            <div>
              <h4 className="font-bold text-heading text-sm">{topThree[2].userName}</h4>
              <p className="text-xs text-amber-400 font-bold flex items-center justify-center gap-1 mt-0.5">
                <Zap size={13} /> {topThree[2].xpPoints} XP
              </p>
            </div>
            <span className="text-xs text-muted">{topThree[2].solvedCount} Solved • 🔥 {topThree[2].streakDays}d</span>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-panel border border-soft rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-base border-b border-soft text-muted uppercase tracking-wider font-bold">
              <tr>
                <th className="px-4 py-3.5 text-center">Rank</th>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5 text-center">Solved</th>
                <th className="px-4 py-3.5 text-center">Streak</th>
                <th className="px-4 py-3.5 text-right">XP Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soft/50">
              {leaderboard.map((item, idx) => {
                const rankNum = item.rankPosition || idx + 1;
                const isUser = item.userName.includes('(You)');

                return (
                  <tr key={idx} className={`hover:bg-soft/30 transition ${isUser ? 'bg-purple-500/10 font-bold' : ''}`}>
                    <td className="px-4 py-3.5 text-center font-bold font-mono">
                      {rankNum === 1 && '🥇'}
                      {rankNum === 2 && '🥈'}
                      {rankNum === 3 && '🥉'}
                      {rankNum > 3 && `#${rankNum}`}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={item.avatarUrl} alt={item.userName} className="w-8 h-8 rounded-full object-cover border border-soft" />
                        <div>
                          <span className="text-heading font-semibold block">{item.userName}</span>
                          <span className="text-[10px] text-muted">{item.userEmail}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-center font-bold text-emerald-400">
                      {item.solvedCount}
                    </td>

                    <td className="px-4 py-3.5 text-center text-orange-400 font-bold">
                      🔥 {item.streakDays}d
                    </td>

                    <td className="px-4 py-3.5 text-right font-extrabold text-amber-400">
                      {item.xpPoints} ⭐
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
