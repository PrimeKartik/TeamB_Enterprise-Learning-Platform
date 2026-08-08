import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Code2,
  Search,
  Filter,
  BookOpen,
  Trophy,
  Award,
  Zap,
  CheckCircle2,
  Flame,
  X,
  LayoutDashboard,
  Layers,
  ArrowLeft,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import codingService from '../../../services/codingService';
import QuestionCard from './components/QuestionCard';
import QuestionDetails from './components/QuestionDetails';
import CodeEditor from './components/CodeEditor';
import SubmissionResult from './components/SubmissionResult';
import PracticeProgress from './components/PracticeProgress';
import BadgeSection from './components/BadgeSection';
import Leaderboard from './components/Leaderboard';

// Starter Code Template Generator for Course-Related Challenges
function getStarterCodeForChallenge(challengeTitle = '', topicName = '') {
  const text = (challengeTitle + ' ' + topicName).toLowerCase();
  
  if (text.includes('html') || text.includes('semantic') || text.includes('form')) {
    return `<!-- Write your Semantic HTML5 Code below -->\n<article class="developer-card">\n  <header>\n    <h2>Semantic HTML5 Card</h2>\n  </header>\n  <main>\n    <p>Build accessible and structured markup.</p>\n  </main>\n  <footer>\n    <button type="submit">Submit Form</button>\n  </footer>\n</article>`;
  }

  if (text.includes('css') || text.includes('flexbox') || text.includes('grid') || text.includes('box model')) {
    return `/* Write your CSS Layout styles below */\n.dashboard-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    gap: 1.5rem;\n    padding: 1rem;\n    box-sizing: border-box;\n}\n\n.card {\n    margin: 0 auto;\n    padding: 20px;\n    border-radius: 12px;\n}`;
  }

  if (text.includes('react') || text.includes('hook') || text.includes('state') || text.includes('jsx')) {
    return `import React, { useState } from 'react';\n\nexport default function DailyComponent() {\n  const [count, setCount] = useState(0);\n  \n  const handleIncrement = () => {\n    // Write state update logic here\n    setCount(prev => prev + 1);\n  };\n\n  return (\n    <div className="p-4 border rounded-xl">\n      <h2>Interactive State Component</h2>\n      <p>Count: {count}</p>\n      <button onClick={handleIncrement}>Increment</button>\n    </div>\n  );\n}`;
  }

  if (text.includes('node') || text.includes('express') || text.includes('rest') || text.includes('api')) {
    return `const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\n// REST API Endpoint\napp.get('/api/daily-challenge', (req, res) => {\n    res.status(200).json({\n        success: true,\n        message: 'Daily Practice API Endpoint Executed Successfully!',\n        timestamp: new Date().toISOString()\n    });\n});\n\nmodule.exports = app;`;
  }

  if (text.includes('sql') || text.includes('query') || text.includes('join') || text.includes('db')) {
    return `-- Write your SQL Query below\nSELECT u.id, u.name, u.email, e.status\nFROM users u\nINNER JOIN enrollments e ON u.id = e.user_id\nWHERE e.course_id = 1\nORDER BY u.id ASC;`;
  }

  return `function solveDailyChallenge(data) {\n    // Write your solution for: ${challengeTitle || topicName}\n    console.log("Processing challenge data...", data);\n    return true;\n}\n\n// Test execution\nsolveDailyChallenge({ test: true });`;
}

function getCourseQuestionObject(locationState) {
  const challengeTitle = locationState?.challengeTitle || locationState?.topic || 'Daily Code Challenge';
  const topic = locationState?.topic || 'Full Stack Web Development';
  const weekTitle = locationState?.weekTitle || 'Full Stack Track';
  const diff = locationState?.codingDiff || 'Medium';

  let lang = 'javascript';
  const titleLower = challengeTitle.toLowerCase();
  const topicLower = topic.toLowerCase();

  if (titleLower.includes('html') || topicLower.includes('html')) lang = 'html';
  else if (titleLower.includes('css') || titleLower.includes('flexbox') || titleLower.includes('grid') || topicLower.includes('css')) lang = 'css';
  else if (titleLower.includes('sql') || titleLower.includes('query') || titleLower.includes('join') || topicLower.includes('database')) lang = 'sql';
  else if (titleLower.includes('java') && !titleLower.includes('script')) lang = 'java';
  else if (titleLower.includes('python')) lang = 'python';

  return {
    id: `custom_${Date.now()}_${Math.floor(Math.random()*1000)}`,
    title: challengeTitle,
    description: `Implement the full coding solution for **${challengeTitle}**.\n\nModule Topic: **${topic}**.\nWeek: **${weekTitle}**.\n\nEnsure your implementation meets all functional specifications, handles edge cases, and compiles cleanly.`,
    courseId: 1,
    courseTitle: weekTitle,
    moduleName: topic,
    topicName: challengeTitle,
    difficulty: diff,
    questionType: 'Coding Challenge',
    defaultLanguage: lang,
    starterCode: getStarterCodeForChallenge(challengeTitle, topic),
    solutionCode: `// Verified solution for ${challengeTitle}\nconsole.log("Execution Clean & Verified!");`,
    constraintsText: 'Execution Time Limit: 2.0s\nMemory Limit: 256MB',
    inputFormat: 'Function arguments / Standard input stream',
    outputFormat: 'Validated output or DOM element structure',
    sampleInput: 'Sample input data',
    sampleOutput: 'Expected execution result',
    hintsJson: JSON.stringify(["Review the weekly lecture slides and MDN documentation.", "Test your code against edge case inputs."]),
    tagsCsv: `${topic}, Course Practice, SkillSphere`,
    xpReward: 100
  };
}

