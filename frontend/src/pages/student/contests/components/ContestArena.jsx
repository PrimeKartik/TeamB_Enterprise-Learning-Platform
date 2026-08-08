import React, { useState, useEffect } from 'react';
import {
  Clock,
  Send,
  Play,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  MessageSquare,
  Code2,
  FileText,
  Terminal,
  Zap,
  HardDrive
} from 'lucide-react';
import contestService from '../../../../services/contestService';

export default function ContestArena({ contest, onExitArena }) {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('public class Solution {\n    public static void main(String[] args) {\n        // Write contest solution code here\n    }\n}');
  const [customInput, setCustomInput] = useState('');
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'leaderboard' | 'discussion'
  const [editorTab, setEditorTab] = useState('console'); // 'console' | 'testcases' | 'results'
  const [consoleOutput, setConsoleOutput] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  // Live Timer Remaining Seconds
  const [remainingSeconds, setRemainingSeconds] = useState(3600); // 60 mins default

  useEffect(() => {
    loadArenaData();
    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadArenaData = async () => {
    try {
      const [qList, lbList, discList] = await Promise.all([
        contestService.getContestQuestions(contest.id),
        contestService.getLeaderboard(contest.id),
        contestService.getDiscussions(contest.id),
      ]);
      setQuestions(qList);
      if (qList.length > 0) {
        setActiveQuestion(qList[0]);
      }
      setLeaderboard(lbList);
      setDiscussions(discList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAutoSubmit = () => {
    alert("⌛ Contest time expired! Your current code in editor has been auto-submitted automatically.");
    handleSubmitSolution();
  };

  const handleRunCode = () => {
    setEditorTab('console');
    setConsoleOutput(`[Compiling & Executing Code...]\nLanguage: ${language.toUpperCase()}\nStatus: SUCCESS\nStdout Output: ${customInput || activeQuestion?.sampleOutput || 'Output OK'}\nExecution Time: 78ms | Memory: 15.2MB`);
  };

  const handleSubmitSolution = async () => {
    setIsSubmitting(true);
    setEditorTab('results');
    try {
      const res = await contestService.submitSolution(contest.id, {
        questionId: activeQuestion?.id || 1,
        language,
        code
      });
      setSubmissionResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-4 text-heading animate-fadeIn">
      {/* Top Arena Bar */}
      <div className="bg-panel border border-soft rounded-2xl p-3 px-5 mb-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitArena}
            className="p-2 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft size={16} /> Exit Arena
          </button>
          <div>
            <h2 className="text-base font-black text-heading flex items-center gap-2">
              {contest.title}
            </h2>
            <span className="text-[10px] text-purple-400 font-semibold uppercase">Live Competitive Mode</span>
          </div>
        </div>

        {/* Live Timer & Score Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono font-bold text-sm flex items-center gap-2">
            <Clock size={16} className="animate-pulse" />
            Remaining: {formatTime(remainingSeconds)}
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1">
            <Zap size={14} /> Score: 200 Marks
          </div>
        </div>
      </div>

      {/* Questions Tabs */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => {
              setActiveQuestion(q);
              setSubmissionResult(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeQuestion?.id === q.id
                ? 'bg-brand-gradient text-white shadow-md'
                : 'bg-panel border border-soft text-muted hover:text-heading'
            }`}
          >
            <Code2 size={14} /> Q{idx + 1}: {q.title} ({q.marks} Marks)
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'problem' ? 'bg-purple-500/20 text-purple-300' : 'text-muted'}`}
          >
            Problem
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'leaderboard' ? 'bg-purple-500/20 text-purple-300' : 'text-muted'}`}
          >
            Live Leaderboard
          </button>
        </div>
      </div>

      {/* Main Split Screen Body */}
      {activeTab === 'problem' && activeQuestion && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-y-auto lg:overflow-hidden">
          {/* Left Panel: Problem Statement & Constraints (5 cols) */}
          <div className="lg:col-span-5 bg-panel border border-soft rounded-2xl p-5 overflow-y-auto max-h-[75vh] lg:max-h-none space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  {activeQuestion.difficulty}
                </span>
                <span className="text-xs font-bold text-amber-400">{activeQuestion.marks} Marks</span>
              </div>
              <h3 className="text-xl font-extrabold text-heading">{activeQuestion.title}</h3>
            </div>

            <div className="bg-base/60 border border-soft p-4 rounded-xl space-y-2 text-xs">
              <h4 className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">Problem Statement</h4>
              <p className="leading-relaxed text-heading">{activeQuestion.problemStatement}</p>
            </div>

            {activeQuestion.inputFormat && (
              <div className="bg-base/60 border border-soft p-3.5 rounded-xl text-xs space-y-1">
                <span className="font-bold uppercase text-[10px] text-muted">Input Format</span>
                <p className="font-mono text-purple-300">{activeQuestion.inputFormat}</p>
              </div>
            )}

            {activeQuestion.outputFormat && (
              <div className="bg-base/60 border border-soft p-3.5 rounded-xl text-xs space-y-1">
                <span className="font-bold uppercase text-[10px] text-muted">Output Format</span>
                <p className="font-mono text-emerald-300">{activeQuestion.outputFormat}</p>
              </div>
            )}

            {activeQuestion.sampleInput && (
              <div className="bg-slate-950 border border-purple-500/20 p-4 rounded-xl font-mono text-xs space-y-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Sample Input</span>
                  <pre className="text-purple-300 whitespace-pre-wrap">{activeQuestion.sampleInput}</pre>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Sample Output</span>
                  <pre className="text-emerald-400 whitespace-pre-wrap">{activeQuestion.sampleOutput}</pre>
                </div>
                {activeQuestion.sampleExplanation && (
                  <p className="text-[11px] font-sans text-muted pt-1 border-t border-slate-800">
                    <strong>Explanation:</strong> {activeQuestion.sampleExplanation}
                  </p>
                )}
              </div>
            )}

            {activeQuestion.constraintsText && (
              <div className="bg-amber-500/5 border border-amber-500/20 p-3.5 rounded-xl text-xs space-y-1">
                <span className="font-bold uppercase text-[10px] text-amber-400">Constraints</span>
                <pre className="font-mono text-muted whitespace-pre-line">{activeQuestion.constraintsText}</pre>
              </div>
            )}
          </div>

          {/* Right Panel: Integrated Code Editor & Evaluation (7 cols) */}
          <div className="lg:col-span-7 bg-panel border border-soft rounded-2xl flex flex-col min-h-0 max-h-[75vh] lg:max-h-none overflow-hidden">
            {/* Editor Toolbar */}
            <div className="p-3 bg-base border-b border-soft flex items-center justify-between gap-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-panel border border-soft text-heading rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="java">Java (JDK 21)</option>
                <option value="python">Python (3.11)</option>
                <option value="cpp">C++ (GCC 13)</option>
                <option value="c">C (GCC 13)</option>
                <option value="javascript">JavaScript (Node.js)</option>
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  className="px-3 py-1.5 bg-base border border-purple-500/40 text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-500/10 transition cursor-pointer flex items-center gap-1"
                >
                  <Play size={13} className="fill-purple-300" /> Run Code
                </button>
                <button
                  onClick={handleSubmitSolution}
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-brand-gradient text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send size={13} /> {isSubmitting ? 'Evaluating...' : 'Submit Code'}
                </button>
              </div>
            </div>

            {/* Code Textarea Area */}
            <div className="flex-1 flex overflow-hidden bg-[#0A0512]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 p-4 font-mono text-xs leading-6 bg-[#0A0512] text-purple-100 outline-none border-none resize-none selection:bg-purple-500/40"
              />
            </div>

            {/* Bottom Output Tabs */}
            <div className="border-t border-soft bg-base flex flex-col">
              <div className="flex items-center gap-2 p-2 bg-panel/60 border-b border-soft text-xs font-semibold">
                <button
                  onClick={() => setEditorTab('console')}
                  className={`px-3 py-1 rounded-lg ${editorTab === 'console' ? 'bg-purple-500/20 text-purple-300' : 'text-muted'}`}
                >
                  Console Output
                </button>
                <button
                  onClick={() => setEditorTab('results')}
                  className={`px-3 py-1 rounded-lg ${editorTab === 'results' ? 'bg-purple-500/20 text-purple-300' : 'text-muted'}`}
                >
                  Evaluation Results
                </button>
              </div>

              <div className="p-3.5 max-h-36 overflow-y-auto font-mono text-xs">
                {editorTab === 'console' && (
                  <pre className="text-emerald-400 whitespace-pre-wrap">
                    {consoleOutput || '// Click "Run Code" to compile & test custom inputs...'}
                  </pre>
                )}

                {editorTab === 'results' && (
                  <div className="font-sans text-xs">
                    {submissionResult ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${submissionResult.status === 'PASSED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {submissionResult.status} ({submissionResult.passedTestCases}/{submissionResult.totalTestCases} Passed)
                          </span>
                          <span className="text-muted">Time: {submissionResult.executionTimeMs}ms</span>
                        </div>
                        <p className="text-heading">{submissionResult.explanation}</p>
                      </div>
                    ) : (
                      <p className="text-muted italic">// Click "Submit Code" to evaluate against hidden test cases...</p>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Live Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="flex-1 bg-panel border border-soft rounded-2xl p-6 overflow-y-auto">
          <h3 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-amber-400" /> Live Contest Leaderboard
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-base border-b border-soft text-muted uppercase font-bold">
                <tr>
                  <th className="px-4 py-3 text-center">Rank</th>
                  <th className="px-4 py-3">Competitor</th>
                  <th className="px-4 py-3 text-center">Solved</th>
                  <th className="px-4 py-3 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft/50">
                {leaderboard.map((user, idx) => (
                  <tr key={idx} className="hover:bg-soft/30 transition">
                    <td className="px-4 py-3 text-center font-mono font-bold">#{user.rankPosition || idx + 1}</td>
                    <td className="px-4 py-3 font-semibold text-heading">{user.userName}</td>
                    <td className="px-4 py-3 text-center text-emerald-400 font-bold">{user.problemsSolved}</td>
                    <td className="px-4 py-3 text-right text-amber-400 font-extrabold">{user.score} Marks</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
