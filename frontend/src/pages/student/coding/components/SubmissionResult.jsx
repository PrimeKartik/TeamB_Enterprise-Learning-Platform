import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export default function SubmissionResult({ result, onContinue, onRetry }) {
  if (!result) return null;

  const isPassed = result.status === 'PASSED';

  return (
    <div className="bg-panel border border-soft rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
      {/* Header Result Banner */}
      <div className={`p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
        isPassed
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}>
            {isPassed ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
          </div>
          <div>
            <h3 className="text-xl font-black text-heading flex items-center gap-2">
              {isPassed ? 'Accepted - All Testcases Passed! 🎉' : 'Submission Failed - Try Again'}
            </h3>
            <p className="text-xs text-muted font-medium mt-0.5">
              Passed {result.passedTestCases} out of {result.totalTestCases} test cases
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-muted block uppercase font-bold">Accuracy Score</span>
            <span className="text-2xl font-black text-heading">{result.score}%</span>
          </div>
          {isPassed && result.xpEarned > 0 && (
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1">
              <Zap size={15} /> +{result.xpEarned} XP
            </div>
          )}
        </div>
      </div>

      {/* Metrics Row: Execution Time & Memory Usage */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-base/60 border border-soft p-3.5 rounded-xl text-center">
          <span className="text-[10px] font-bold uppercase text-muted block">Testcases Passed</span>
          <span className="text-lg font-extrabold text-heading mt-0.5 block">
            {result.passedTestCases} / {result.totalTestCases}
          </span>
        </div>
        <div className="bg-base/60 border border-soft p-3.5 rounded-xl text-center">
          <span className="text-[10px] font-bold uppercase text-muted block flex items-center justify-center gap-1">
            <Clock size={12} /> Execution Time
          </span>
          <span className="text-lg font-extrabold text-purple-400 mt-0.5 block">
            {result.executionTimeMs} ms
          </span>
        </div>
        <div className="bg-base/60 border border-soft p-3.5 rounded-xl text-center">
          <span className="text-[10px] font-bold uppercase text-muted block flex items-center justify-center gap-1">
            <HardDrive size={12} /> Memory Usage
          </span>
          <span className="text-lg font-extrabold text-cyan-400 mt-0.5 block">
            {result.memoryUsageMb} MB
          </span>
        </div>
        <div className="bg-base/60 border border-soft p-3.5 rounded-xl text-center">
          <span className="text-[10px] font-bold uppercase text-muted block">Status</span>
          <span className={`text-lg font-extrabold mt-0.5 block ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
            {result.status}
          </span>
        </div>
      </div>

      {/* Test Cases Detailed Breakdown */}
      {result.testResults && result.testResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
            <TrendingUp size={14} className="text-purple-400" /> Test Case Execution Breakdown
          </h4>
          <div className="space-y-2">
            {result.testResults.map((tc, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border font-mono text-xs ${
                  tc.passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
                }`}
              >
                <div className="flex items-center justify-between font-sans mb-1.5">
                  <span className="font-bold text-heading text-xs flex items-center gap-1.5">
                    {tc.passed ? (
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle size={15} className="text-rose-400 shrink-0" />
                    )}
                    Testcase #{idx + 1}
                  </span>
                  <span className={`text-[11px] font-bold ${tc.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tc.passed ? 'PASSED' : 'FAILED'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-muted block text-[10px] font-sans">Input:</span>
                    <span className="text-purple-300">{tc.input}</span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px] font-sans">Expected vs Actual:</span>
                    <span className="text-emerald-400">Expected: {tc.expectedOutput}</span>
                    {!tc.passed && <span className="text-rose-400 block">Actual: {tc.actualOutput}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Explanation & Suggested Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.explanation && (
          <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
            <h5 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} /> Evaluation Notes
            </h5>
            <p className="text-xs text-heading leading-relaxed">{result.explanation}</p>
          </div>
        )}

        {result.suggestedImprovements && (
          <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-1">
            <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb size={14} /> Suggested Improvements
            </h5>
            <p className="text-xs text-heading leading-relaxed">{result.suggestedImprovements}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-base border border-soft text-heading rounded-xl text-xs font-bold hover:bg-soft transition cursor-pointer"
        >
          Modify Solution
        </button>
        <button
          onClick={onContinue}
          className="px-5 py-2 bg-brand-gradient text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          Next Problem <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
