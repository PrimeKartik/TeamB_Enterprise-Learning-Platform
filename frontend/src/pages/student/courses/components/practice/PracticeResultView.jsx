import React from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Download,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  BookOpen,
  Check,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function PracticeResultView({
  result,
  moduleName,
  onRetry,
  onClose
}) {
  const isPassed = result?.passed ?? true;
  const pct = result?.percentage ?? 85;
  const acc = result?.accuracyPct ?? 83.3;

  const handleDownloadPDF = () => {
    window.print();
    toast.success('Downloading practice evaluation report...');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-2 sm:p-6 overflow-y-auto animate-fadeIn text-heading">
      <div className="max-w-4xl mx-auto w-full bg-panel border border-soft rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto">
        
        {/* Top Result Banner */}
        <div className="text-center space-y-3 border-b border-soft pb-6">
          <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center mx-auto text-white shadow-xl">
            <Trophy size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-heading">
            {isPassed ? 'Module Practice Passed! 🎉' : 'Keep Practicing! 💪'}
          </h2>
          <p className="text-xs text-muted max-w-md mx-auto">
            Evaluation complete for <span className="text-purple-400 font-bold">{moduleName}</span>
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="bg-base border border-soft p-3.5 rounded-xl text-center">
              <span className="text-2xl font-black text-purple-400 font-mono">{result?.score}/{result?.totalMarks}</span>
              <span className="block text-[11px] text-muted font-bold mt-0.5">Total Score</span>
            </div>

            <div className="bg-base border border-soft p-3.5 rounded-xl text-center">
              <span className="text-2xl font-black text-emerald-400 font-mono">{pct}%</span>
              <span className="block text-[11px] text-muted font-bold mt-0.5">Percentage</span>
            </div>

            <div className="bg-base border border-soft p-3.5 rounded-xl text-center">
              <span className="text-2xl font-black text-amber-400 font-mono">{acc}%</span>
              <span className="block text-[11px] text-muted font-bold mt-0.5">Accuracy</span>
            </div>

            <div className="bg-base border border-soft p-3.5 rounded-xl text-center">
              <span className="text-2xl font-black text-orange-400 font-mono">+{result?.xpEarned || 175}</span>
              <span className="block text-[11px] text-muted font-bold mt-0.5">XP Earned</span>
            </div>
          </div>
        </div>

        {/* Badge Unlock Alert Banner */}
        {result?.badgeUnlocked && (
          <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-amber-900/40 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award size={28} className="text-amber-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-amber-300">Badge Unlocked!</h4>
                <p className="text-xs text-muted">{result.badgeUnlocked}</p>
              </div>
            </div>
            <Sparkles size={20} className="text-amber-400 animate-bounce" />
          </div>
        )}

        {/* Detailed Question Breakdown List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-heading flex items-center gap-2">
            <BookOpen size={16} className="text-purple-400" /> Question Performance Breakdown
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {result?.breakdown?.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2 text-xs transition ${
                  item.isCorrect ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-rose-500/5 border-rose-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold">
                    {item.isCorrect ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <XCircle size={16} className="text-rose-400" />
                    )}
                    <span className="text-heading">Question #{idx + 1} ({item.questionType})</span>
                  </div>
                  <span className={`font-mono font-bold ${item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    +{item.marksAwarded} Marks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
                  <div>
                    <span className="text-muted block">Your Answer:</span>
                    <span className="font-semibold text-heading">{item.userAnswer || 'No answer provided'}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Correct Answer:</span>
                    <span className="font-semibold text-emerald-400">{item.correctAnswer}</span>
                  </div>
                </div>

                {item.explanation && (
                  <p className="text-[11px] text-muted border-t border-soft/40 pt-2 italic">
                    Explanation: {item.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-soft">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 rounded-xl bg-base border border-soft text-muted hover:text-heading transition flex items-center gap-2 cursor-pointer font-bold text-xs"
          >
            <Download size={15} /> Download PDF Report
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onRetry}
              className="px-4 py-2.5 rounded-xl bg-base border border-soft text-muted hover:text-heading transition flex items-center gap-2 cursor-pointer font-bold text-xs"
            >
              <RotateCcw size={15} /> Retry Practice
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              Return to Course <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
