import { Clock, Trophy, CheckCircle2, Zap, Award, Lock, Loader2 } from "lucide-react";

export default function AssessmentCard({ assessment, result, hasCertificate, onStart, locked, starting }) {
  const attempted = !!result;

  return (
    <div className={`bg-panel border border-soft rounded-2xl shadow-xl p-6 transition-all duration-300 flex flex-col justify-between ${locked ? "opacity-70" : "hover:shadow-2xl hover:border-primary/40"}`}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-primary shrink-0">
              <Zap size={18} />
            </div>
            <h2 className="text-lg font-bold text-heading leading-snug">
              {assessment.title}
            </h2>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {attempted && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                <CheckCircle2 size={13} /> {result.bestScore}/{result.total}
              </span>
            )}
            {hasCertificate && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
                <Award size={13} /> Certificate Earned
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed mb-4">
          {assessment.description}
        </p>

        {locked && (
          <div className="mb-4 rounded-xl bg-soft/60 border border-soft px-4 py-2.5 flex items-center gap-2 text-xs text-muted font-medium">
            <Lock size={15} />
            <span>Enroll in this course to unlock its assessment.</span>
          </div>
        )}

        {hasCertificate && (
          <div className="mb-4 rounded-xl bg-amber-500/5 border border-amber-500/20 px-4 py-2.5 flex items-center gap-2 text-xs text-amber-400 font-medium">
            <Award size={15} />
            <span>You scored a perfect result — certificate available in the <strong>Certificates</strong> section!</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted border-t border-soft/60 pt-4">
          <span className="flex items-center gap-1.5 font-medium text-heading">
            <Clock size={15} className="text-purple-400" />
            {assessment.duration} Minutes
          </span>

          <span className="flex items-center gap-1.5 font-medium text-heading">
            <Trophy size={15} className="text-amber-400" />
            {assessment.questions?.length || 5} Questions
          </span>
        </div>
      </div>

      <button
        onClick={() => !locked && !starting && onStart(assessment.id)}
        disabled={locked || starting}
        className={`mt-6 w-full py-2.5 rounded-xl font-semibold text-xs transition shadow-md flex items-center justify-center gap-2 ${
          locked || starting
            ? "bg-soft text-muted cursor-not-allowed shadow-none"
            : "bg-brand-gradient text-white hover:opacity-95"
        }`}
      >
        {locked ? (
          <Lock size={15} />
        ) : starting ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Zap size={15} />
        )}
        {locked
          ? "Enroll to Unlock"
          : starting
          ? "Generating Questions..."
          : attempted
          ? "Retake Skill Assessment"
          : "Start Assessment Quiz"}
      </button>
    </div>
  );
}
