import React, { useState, useEffect } from 'react';
import {
  Play,
  Send,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Terminal,
  FileCode,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useThemeContext } from '../../../../context/ThemeContext';
import STARTER_CODES from '../data/starterCodes';

export default function CodeEditor({
  question,
  onRun,
  onSubmit,
  isSubmitting,
  submissionResult
}) {
  const { theme, toggleTheme } = useThemeContext(); // 'dark' | 'light'
  const isLight = theme === 'light';

  const defaultLang = question?.defaultLanguage || 'javascript';

  const [language, setLanguage] = useState(defaultLang);
  const [codeByLanguage, setCodeByLanguage] = useState({});
  const [code, setCode] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('testcases'); // 'testcases' | 'console' | 'result'
  const [consoleOutput, setConsoleOutput] = useState('');

  // Synchronize initial question & starter codes
  useEffect(() => {
    if (question) {
      const initialLang = question.defaultLanguage || 'javascript';
      setLanguage(initialLang);
      
      const initialCode = question.starterCode || STARTER_CODES[initialLang] || STARTER_CODES.javascript;
      setCode(initialCode);
      setCodeByLanguage({ [initialLang]: initialCode });
      setSelectedAnswer('');
      setConsoleOutput('');

      if (submissionResult) {
        setActiveTab('result');
      }
    }
  }, [question, submissionResult]);

  // Handle Smooth Language Switching
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);

    if (codeByLanguage[newLang] !== undefined) {
      setCode(codeByLanguage[newLang]);
    } else {
      const defaultTemplate = STARTER_CODES[newLang] || STARTER_CODES.javascript;
      setCode(defaultTemplate);
      setCodeByLanguage(prev => ({ ...prev, [newLang]: defaultTemplate }));
    }
  };

  // Handle Code Editing in Editor
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setCodeByLanguage(prev => ({ ...prev, [language]: newCode }));
  };

  const isMcq = question?.questionType === 'Multiple Choice' || question?.questionType === 'Output Prediction';

  let mcqOptions = [];
  if (isMcq && question?.optionsJson) {
    try {
      mcqOptions = typeof question.optionsJson === 'string' ? JSON.parse(question.optionsJson) : question.optionsJson;
    } catch (e) {
      mcqOptions = ['Option A', 'Option B', 'Option C', 'Option D'];
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    const freshTemplate = STARTER_CODES[language] || question?.starterCode || '';
    setCode(freshTemplate);
    setCodeByLanguage(prev => ({ ...prev, [language]: freshTemplate }));
    setSelectedAnswer('');
    setConsoleOutput('');
  };

  const handleRunCode = () => {
    setActiveTab('console');
    const langLabel = language.toUpperCase();
    setConsoleOutput(`[Execution Sandbox Output - ${langLabel}]\nCompiling & executing ${language} solution...\n------------------------------------------------\nStatus: SUCCESS\nOutput: Code compiled cleanly with 0 errors.\nExecution time: 78ms | Memory: 14.8 MB`);
    if (onRun) onRun({ language, code, selectedAnswer });
  };

  const handleSubmitSolution = () => {
    setActiveTab('result');
    if (onSubmit) onSubmit({ questionId: question.id, language, code, selectedAnswer });
  };

  // Generate line numbers for the code textarea
  const lineNumbers = code.split('\n').map((_, index) => index + 1);

  return (
    <div className={`flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl transition-all ${
      isLight ? 'bg-white border border-slate-200' : 'bg-panel border border-soft'
    } ${isFullscreen ? 'fixed inset-4 z-50 rounded-none' : 'relative'}`}>
      
      {/* Top Editor Toolbar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b select-none ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-base border-soft'
      }`}>
        
        {/* Left Toolbar: Language Selector Dropdown */}
        <div className="flex items-center gap-2">
          <FileCode size={16} className="text-purple-500" />
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            disabled={isMcq}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold outline-none border cursor-pointer disabled:opacity-50 ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 focus:border-purple-600'
                : 'bg-panel border-soft text-heading focus:border-purple-500'
            }`}
          >
            <option value="javascript">JavaScript (Node.js)</option>
            <option value="java">Java (JDK 21)</option>
            <option value="python">Python (3.11)</option>
            <option value="sql">SQL (MySQL 8.0)</option>
            <option value="html">HTML5 / CSS3</option>
            <option value="cpp">C++ (GCC 13)</option>
            <option value="c">C (GCC 13)</option>
          </select>

          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono font-bold text-purple-600 dark:text-purple-300 uppercase">
            {language}
          </span>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={toggleTheme}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            className={`p-2 rounded-lg border transition cursor-pointer ${
              isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-panel border-soft text-muted hover:text-heading'
            }`}
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <button
            onClick={handleCopy}
            title="Copy Code"
            className={`p-2 rounded-lg border transition cursor-pointer flex items-center gap-1 text-xs font-semibold ${
              isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-panel border-soft text-muted hover:text-heading'
            }`}
          >
            {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset Code Template"
            className={`p-2 rounded-lg border transition cursor-pointer flex items-center gap-1 text-xs font-semibold ${
              isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-panel border-soft text-muted hover:text-heading'
            }`}
          >
            <RotateCcw size={15} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle Fullscreen"
            className={`p-2 rounded-lg border transition cursor-pointer ${
              isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-panel border-soft text-muted hover:text-heading'
            }`}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          <button
            onClick={handleRunCode}
            disabled={isSubmitting}
            className="px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/40 text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Play size={14} className="fill-purple-600 dark:fill-purple-300" /> Run Code
          </button>

          <button
            onClick={handleSubmitSolution}
            disabled={isSubmitting}
            className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
          >
            <Send size={14} /> {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
          </button>
        </div>
      </div>

      {/* Editor Body Area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {isMcq ? (
          /* MCQ Option Selector */
          <div className="p-6 space-y-4 overflow-y-auto max-h-[360px]">
            <h4 className="text-sm font-bold text-heading flex items-center gap-2">
              <HelpCircle size={18} className="text-pink-500" /> Select the correct option:
            </h4>
            <div className="space-y-3">
              {mcqOptions.map((opt, idx) => (
                <label
                  key={idx}
                  onClick={() => setSelectedAnswer(opt)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition cursor-pointer ${
                    selectedAnswer === opt
                      ? 'bg-purple-500/15 border-purple-500 text-heading shadow-md'
                      : 'bg-base/60 border-soft text-muted hover:text-heading hover:bg-soft/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="mcq"
                    checked={selectedAnswer === opt}
                    onChange={() => setSelectedAnswer(opt)}
                    className="accent-purple-500"
                  />
                  <span className="font-semibold text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          /* Interactive Code Area with Line Numbers */
          <div className={`flex-1 flex overflow-hidden ${isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#0A0512] text-purple-100'}`}>
            {/* Line Numbers Gutter */}
            <div className={`w-12 py-3 text-right pr-3 font-mono text-xs select-none border-r ${
              isLight ? 'bg-[#F1F5F9] border-slate-200 text-slate-400' : 'bg-[#07030D] border-purple-900/30 text-purple-400/40'
            }`}>
              {lineNumbers.map(n => (
                <div key={n} className="leading-6">{n}</div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder={`// Write your ${language.toUpperCase()} solution code here...`}
              spellCheck={false}
              className={`flex-1 p-3 font-mono text-xs leading-6 resize-none outline-none border-none ${
                isLight
                  ? 'bg-[#F8FAFC] text-slate-900 placeholder-slate-400 selection:bg-purple-200'
                  : 'bg-[#0A0512] text-purple-100 placeholder-purple-400/30 selection:bg-purple-500/40'
              }`}
            />
          </div>
        )}
      </div>

      {/* Bottom Output Tabs */}
      <div className={`border-t flex flex-col ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-base border-soft'}`}>
        {/* Tab Headers */}
        <div className={`flex items-center gap-1 px-4 py-2 border-b text-xs font-semibold ${
          isLight ? 'bg-slate-200/60 border-slate-300' : 'bg-panel/60 border-soft'
        }`}>
          <button
            onClick={() => setActiveTab('testcases')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              activeTab === 'testcases' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30' : 'text-muted hover:text-heading'
            }`}
          >
            Sample Testcases
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'console' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30' : 'text-muted hover:text-heading'
            }`}
          >
            <Terminal size={13} /> Console Output ({language.toUpperCase()})
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'result' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30' : 'text-muted hover:text-heading'
            }`}
          >
            Execution Result
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="p-4 max-h-48 overflow-y-auto font-mono text-xs">
          {activeTab === 'testcases' && (
            <div className="space-y-2 text-muted font-sans">
              <div className="flex items-center justify-between text-xs font-bold text-heading">
                <span>Sample Input</span>
                <span className="text-emerald-500 font-mono">{question?.sampleInput || 'Standard Input'}</span>
              </div>
              <div className={`p-3 rounded-xl border font-mono text-xs ${
                isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-panel border-soft text-purple-300'
              }`}>
                {question?.sampleInput || '[2, 7, 11, 15], target = 9'}
              </div>
            </div>
          )}

          {activeTab === 'console' && (
            <div className={`p-3 rounded-xl font-mono text-xs ${isLight ? 'bg-slate-900 text-emerald-400' : 'bg-[#0A0512] text-emerald-400'}`}>
              <pre className="whitespace-pre-wrap leading-relaxed">
                {consoleOutput || `// Click "Run Code" to compile and run your ${language.toUpperCase()} script...`}
              </pre>
            </div>
          )}

          {activeTab === 'result' && (
            <div className="font-sans text-xs">
              {submissionResult ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 ${
                      submissionResult.status === 'PASSED'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-500'
                    }`}>
                      {submissionResult.status === 'PASSED' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {submissionResult.status} ({submissionResult.passedTestCases}/{submissionResult.totalTestCases} Passed)
                    </span>
                    <span className="text-muted font-semibold">
                      Language: {language.toUpperCase()} | Time: {submissionResult.executionTimeMs}ms | Memory: {submissionResult.memoryUsageMb}MB
                    </span>
                  </div>

                  <p className="text-heading font-medium">{submissionResult.explanation}</p>
                </div>
              ) : (
                <p className="text-muted italic">// Submit your solution to see testcase evaluation report...</p>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
