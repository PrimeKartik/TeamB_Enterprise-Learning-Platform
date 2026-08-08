import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Send,
  Lightbulb,
  FileCode,
  Zap,
  Clock,
  HelpCircle,
  Code2,
  Layers,
  Award,
  Download,
  RotateCcw
} from 'lucide-react';
import { toast } from 'react-toastify';
import practiceService from '../../../../../services/practiceService';
import PracticeResultView from './PracticeResultView';

export default function ModulePracticeModal({
  courseId = 1,
  moduleName = 'Module 1',
  onClose,
  onComplete
}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [showHint, setShowHint] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, [courseId, moduleName]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await practiceService.getModuleQuestions(courseId, moduleName);
      setQuestions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (qId, answerValue) => {
    setUserAnswers(prev => ({ ...prev, [qId]: answerValue }));
  };

  const toggleBookmark = (qId) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSubmitPractice = async () => {
    setIsSubmitting(true);
    try {
      const result = await practiceService.submitPractice({
        courseId,
        moduleName,
        answers: userAnswers
      });
      setEvaluationResult(result);
      if (onComplete) onComplete(result);
      toast.success('🎉 Practice Assessment Submitted!');
    } catch (err) {
      toast.error('Failed to submit practice. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-panel border border-soft p-8 rounded-2xl text-center space-y-3 text-heading">
          <Sparkles size={32} className="mx-auto text-purple-400 animate-spin" />
          <h3 className="text-lg font-bold">Loading Module Practice Questions...</h3>
        </div>
      </div>
    );
  }

  if (evaluationResult) {
    return (
      <PracticeResultView
        result={evaluationResult}
        moduleName={moduleName}
        onRetry={() => { setEvaluationResult(null); setCurrentIndex(0); setUserAnswers({}); }}
        onClose={onClose}
      />
    );
  }

  const currentQ = questions[currentIndex] || {};
  const isLast = currentIndex === questions.length - 1;
  const isBookmarked = bookmarkedIds.has(currentQ.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-2 sm:p-6 animate-fadeIn text-heading">
      
      {/* Top Modal Header */}
      <div className="bg-panel border border-soft rounded-2xl p-4 mb-4 flex items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-base font-bold text-heading flex items-center gap-2">
              {moduleName} Practice <Sparkles size={16} className="text-amber-400" />
            </h2>
            <span className="text-xs text-purple-400 font-semibold">
              Question {currentIndex + 1} of {questions.length} · {currentQ.topicName || 'General Topic'}
            </span>
          </div>
        </div>

        {/* Progress Pill & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
              isBookmarked ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-base border-soft text-muted hover:text-heading'
            }`}
          >
            <Bookmark size={15} className={isBookmarked ? 'fill-amber-400' : ''} />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="w-full bg-base border border-soft rounded-full h-2 mb-4 overflow-hidden">
        <div
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-brand-gradient transition-all duration-300 rounded-full"
        />
      </div>

      {/* Main Solver Workspace Body */}
      <div className="flex-1 bg-panel border border-soft rounded-2xl p-6 overflow-y-auto min-h-0 space-y-6 flex flex-col justify-between shadow-2xl">
        
        <div className="space-y-5">
          {/* Question Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-soft pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 uppercase">
                {currentQ.questionType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                <Zap size={13} /> {currentQ.marks || 10} Marks
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-base border border-soft text-muted">
                Difficulty: {currentQ.difficulty || 'Medium'}
              </span>
            </div>

            {currentQ.hints && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'View Hint'}
              </button>
            )}
          </div>

          {/* Hint Accordion */}
          {showHint && currentQ.hints && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-300 font-sans flex items-start gap-2">
              <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>Hint: {currentQ.hints}</span>
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-heading leading-relaxed">
            {currentQ.questionText}
          </h3>

          {/* Question Input Renderers */}
          <div className="space-y-3 pt-2">
            {/* 1. MCQ Options */}
            {currentQ.questionType === 'MCQ' && (
              <div className="space-y-3">
                {(currentQ.options && currentQ.options.length > 0 ? currentQ.options : [
                  { id: 'a', optionLabel: 'A', optionText: 'Tightly coupled client-server execution' },
                  { id: 'b', optionLabel: 'B', optionText: 'Statelessness and standardized HTTP protocol interaction' },
                  { id: 'c', optionLabel: 'C', optionText: 'Mandatory XML data payload structure' },
                  { id: 'd', optionLabel: 'D', optionText: 'Single thread execution limitation' }
                ]).map(opt => (
                  <label
                    key={opt.id || opt.optionLabel}
                    onClick={() => handleSelectAnswer(currentQ.id, opt.optionText)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition cursor-pointer ${
                      userAnswers[currentQ.id] === opt.optionText
                        ? 'bg-purple-500/20 border-purple-500 text-heading shadow-md'
                        : 'bg-base/60 border-soft text-muted hover:text-heading hover:bg-soft/40'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-panel border border-soft flex items-center justify-center font-mono font-bold text-xs text-purple-400 shrink-0">
                      {opt.optionLabel}
                    </span>
                    <span className="font-medium text-sm">{opt.optionText}</span>
                  </label>
                ))}
              </div>
            )}

            {/* 2. TRUE / FALSE */}
            {currentQ.questionType === 'TRUE_FALSE' && (
              <div className="grid grid-cols-2 gap-4">
                {['True', 'False'].map(val => (
                  <button
                    key={val}
                    onClick={() => handleSelectAnswer(currentQ.id, val)}
                    className={`p-5 rounded-2xl border text-base font-bold transition cursor-pointer ${
                      userAnswers[currentQ.id] === val
                        ? 'bg-purple-500/20 border-purple-500 text-heading shadow-lg'
                        : 'bg-base/60 border-soft text-muted hover:text-heading hover:bg-soft'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            )}

            {/* 3. SHORT ANSWER / SCENARIO / CASE STUDY / MINI ASSIGNMENT / CODING */}
            {['SHORT_ANSWER', 'SCENARIO', 'CASE_STUDY', 'MINI_ASSIGNMENT', 'CODING'].includes(currentQ.questionType) && (
              <div className="space-y-3">
                {currentQ.scenarioDetails && (
                  <div className="p-4 rounded-xl bg-base border border-soft text-xs text-purple-300 font-mono">
                    {currentQ.scenarioDetails}
                  </div>
                )}
                {currentQ.assignmentDetails && (
                  <div className="p-4 rounded-xl bg-base border border-soft text-xs text-emerald-300 whitespace-pre-line">
                    {currentQ.assignmentDetails}
                  </div>
                )}
                <textarea
                  value={userAnswers[currentQ.id] || ''}
                  onChange={(e) => handleSelectAnswer(currentQ.id, e.target.value)}
                  placeholder={`Write your ${currentQ.questionType.toLowerCase().replace('_', ' ')} solution code or explanation here...`}
                  rows={6}
                  className="w-full bg-base border border-soft rounded-xl p-4 text-xs font-mono text-heading outline-none focus:border-purple-500 transition resize-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-soft pt-4">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 rounded-xl bg-base border border-soft text-muted hover:text-heading disabled:opacity-40 transition flex items-center gap-2 cursor-pointer font-bold text-xs"
          >
            <ArrowLeft size={16} /> Previous
          </button>

          {isLast ? (
            <button
              onClick={handleSubmitPractice}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Send size={16} /> {isSubmitting ? 'Evaluating...' : 'Finish & Submit Practice'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1))}
              className="px-6 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs hover:opacity-90 transition flex items-center gap-2 shadow-lg cursor-pointer"
            >
              Next Question <ArrowRight size={16} />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