export default function CodingPractice() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('problems'); // 'problems' | 'dashboard' | 'leaderboard'
  const [questions, setQuestions] = useState([]);
  const [progress, setProgress] = useState(null);
  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | SOLVED | UNSOLVED

  // Active Selected Question Workspace
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [solvedQuestionIds, setSolvedQuestionIds] = useState(new Set([1, 3])); // Initial solved demo IDs

  useEffect(() => {
    loadCodingData();
  }, []);

  useEffect(() => {
    if (location.state?.challengeTitle || location.state?.topic) {
      const qObj = getCourseQuestionObject(location.state);
      setActiveQuestion(qObj);
      setSubmissionResult(null);
    }
  }, [location.key, location.state]);

  const loadCodingData = async () => {
    setLoading(true);
    try {
      const [qData, pData, bData, lData] = await Promise.all([
        codingService.getQuestions(),
        codingService.getProgress(),
        codingService.getBadges(),
        codingService.getLeaderboard(),
      ]);
      setQuestions(qData || []);
      setProgress(pData || null);
      setBadges(bData || []);
      setLeaderboard(lData || []);
    } catch (err) {
      console.error('Error loading coding practice data:', err);
    } finally {
      setLoading(false);
    }
  };

  const coursesList = [
    'Full Stack Web Development',
    'Java Programming Masterclass',
    'Python for Data Science',
    'UI/UX Design with Figma',
    'Cloud Computing with AWS'
  ];

  // Filtered Questions List
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.description && q.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.tagsCsv && q.tagsCsv.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCourse = selectedCourse === 'ALL' || q.courseTitle === selectedCourse;
      const matchesDiff = selectedDifficulty === 'ALL' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      const isSolved = solvedQuestionIds.has(q.id);
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'SOLVED' && isSolved) ||
        (statusFilter === 'UNSOLVED' && !isSolved);

      return matchesSearch && matchesCourse && matchesDiff && matchesStatus;
    });
  }, [questions, searchQuery, selectedCourse, selectedDifficulty, statusFilter, solvedQuestionIds]);

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
    setSubmissionResult(null);
  };

  const handleCloseWorkspace = () => {
    setActiveQuestion(null);
    setSubmissionResult(null);
  };

  const handleSubmitSolution = async (submissionPayload) => {
    setIsSubmitting(true);
    try {
      const result = await codingService.submitSolution(submissionPayload);
      setSubmissionResult(result);
      if (result.status === 'PASSED') {
        setSolvedQuestionIds((prev) => new Set([...prev, activeQuestion.id]));
      }
    } catch (err) {
      console.error('Error evaluating solution:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextProblem = () => {
    const currentIndex = questions.findIndex((q) => q.id === activeQuestion.id);
    if (currentIndex >= 0 && currentIndex < questions.length - 1) {
      setActiveQuestion(questions[currentIndex + 1]);
      setSubmissionResult(null);
    } else {
      handleCloseWorkspace();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Bar */}
      <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center text-white shadow-lg shrink-0">
            <Code2 size={28} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-heading flex items-center gap-2">
              Coding Practice Lab <Sparkles size={20} className="text-amber-400" />
            </h1>
            <p className="text-xs text-muted mt-1">
              Course-based hands-on coding challenges, real-time sandbox compiler & automated test evaluations
            </p>
          </div>
        </div>

        {/* Quick User Stats Pill Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 size={15} /> {solvedQuestionIds.size} Solved
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5">
            <Zap size={15} /> {progress?.xpPoints || 1250} XP
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold flex items-center gap-1.5">
            <Flame size={15} /> {progress?.currentStreak || 5}d Streak
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-soft pb-3">
        <button
          onClick={() => setActiveTab('problems')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'problems'
              ? 'bg-brand-gradient text-white shadow-md'
              : 'bg-panel border border-soft text-muted hover:text-heading'
          }`}
        >
          <Code2 size={15} /> Practice Problems ({filteredQuestions.length})
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-brand-gradient text-white shadow-md'
              : 'bg-panel border border-soft text-muted hover:text-heading'
          }`}
        >
          <LayoutDashboard size={15} /> Practice Dashboard
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-brand-gradient text-white shadow-md'
              : 'bg-panel border border-soft text-muted hover:text-heading'
          }`}
        >
          <Trophy size={15} /> Leaderboard & Badges
        </button>
      </div>

      {/* TAB 1: PRACTICE PROBLEMS GRID & FILTERS */}
      {activeTab === 'problems' && (
        <div className="space-y-6">
          {/* Filters Controls Bar */}
          <div className="bg-panel border border-soft p-4 rounded-2xl shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-3 text-muted" />
              <input
                type="text"
                placeholder="Search topics, questions, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-base border border-soft rounded-xl text-xs text-heading outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Course Filter */}
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-base border border-soft text-heading rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="ALL">All Enrolled Courses</option>
              {coursesList.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-base border border-soft text-heading rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="ALL">All Difficulties</option>
              <option value="beginner">🟢 Beginner</option>
              <option value="intermediate">🟡 Intermediate</option>
              <option value="advanced">🔴 Advanced</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-base border border-soft text-heading rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="SOLVED">✅ Solved</option>
              <option value="UNSOLVED">⏳ Unsolved</option>
            </select>
          </div>

          {/* Question Cards Grid */}
          {loading ? (
            <div className="p-12 text-center text-muted flex items-center justify-center gap-2">
              <RefreshCw size={18} className="animate-spin text-purple-400" /> Loading practice questions...
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="bg-panel border border-soft rounded-2xl p-12 text-center space-y-3">
              <Code2 size={40} className="mx-auto text-muted/50" />
              <h3 className="text-lg font-bold text-heading">No practice questions found</h3>
              <p className="text-xs text-muted">Try adjusting your search filters or course selection.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCourse('ALL');
                  setSelectedDifficulty('ALL');
                  setStatusFilter('ALL');
                }}
                className="px-4 py-2 bg-base border border-soft text-heading rounded-xl text-xs font-bold hover:bg-soft transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  isSolved={solvedQuestionIds.has(question.id)}
                  onSelect={handleSelectQuestion}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DASHBOARD & PROGRESS */}
      {activeTab === 'dashboard' && (
        <PracticeProgress progress={progress} totalQuestions={questions.length} />
      )}

      {/* TAB 3: LEADERBOARD & BADGES */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-8">
          <BadgeSection userBadges={badges} />
          <Leaderboard leaderboard={leaderboard} />
        </div>
      )}

      {/* QUESTION SOLVER WORKSPACE MODAL / SPLIT SCREEN OVERLAY */}
      {activeQuestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-2 sm:p-4 animate-fadeIn">
          {/* Top Modal Navigation Header */}
          <div className="bg-panel border border-soft rounded-2xl p-3 px-4 mb-3 flex items-center justify-between gap-4">
            <button
              onClick={handleCloseWorkspace}
              className="flex items-center gap-2 text-xs font-bold text-muted hover:text-heading transition cursor-pointer"
            >
              <ArrowLeft size={16} /> Exit Workspace
            </button>

            <div className="text-center">
              <h3 className="text-sm font-bold text-heading flex items-center justify-center gap-2">
                {activeQuestion.title}
              </h3>
              <span className="text-[10px] text-purple-400 font-medium">
                {activeQuestion.courseTitle} · {activeQuestion.moduleName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCloseWorkspace}
                className="p-1.5 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Split Screen Workspace Body */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-y-auto lg:overflow-hidden">
            {/* Left Panel: Question Details (5 cols) */}
            <div className="lg:col-span-5 bg-panel border border-soft rounded-2xl p-5 overflow-y-auto max-h-[85vh] lg:max-h-none">
              <QuestionDetails question={activeQuestion} />
            </div>

            {/* Right Panel: Code Editor or Submission Result (7 cols) */}
            <div className="lg:col-span-7 flex flex-col min-h-0 max-h-[85vh] lg:max-h-none">
              {submissionResult ? (
                <SubmissionResult
                  result={submissionResult}
                  onContinue={handleNextProblem}
                  onRetry={() => setSubmissionResult(null)}
                />
              ) : (
                <CodeEditor
                  question={activeQuestion}
                  onSubmit={handleSubmitSolution}
                  isSubmitting={isSubmitting}
                  submissionResult={submissionResult}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
