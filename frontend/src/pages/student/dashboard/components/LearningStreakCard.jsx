import React from 'react'
import { Flame, Calendar, Sparkles } from 'lucide-react'

export default function LearningStreakCard({ streakDays = 12 }) {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  // Active weekly status: S M T W T F S
  const activeWeeklyDays = [true, true, true, true, true, false, false]

  const heatmapRows = [
    { label: 'This Week', days: [2, 3, 4, 3, 1, 0, 0] },
    { label: 'Last Week', days: [1, 2, 4, 2, 3, 2, 1] },
    { label: 'Jul 19 - Jul 25', days: [3, 1, 2, 4, 2, 1, 0] },
    { label: 'Jul 12 - Jul 18', days: [2, 2, 3, 1, 4, 2, 3] },
  ]

  const getHeatmapColor = (count) => {
    if (count === 0) return 'bg-[#180E2B] border border-purple-500/20'
    if (count === 1) return 'bg-orange-950/60 border border-orange-700/40 text-orange-400'
    if (count === 2) return 'bg-orange-700/60 border border-orange-500/50 text-orange-300'
    if (count === 3) return 'bg-orange-600 border border-orange-400 text-white shadow-sm'
    return 'bg-gradient-to-r from-orange-500 via-[#EC4899] to-pink-500 border border-pink-400 text-white shadow-md'
  }

  return (
    <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* Top Header & Day Streak Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
            <Flame size={18} className="text-orange-500 fill-orange-500 animate-pulse" />
            Learning Streak
          </div>
          <h3 className="text-3xl font-black text-[#EC4899] font-mono flex items-center gap-2">
            {streakDays} Days <span className="text-sm font-semibold text-purple-200">🔥</span>
          </h3>
          <p className="text-xs text-purple-200/80 font-semibold">Great start! Keep learning daily to build momentum.</p>
        </div>

        {/* Weekly Day Tracker Pills */}
        <div className="bg-[#180E2B] border border-purple-500/25 p-3 rounded-2xl flex items-center gap-2">
          {daysOfWeek.map((day, idx) => {
            const active = activeWeeklyDays[idx]
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-purple-300 uppercase">{day}</span>
                <div 
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition shadow-sm ${
                    active 
                      ? 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-orange-600/30 ring-1 ring-amber-300' 
                      : 'bg-purple-950/60 border border-purple-800/40 text-purple-400'
                  }`}
                >
                  {active ? <Flame size={14} className="fill-white" /> : '•'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity Heatmap Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-[#EC4899] flex items-center gap-2">
            <Calendar size={16} className="text-purple-400" /> Activity Heatmap
          </h4>
          
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-300">
            <span>Less</span>
            <span className="w-3 h-3 rounded-md bg-[#180E2B] border border-purple-500/20 inline-block" />
            <span className="w-3 h-3 rounded-md bg-orange-950/60 border border-orange-700/40 inline-block" />
            <span className="w-3 h-3 rounded-md bg-orange-700/60 inline-block" />
            <span className="w-3 h-3 rounded-md bg-orange-600 inline-block" />
            <span className="w-3 h-3 rounded-md bg-gradient-to-r from-orange-500 to-pink-500 inline-block" />
            <span>More</span>
          </div>
        </div>

        <div className="bg-[#180E2B] border border-purple-500/20 p-4 rounded-2xl space-y-3">
          
          {/* Column Header: Day Names */}
          <div className="grid grid-cols-12 text-[10px] font-extrabold text-purple-300 uppercase pb-1 border-b border-purple-500/15">
            <div className="col-span-5">Week Period</div>
            <div className="col-span-7 grid grid-cols-7 text-center">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
          </div>

          {/* Rows */}
          {heatmapRows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-12 items-center text-xs">
              <span className="col-span-5 text-purple-200 font-bold truncate text-[11px]">{row.label}</span>
              <div className="col-span-7 grid grid-cols-7 gap-1.5 justify-items-center">
                {row.days.map((val, dIdx) => (
                  <div 
                    key={dIdx}
                    title={`${row.label} Day ${dIdx + 1}: ${val} learning sessions`}
                    className={`w-6 h-6 rounded-lg transition-transform hover:scale-115 cursor-pointer flex items-center justify-center ${getHeatmapColor(val)}`}
                  >
                    {val > 2 && <Sparkles size={10} className="text-white" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
