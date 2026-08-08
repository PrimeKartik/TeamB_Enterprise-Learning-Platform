import { Trophy, Award, Lock, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProgressHeader({
  title,
  progress,
  onClaimCertificate
}) {
  const navigate = useNavigate()
  const isCompleted = (progress || 0) >= 100

  return (
    <div className="rounded-2xl bg-[#201233] p-6 shadow-xl border border-white/10 space-y-4">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#EC4899] uppercase tracking-wider font-mono">
            Course Player & Progression
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {isCompleted ? (
            <button
              onClick={onClaimCertificate || (() => navigate('/dashboard/certificates'))}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-extrabold shadow-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
            >
              <Award size={16} /> Claim Official Certificate
            </button>
          ) : (
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-[#1A1028] border border-white/10 text-gray-400 text-xs font-semibold flex items-center gap-2 cursor-not-allowed opacity-80"
              title="Complete 100% of the course to unlock your certificate"
            >
              <Lock size={14} className="text-amber-400" />
              <span>Complete the course to unlock your certificate.</span>
            </button>
          )}

          <Trophy
            className={isCompleted ? "text-amber-400 animate-bounce" : "text-[#EC4899]"}
            size={28}
          />
        </div>
      </div>

      <div className="h-3 rounded-full bg-[#1A1028] overflow-hidden border border-white/5">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] transition-all duration-500"
          style={{
            width: `${Math.min(progress || 0, 100)}%`
          }}
        />
      </div>

      <div className="flex items-center justify-between text-xs font-semibold text-[#B8B8C7]">
        <span>{progress || 0}% Completed</span>
        {isCompleted && (
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={14} /> Course 100% Finished!
          </span>
        )}
      </div>

    </div>
  )
}