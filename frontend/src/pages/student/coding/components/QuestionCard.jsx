import React from 'react';
import {
  Code2,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Tag,
  Layers,
  Terminal,
  HelpCircle,
  Bug,
  Database
} from 'lucide-react';

export default function QuestionCard({ question, isSolved, onSelect }) {
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Beginner
          </span>
        );
      case 'intermediate':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Intermediate
          </span>
        );
      case 'advanced':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            Advanced
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400">
            {difficulty}
          </span>
        );
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'SQL Query':
        return <Database size={13} className="text-cyan-400" />;
      case 'Debug Code':
        return <Bug size={13} className="text-amber-400" />;
      case 'Multiple Choice':
      case 'Output Prediction':
        return <HelpCircle size={13} className="text-pink-400" />;
      default:
        return <Code2 size={13} className="text-purple-400" />;
    }
  };

  const tags = question.tagsCsv ? question.tagsCsv.split(',').map(t => t.trim()) : [];

  return (
    <div className="bg-panel border border-soft hover:border-purple-500/50 rounded-2xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
      <div>
        {/* Top Badges Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {getDifficultyBadge(question.difficulty)}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
              {getTypeIcon(question.questionType)}
              {question.questionType}
            </span>
          </div>

          {isSolved && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 size={14} /> Solved
            </span>
          )}
        </div>

        {/* Question Title */}
        <h3 className="text-lg font-bold text-heading group-hover:text-purple-300 transition-colors line-clamp-1">
          {question.title}
        </h3>

        {/* Course & Topic */}
        <div className="flex items-center gap-3 text-xs text-muted mt-1.5 mb-3">
          <span className="flex items-center gap-1 text-purple-400 font-medium">
            <BookOpen size={13} /> {question.courseTitle}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium">
            <Layers size={13} /> {question.moduleName}
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-muted/80 line-clamp-2 leading-relaxed mb-4">
          {question.description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-base/80 border border-soft text-muted flex items-center gap-1">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Action Button */}
      <div className="pt-3 border-t border-soft/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs font-medium text-muted">
          <span className="flex items-center gap-1 text-amber-400">
            <Zap size={14} /> +{question.xpReward || 50} XP
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {question.expectedTimeMinutes || 15}m
          </span>
        </div>

        <button
          onClick={() => onSelect(question)}
          className="px-4 py-2 bg-brand-gradient text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 shadow-md cursor-pointer group-hover:shadow-purple-500/20"
        >
          {isSolved ? 'Review' : 'Solve Challenge'}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
