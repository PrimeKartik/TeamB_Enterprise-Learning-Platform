import React from 'react';
import { Award, AlertCircle, Target, Sparkles } from 'lucide-react';
import { calculateATSScore } from '../data/resumeTemplates';

export default function ATSScoreWidget({ resumeData, onJumpToSection }) {
  const { totalScore, breakdown, missing } = calculateATSScore(resumeData);

  const getScoreBadgeColor = (score) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 65) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-pink-400 border-pink-500/40 bg-pink-500/10';
  };

  return (
    <div className="bg-panel border border-soft p-5 rounded-2xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-soft pb-3">
        <h3 className="text-sm font-black text-heading flex items-center gap-2">
          <Award className="text-amber-400" size={18} /> Dynamic ATS Resume Match Score
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${getScoreBadgeColor(totalScore)}`}>
          {totalScore >= 85 ? 'Excellent ATS Score 🚀' : totalScore >= 65 ? 'Good ATS Match 👍' : 'Needs Optimization ⚠️'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Circle Score */}
        <div className="flex flex-col items-center justify-center p-4 bg-base rounded-xl border border-soft text-center h-full shadow-inner">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="38" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="7" fill="transparent" />
              <circle 
                cx="48" cy="48" r="38" 
                stroke={totalScore >= 85 ? '#10B981' : totalScore >= 65 ? '#F59E0B' : '#EC4899'} 
                strokeWidth="7" 
                fill="transparent" 
                strokeDasharray="238.7" 
                strokeDashoffset={238.7 - (238.7 * totalScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-heading">{totalScore}%</span>
              <span className="text-[9px] text-muted uppercase font-bold">ATS Score</span>
            </div>
          </div>
          <span className="text-[10px] text-muted font-mono mt-2">Recruiter Scan Grade</span>
        </div>

        {/* Category Breakdown Progress */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1 bg-base/50 p-2.5 rounded-xl border border-soft">
            <div className="flex justify-between text-muted font-semibold text-[11px]">
              <span>Personal & Contact</span>
              <span className="text-heading font-mono">{breakdown.personal} / 20</span>
            </div>
            <div className="w-full bg-base border border-soft rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${(breakdown.personal / 20) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1 bg-base/50 p-2.5 rounded-xl border border-soft">
            <div className="flex justify-between text-muted font-semibold text-[11px]">
              <span>Summary & Keywords</span>
              <span className="text-heading font-mono">{breakdown.summary} / 15</span>
            </div>
            <div className="w-full bg-base border border-soft rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-400 h-full rounded-full transition-all duration-500" style={{ width: `${(breakdown.summary / 15) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1 bg-base/50 p-2.5 rounded-xl border border-soft">
            <div className="flex justify-between text-muted font-semibold text-[11px]">
              <span>Experience & Metrics</span>
              <span className="text-heading font-mono">{breakdown.experience} / 25</span>
            </div>
            <div className="w-full bg-base border border-soft rounded-full h-1.5 overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full transition-all duration-500" style={{ width: `${(breakdown.experience / 25) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1 bg-base/50 p-2.5 rounded-xl border border-soft">
            <div className="flex justify-between text-muted font-semibold text-[11px]">
              <span>Projects & Links</span>
              <span className="text-heading font-mono">{breakdown.projects} / 15</span>
            </div>
            <div className="w-full bg-base border border-soft rounded-full h-1.5 overflow-hidden">
              <div className="bg-pink-400 h-full rounded-full transition-all duration-500" style={{ width: `${(breakdown.projects / 15) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1 bg-base/50 p-2.5 rounded-xl border border-soft">
            <div className="flex justify-between text-muted font-semibold text-[11px]">
              <span>Technical Skills</span>
              <span className="text-heading font-mono">{breakdown.skills} / 15</span>
            </div>
            <div className="w-full bg-base border border-soft rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${(breakdown.skills / 15) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-1 bg-base/50 p-2.5 rounded-xl border border-soft">
            <div className="flex justify-between text-muted font-semibold text-[11px]">
              <span>Education & Certs</span>
              <span className="text-heading font-mono">{breakdown.eduCert} / 10</span>
            </div>
            <div className="w-full bg-base border border-soft rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full transition-all duration-500" style={{ width: `${(breakdown.eduCert / 10) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Missing Recommendations */}
      {missing.length > 0 && (
        <div className="pt-2 border-t border-soft space-y-2">
          <span className="text-[11px] font-bold text-pink-400 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertCircle size={14} /> Recommended Improvements ({missing.length} Items To Increase ATS Score)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onJumpToSection && onJumpToSection(item)}
                className="px-2.5 py-1 rounded-lg bg-base border border-soft text-[11px] font-medium text-purple-300 hover:text-heading hover:border-purple-500/40 transition cursor-pointer flex items-center gap-1"
              >
                <Target size={11} className="text-amber-400" /> Fix {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
