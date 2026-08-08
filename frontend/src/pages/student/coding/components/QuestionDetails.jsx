import React, { useState } from 'react';
import {
  BookOpen,
  Zap,
  Clock,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Tag,
  Layers
} from 'lucide-react';

export default function QuestionDetails({ question }) {
  const [openHintIndex, setOpenHintIndex] = useState(null);

  if (!question) return null;

  let hints = [];
  try {
    hints = typeof question.hintsJson === 'string' ? JSON.parse(question.hintsJson) : (question.hintsJson || []);
  } catch (e) {
    hints = [question.hintsJson];
  }

  const tags = question.tagsCsv ? question.tagsCsv.split(',').map(t => t.trim()) : [];

  return (
    <div className="space-y-5 text-sm text-heading overflow-y-auto max-h-full pr-1">
      {/* Header Info */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400">
            {question.difficulty}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Zap size={13} /> +{question.xpReward || 50} XP
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-base border border-soft text-muted flex items-center gap-1">
            <Clock size={13} /> {question.expectedTimeMinutes || 15} mins
          </span>
        </div>

        <h2 className="text-2xl font-black text-heading leading-tight">
          {question.title}
        </h2>

        <div className="flex items-center gap-2 text-xs text-muted mt-2">
          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
            <BookOpen size={13} /> {question.courseTitle}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers size={13} /> {question.moduleName} ({question.topicName})
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-base border border-soft rounded-xl p-4 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <FileCode size={14} className="text-purple-500" /> Description
        </h4>
        <p className="text-sm text-heading leading-relaxed whitespace-pre-line font-sans">
          {question.description}
        </p>
      </div>

      {/* Input / Output Format */}
      {(question.inputFormat || question.outputFormat) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.inputFormat && (
            <div className="bg-base border border-soft rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase text-muted block mb-1">Input Format</span>
              <p className="text-xs font-mono text-purple-600 dark:text-purple-300">{question.inputFormat}</p>
            </div>
          )}
          {question.outputFormat && (
            <div className="bg-base border border-soft rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase text-muted block mb-1">Output Format</span>
              <p className="text-xs font-mono text-emerald-600 dark:text-emerald-300">{question.outputFormat}</p>
            </div>
          )}
        </div>
      )}

      {/* Sample Input & Sample Output */}
      {(question.sampleInput || question.sampleOutput) && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Sample Example</h4>
          <div className="bg-base border border-soft rounded-xl p-4 font-mono text-xs space-y-3">
            {question.sampleInput && (
              <div>
                <span className="text-muted block text-[10px] uppercase font-sans mb-1 font-bold">Sample Input</span>
                <pre className="text-purple-600 dark:text-purple-300 overflow-x-auto whitespace-pre-wrap">{question.sampleInput}</pre>
              </div>
            )}
            {question.sampleOutput && (
              <div className="pt-2 border-t border-soft">
                <span className="text-muted block text-[10px] uppercase font-sans mb-1 font-bold">Sample Output</span>
                <pre className="text-emerald-600 dark:text-emerald-400 overflow-x-auto whitespace-pre-wrap">{question.sampleOutput}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Constraints */}
      {question.constraintsText && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 mb-1.5">
            <AlertCircle size={14} /> Constraints
          </h4>
          <pre className="text-xs font-mono text-muted whitespace-pre-line leading-relaxed">
            {question.constraintsText}
          </pre>
        </div>
      )}

      {/* Hints Accordion */}
      {hints.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
            <Lightbulb size={14} className="text-amber-500" /> Hints ({hints.length})
          </h4>
          {hints.map((hint, idx) => {
            const isOpen = openHintIndex === idx;
            return (
              <div key={idx} className="bg-panel border border-soft rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenHintIndex(isOpen ? null : idx)}
                  className="w-full p-3 text-left font-semibold text-xs text-heading flex items-center justify-between hover:bg-soft/40 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Lightbulb size={14} className="text-amber-500 shrink-0" />
                    Hint #{idx + 1}
                  </span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-muted border-t border-soft/50 bg-base/30 leading-relaxed font-sans">
                    {hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="pt-2">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-base border border-soft text-purple-600 dark:text-purple-300 flex items-center gap-1">
                <Tag size={11} /> {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
