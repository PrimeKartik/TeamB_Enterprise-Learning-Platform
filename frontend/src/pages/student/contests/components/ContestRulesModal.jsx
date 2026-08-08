import React from 'react';
import { X, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function ContestRulesModal({ contest, onClose, onConfirmRegister }) {
  if (!contest) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-panel border border-soft rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-soft pb-4">
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-heading">Official Contest Rules</h3>
            <p className="text-xs text-purple-400 font-medium">{contest.title}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-heading leading-relaxed font-sans max-h-64 overflow-y-auto pr-1">
          <div className="bg-base/60 border border-soft p-3.5 rounded-xl space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-purple-300 text-[11px] flex items-center gap-1.5">
              <FileText size={13} /> General Code Conduct
            </h4>
            <ul className="space-y-1.5 text-muted list-disc list-inside">
              <li>All code submitted must be written independently during the live contest window.</li>
              <li>Plagiarism, multi-account usage, or automated AI bot submissions will lead to immediate disqualification.</li>
              <li>Supported languages: Java, Python 3, C, C++, and JavaScript (Node.js).</li>
            </ul>
          </div>

          <div className="bg-base/60 border border-soft p-3.5 rounded-xl space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-amber-400 text-[11px] flex items-center gap-1.5">
              <AlertCircle size={13} /> Scoring & Penalty Rules
            </h4>
            <ul className="space-y-1.5 text-muted list-disc list-inside">
              <li>Each question carries fixed marks ({contest.totalMarks / (contest.questionCount || 4)} marks per question).</li>
              <li>Rankings are ordered by total score, then by lowest penalty time.</li>
              <li>Each incorrect submission adds a 15-minute penalty time to accepted solutions.</li>
              <li>When the contest timer expires, all active code in the editor is auto-submitted automatically.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-soft">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-base border border-soft text-heading rounded-xl text-xs font-semibold hover:bg-soft transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmRegister}
            className="px-5 py-2 bg-brand-gradient text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <CheckCircle2 size={15} /> Agree & Register
          </button>
        </div>
      </div>
    </div>
  );
}
