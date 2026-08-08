import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy,
  Clock,
  Medal,
  Users,
  ChevronRight,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Award,
  Play,
  FileCode,
  Download,
  Eye,
  MessageSquare,
  Plus,
  ShieldCheck,
  Zap,
  Flame,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../context/AuthContext';
import contestService from '../../../services/contestService';
import StudentStatsHeader from './components/StudentStatsHeader';
import ContestRulesModal from './components/ContestRulesModal';
import ContestCertificateModal from './components/ContestCertificateModal';
import ContestDiscussion from './components/ContestDiscussion';
import ContestArena from './components/ContestArena';
import AdminContestManager from './components/AdminContestManager';

export default function Contests() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'DISCUSSIONS'
  const [contests, setContests] = useState([]);
  const [studentStats, setStudentStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  // Modals & Active State
  const [rulesContest, setRulesContest] = useState(null);
  const [activeArenaContest, setActiveArenaContest] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [showAdminManager, setShowAdminManager] = useState(false);
  const [registeredContestIds, setRegisteredContestIds] = useState(new Set([1, 2]));

  // Upcoming Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 30, seconds: 45 });

  useEffect(() => {
    loadPlatformData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadPlatformData = async () => {
    setLoading(true);
    try {
      const [cList, sData] = await Promise.all([
        contestService.getContests(),
        contestService.getStudentStats()
      ]);
      setContests(cList || []);
      setStudentStats(sData || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRegister = (contest) => {
    setRegisteredContestIds(prev => new Set([...prev, contest.id]));
    setRulesContest(null);
    toast.success(`🎉 Successfully registered for "${contest.title}"! Reminder added.`);
  };

  const handleDownloadCertificate = async (contestId) => {
    try {
      const cert = await contestService.getCertificate(contestId);
      setCertificateData(cert);
    } catch (e) {
      toast.error('Unable to fetch certificate');
    }
  };

  const handleAdminSaveContest = (newContest) => {
    setContests(prev => [newContest, ...prev]);
    toast.success('Contest scheduled successfully!');
  };

  const filteredContests = useMemo(() => {
    return contests.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiff = difficultyFilter === 'ALL' || c.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      const matchesTab = activeTab === 'ALL' || c.status === activeTab;
      return matchesSearch && matchesDiff && matchesTab;
    });
  }, [contests, searchQuery, difficultyFilter, activeTab]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Student Contest Statistics Bar */}
      <StudentStatsHeader stats={studentStats} />

      {/* Main Hero Banner for Live / Upcoming Challenge */}
      <div className="relative rounded-3xl overflow-hidden bg-brand-gradient p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-15 pointer-events-none">
          <Trophy size={200} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Competitive Coding Tournament Platform
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            SkillSphere Coding Arena
          </h1>
          <p className="text-sm md:text-base text-white/90 mb-6 leading-relaxed max-w-xl">
            Register for live coding tournaments, solve algorithmic challenges in Java, Python, C++, or JS, view real-time leaderboards, and earn verified certificates!
          </p>

          {/* Countdown & Register CTA */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-3 p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/15 text-center font-mono">
              <div className="min-w-[55px]">
                <span className="text-2xl sm:text-3xl font-bold block">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block font-sans">Days</span>
              </div>
              <span className="text-2xl opacity-50 self-center">:</span>
              <div className="min-w-[55px]">
                <span className="text-2xl sm:text-3xl font-bold block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block font-sans">Hours</span>
              </div>
              <span className="text-2xl opacity-50 self-center">:</span>
              <div className="min-w-[55px]">
                <span className="text-2xl sm:text-3xl font-bold block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block font-sans">Mins</span>
              </div>
              <span className="text-2xl opacity-50 self-center">:</span>
              <div className="min-w-[55px]">
                <span className="text-2xl sm:text-3xl font-bold block text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-white/70 uppercase tracking-wider block font-sans">Secs</span>
              </div>
            </div>

            <button
              onClick={() => setRulesContest(contests[0] || { id: 1, title: 'The Sunday Sprint #105' })}
              className="px-6 py-3.5 bg-white text-purple-900 rounded-2xl font-bold hover:bg-slate-100 transition shadow-lg flex items-center gap-2 text-xs cursor-pointer"
            >
              <ShieldCheck size={16} className="text-purple-600" /> View Contest Rules & Register
            </button>
          </div>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-soft pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'ALL' ? 'bg-brand-gradient text-white shadow-md' : 'bg-panel border border-soft text-muted hover:text-heading'
            }`}
          >
            All Contests ({contests.length})
          </button>
          <button
            onClick={() => setActiveTab('ONGOING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ONGOING' ? 'bg-brand-gradient text-white shadow-md' : 'bg-panel border border-soft text-muted hover:text-heading'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Ongoing
          </button>
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'UPCOMING' ? 'bg-brand-gradient text-white shadow-md' : 'bg-panel border border-soft text-muted hover:text-heading'
            }`}
          >
            ⏳ Upcoming
          </button>
          <button
            onClick={() => setActiveTab('COMPLETED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'COMPLETED' ? 'bg-brand-gradient text-white shadow-md' : 'bg-panel border border-soft text-muted hover:text-heading'
            }`}
          >
            🏁 Completed Archive
          </button>
          <button
            onClick={() => setActiveTab('DISCUSSIONS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'DISCUSSIONS' ? 'bg-brand-gradient text-white shadow-md' : 'bg-panel border border-soft text-muted hover:text-heading'
            }`}
          >
            <MessageSquare size={14} /> Discussions
          </button>
        </div>

        {/* Admin Schedule Contest Button & Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search size={14} className="absolute left-3 top-3 text-muted" />
            <input
              type="text"
              placeholder="Search contests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-base border border-soft rounded-xl text-xs text-heading outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={() => setShowAdminManager(true)}
            className="px-3.5 py-2 bg-panel border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-500/10 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus size={15} /> Schedule Contest
          </button>
        </div>
      </div>

      {/* TAB: DISCUSSIONS FORUM */}
      {activeTab === 'DISCUSSIONS' ? (
        <ContestDiscussion contestId={2} />
      ) : (
        /* CONTEST CARDS GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => {
            const isReg = registeredContestIds.has(contest.id);

            return (
              <div
                key={contest.id}
                className="bg-panel border border-soft hover:border-purple-500/50 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Status & Difficulty Badges Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
                      contest.status === 'ONGOING'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : contest.status === 'UPCOMING'
                        ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300'
                        : 'bg-base border border-soft text-muted'
                    }`}>
                      {contest.status === 'ONGOING' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      {contest.status}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-base border border-soft text-muted">
                      {contest.difficulty}
                    </span>
                  </div>

                  {/* Contest Title & Banner */}
                  <h3 className="text-lg font-bold text-heading group-hover:text-purple-300 transition line-clamp-1 mb-1">
                    {contest.title}
                  </h3>
                  <p className="text-xs text-muted/80 line-clamp-2 leading-relaxed mb-4">
                    {contest.description}
                  </p>

                  {/* Metadata Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-base/50 p-3 rounded-xl border border-soft/60 mb-4 font-sans">
                    <div>
                      <span className="text-[10px] text-muted uppercase font-bold block">Duration</span>
                      <span className="font-semibold text-heading">{contest.durationMinutes} Mins</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted uppercase font-bold block">Questions</span>
                      <span className="font-semibold text-heading">{contest.questionCount} Problems</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted uppercase font-bold block">Total Marks</span>
                      <span className="font-semibold text-amber-400">{contest.totalMarks} Marks</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted uppercase font-bold block">Registration</span>
                      <span className={`font-semibold ${isReg ? 'text-emerald-400' : 'text-purple-300'}`}>
                        {isReg ? 'Registered ✅' : 'Open'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-soft/60 flex items-center justify-between gap-3">
                  {contest.status === 'ONGOING' ? (
                    <button
                      onClick={() => setActiveArenaContest(contest)}
                      className="w-full py-2.5 bg-brand-gradient text-white rounded-xl text-xs font-bold hover:opacity-95 transition flex items-center justify-center gap-2 shadow-md cursor-pointer animate-pulse"
                    >
                      <Play size={15} /> Join Live Arena
                    </button>
                  ) : contest.status === 'UPCOMING' ? (
                    <button
                      onClick={() => setRulesContest(contest)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                        isReg
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                          : 'bg-brand-gradient text-white hover:opacity-95 shadow-md'
                      }`}
                    >
                      {isReg ? 'Registered ✅ View Rules' : 'Register for Contest'}
                    </button>
                  ) : (
                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadCertificate(contest.id)}
                        className="flex-1 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Award size={14} /> Certificate
                      </button>
                      <button
                        onClick={() => toast.info(`Viewing submissions archive for ${contest.title}`)}
                        className="flex-1 py-2 bg-base border border-soft text-heading rounded-xl text-xs font-semibold hover:bg-soft transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={14} /> Submissions
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* CONTEST ARENA MODAL */}
      {activeArenaContest && (
        <ContestArena
          contest={activeArenaContest}
          onExitArena={() => setActiveArenaContest(null)}
        />
      )}

      {/* CONTEST RULES MODAL */}
      {rulesContest && (
        <ContestRulesModal
          contest={rulesContest}
          onClose={() => setRulesContest(null)}
          onConfirmRegister={() => handleConfirmRegister(rulesContest)}
        />
      )}

      {/* CONTEST CERTIFICATE MODAL */}
      {certificateData && (
        <ContestCertificateModal
          certificate={certificateData}
          onClose={() => setCertificateData(null)}
        />
      )}

      {/* ADMIN CONTEST MANAGER MODAL */}
      {showAdminManager && (
        <AdminContestManager
          onClose={() => setShowAdminManager(false)}
          onSaveContest={handleAdminSaveContest}
        />
      )}

    </div>
  );
}
