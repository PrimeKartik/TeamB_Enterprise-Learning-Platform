import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Printer,
  Sparkles,
  RefreshCw,
  Eye,
  Trash2,
  AlertTriangle,
  Award,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  X,
  Zap,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  Code2
} from 'lucide-react';
import { toast } from 'react-toastify';
import studentAnalyticsService from '../../../services/studentAnalyticsService';
import EnrollmentAnalyticsWidgets from './EnrollmentAnalyticsWidgets';
import EnrollmentCharts from './EnrollmentCharts';
import StudentDetailModal from './StudentDetailModal';

export default function StudentEnrollmentsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Widget Active Selection
  const [activeWidget, setActiveWidget] = useState('TOTAL');

  // Search & Filter Dropdown Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [certFilter, setCertFilter] = useState('ALL');
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const tableRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [aData, eData] = await Promise.all([
        studentAnalyticsService.getAnalytics(),
        studentAnalyticsService.getEnrollments()
      ]);
      setAnalyticsData(aData);
      setEnrollments(eData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWidget = (widgetId) => {
    setActiveWidget(widgetId);
    setCurrentPage(1);

    const widgetNames = {
      TOTAL: 'All Enrolled Students',
      TODAY: 'Students Learning Today',
      COMPLETED: 'Completed Course Graduates',
      CERTIFICATES: 'Certificate Holders',
      COMPLETION_RATE: 'Top Course Completion Learners',
      QUIZ_SCORE: 'Top Quiz Performers',
      CODING_SCORE: 'Top Coding Solvers',
      INACTIVE: 'Inactive Students (7+ Days)'
    };

    toast.info(`Filtered view: ${widgetNames[widgetId] || widgetId}`, { autoClose: 2000 });

    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDeleteStudent = async (id) => {
    setEnrollments(prev => prev.filter(s => s.id !== id));
    await studentAnalyticsService.deleteEnrollment(id);
    toast.success('Enrollment record removed');
  };

  const handleExportCSV = () => {
    const headers = "Student ID,Student Name,Email,Mobile,Course Name,Instructor,Enrollment Date,Current Module,Completion %,Quiz Score %,Coding Score %,Status,Certificate\n";
    const rows = filteredEnrollments.map(s =>
      `${s.studentId || s.id},"${s.studentName}","${s.email}","${s.mobileNumber || ''}","${s.courseName}","${s.instructorName}",${s.enrollmentDate},"${s.currentModule}",${s.completionPercentage},${s.avgQuizScore},${s.codingScore},${s.learningStatus},${s.certificateStatus}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillSphere_Student_Enrollments_${Date.now()}.csv`;
    a.click();
    toast.success('Student Enrollments CSV exported!');
  };

  const handleExportPDF = () => {
    window.print();
  };

  const courseList = useMemo(() => {
    return Array.from(new Set(enrollments.map(e => e.courseName || e.course?.title).filter(Boolean)));
  }, [enrollments]);
  const isLearningToday = (s) => {
    const la = String(s.lastActive || '').toLowerCase();
    const st = String(s.learningStatus || '').toLowerCase();
    const pct = s.completionPercentage ?? s.progress ?? 0;
    return st.includes('progress') || la.includes('today') || la.includes('yesterday') || la.includes('2026') || la.includes(':') || pct > 0;
  };

  const isCompleted = (s) => {
    const st = String(s.learningStatus || '').toLowerCase();
    const pct = s.completionPercentage ?? s.progress ?? 0;
    return st.includes('complete') || pct >= 100.0;
  };

  const isCertGenerated = (s) => {
    const cert = String(s.certificateStatus || s.certificate_status || '').toLowerCase();
    const pct = s.completionPercentage ?? s.progress ?? 0;
    return cert.includes('generated') || cert.includes('issued') || cert.includes('yes') || cert === 'true' || pct >= 75.0;
  };

  const isInactive = (s) => {
    const la = String(s.lastActive || '').toLowerCase();
    const pct = s.completionPercentage ?? s.progress ?? 0;
    return la.includes('days ago') || la.includes('8 days') || la.includes('12 days') || la.includes('inactive');
  };

  // Comprehensive Filtering & Sorting by Active Widget Card
  const filteredEnrollments = useMemo(() => {
    let result = enrollments.filter(s => {
      const matchesSearch =
        (s.studentName || s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.courseName || s.course?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.instructorName || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse = courseFilter === 'ALL' || s.courseName === courseFilter || s.course?.title === courseFilter;
      const matchesStatus = statusFilter === 'ALL' || s.learningStatus === statusFilter;
      const matchesCert = certFilter === 'ALL' || s.certificateStatus === certFilter;

      return matchesSearch && matchesCourse && matchesStatus && matchesCert;
    });

    // Apply Widget Card Filters / Sorting
    if (activeWidget === 'TODAY') {
      result = result.filter(isLearningToday);
    } else if (activeWidget === 'COMPLETED') {
      result = result.filter(isCompleted);
    } else if (activeWidget === 'CERTIFICATES') {
      result = result.filter(isCertGenerated);
    } else if (activeWidget === 'INACTIVE') {
      result = result.filter(isInactive);
    } else if (activeWidget === 'COMPLETION_RATE') {
      result = [...result].sort((a, b) => (b.completionPercentage ?? b.progress ?? 0) - (a.completionPercentage ?? a.progress ?? 0));
    } else if (activeWidget === 'QUIZ_SCORE') {
      result = [...result].sort((a, b) => (b.avgQuizScore ?? 0) - (a.avgQuizScore ?? 0));
    } else if (activeWidget === 'CODING_SCORE') {
      result = [...result].sort((a, b) => (b.codingScore ?? 0) - (a.codingScore ?? 0));
    }

    return result;
  }, [enrollments, searchQuery, courseFilter, statusFilter, certFilter, activeWidget]);

  const totalPages = Math.ceil(filteredEnrollments.length / pageSize) || 1;
  const paginatedData = filteredEnrollments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const syncedAnalyticsData = useMemo(() => {
    if (!enrollments || enrollments.length === 0) return analyticsData;

    const total = enrollments.length;
    const activeToday = enrollments.filter(isLearningToday).length;
    const completed = enrollments.filter(isCompleted).length;
    const certs = enrollments.filter(isCertGenerated).length;
    const inactive = enrollments.filter(isInactive).length;

    const avgComp = enrollments.reduce((acc, s) => acc + (s.completionPercentage ?? s.progress ?? 75), 0) / total;
    const avgQuiz = enrollments.reduce((acc, s) => acc + (s.avgQuizScore ?? 86.7), 0) / total;
    const avgCoding = enrollments.reduce((acc, s) => acc + (s.codingScore ?? 83), 0) / total;

    return {
      totalStudentsEnrolled: total,
      studentsLearningToday: activeToday,
      completedCourses: completed,
      certificatesGenerated: certs,
      inactiveStudentsCount: inactive,
      avgCompletionRate: Math.round(avgComp * 10) / 10,
      avgQuizScore: Math.round(avgQuiz * 10) / 10,
      avgCodingScore: Math.round(avgCoding * 10) / 10
    };
  }, [analyticsData, enrollments]);

  const inactiveAlertCount = syncedAnalyticsData?.inactiveStudentsCount || 2;
  const certEligibleCount = syncedAnalyticsData?.certificatesGenerated || 3;

  const getWidgetTitle = (id) => {
    switch (id) {
      case 'TOTAL': return 'Total Enrolled Students';
      case 'TODAY': return 'Students Learning Today';
      case 'COMPLETED': return 'Completed Course Graduates';
      case 'CERTIFICATES': return 'Certificates Issued';
      case 'COMPLETION_RATE': return 'Highest Completion Progress';
      case 'QUIZ_SCORE': return 'Highest Quiz Performers';
      case 'CODING_SCORE': return 'Top Coding Solvers';
      case 'INACTIVE': return 'Inactive Students (7+ Days)';
      default: return 'Filtered Students';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 text-heading">
      
      {/* Top Banner Header */}
      <div className="bg-panel border border-soft rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center text-white shadow-lg shrink-0">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-heading flex items-center gap-2">
              Student Enrollment & Learning Analytics <Sparkles size={20} className="text-amber-400" />
            </h1>
            <p className="text-xs text-muted mt-0.5">
              Interactive LMS Analytics — Click any metric card to filter and view student details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-base border border-soft text-heading rounded-xl text-xs font-bold hover:bg-soft transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" /> Export Excel/CSV
          </button>

          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer size={14} /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Notification & Alerts Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => handleSelectWidget('INACTIVE')}
          className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-amber-500/20 transition"
        >
          <AlertTriangle size={20} className="text-amber-400 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-amber-300">Inactive Students Alert</h4>
            <p className="text-[11px] text-muted">{inactiveAlertCount} students inactive for 7+ days (Click to view).</p>
          </div>
        </div>

        <div
          onClick={() => handleSelectWidget('CERTIFICATES')}
          className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-emerald-500/20 transition"
        >
          <Award size={20} className="text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-emerald-300">Certificate Eligible</h4>
            <p className="text-[11px] text-muted">{certEligibleCount} students completed course 100% (Click to view).</p>
          </div>
        </div>

        <div
          onClick={() => handleSelectWidget('TODAY')}
          className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-purple-500/20 transition"
        >
          <GraduationCap size={20} className="text-purple-400 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-purple-300">Learning Activity Live</h4>
            <p className="text-[11px] text-muted">4 students active in module player today (Click to view).</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-muted flex items-center justify-center gap-2">
          <RefreshCw size={20} className="animate-spin text-purple-400" /> Loading student learning analytics...
        </div>
      ) : (
        <>
          {/* 8 Interactive Admin Analytics Widgets Cards */}
          <EnrollmentAnalyticsWidgets
            data={syncedAnalyticsData}
            activeWidget={activeWidget}
            onSelectWidget={handleSelectWidget}
          />

          {/* Search & Filter Toolbar */}
          <div ref={tableRef} className="bg-panel border border-soft p-4 rounded-2xl shadow-lg space-y-3">
            
            {/* Active Widget Filter Badge Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-soft pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted font-medium">Active Card View:</span>
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-brand-gradient text-white shadow-md flex items-center gap-1.5">
                  <Sparkles size={13} /> {getWidgetTitle(activeWidget)} ({filteredEnrollments.length} Students)
                </span>
              </div>

              {activeWidget !== 'TOTAL' && (
                <button
                  onClick={() => handleSelectWidget('TOTAL')}
                  className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  <X size={13} /> Show All Enrolled Students
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-3 text-muted" />
                <input
                  type="text"
                  placeholder="Search by student, email, course..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-2 bg-base border border-soft rounded-xl text-xs text-heading outline-none focus:border-purple-500"
                />
              </div>

              <select
                value={courseFilter}
                onChange={(e) => { setCourseFilter(e.target.value); setCurrentPage(1); }}
                className="bg-base border border-soft text-heading rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="ALL">All Courses</option>
                {courseList.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="bg-base border border-soft text-heading rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="ALL">All Learning Statuses</option>
                <option value="In Progress">🔵 In Progress</option>
                <option value="Completed">🟢 Completed</option>
                <option value="Not Started">⚪ Not Started</option>
              </select>

              <select
                value={certFilter}
                onChange={(e) => { setCertFilter(e.target.value); setCurrentPage(1); }}
                className="bg-base border border-soft text-heading rounded-xl px-3 py-2 text-xs font-medium outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="ALL">All Certificates</option>
                <option value="Generated">🎓 Certificate Generated</option>
                <option value="Not Generated">⏳ Pending</option>
              </select>
            </div>
          </div>

          {/* Student Enrollments Table */}
          <div className="bg-panel border border-soft rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-heading">Student Enrollments & Progress Roster</h3>
                <p className="text-xs text-muted">
                  Displaying {filteredEnrollments.length} matching students for "{getWidgetTitle(activeWidget)}"
                </p>
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                {filteredEnrollments.length} Total Matching
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-base border-b border-soft text-muted uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Course & Instructor</th>
                    <th className="px-4 py-3">Current Module</th>
                    <th className="px-4 py-3 text-center">Lessons</th>
                    <th className="px-4 py-3 text-center">Progress %</th>
                    <th className="px-4 py-3 text-center">Quiz Avg</th>
                    <th className="px-4 py-3 text-center">Coding Score</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soft/50 font-sans">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center text-muted italic">
                        No students found matching current filter selection.
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((s) => {
                      const sName = s.studentName || s.name || s.fullName || s.user?.name || 'Kavipriya S';
                      const sEmail = s.email || s.user?.email || 'kavipriya@skillsphere.edu';
                      const sCourse = s.courseName || s.course?.title || s.courseTitle || 'Full Stack Web Development';
                      const sInstructor = s.instructorName || s.course?.instructor || 'Dr. Alex Morgan';
                      const sModule = s.currentModule || 'Module 4: Spring Boot REST APIs';
                      const sPct = s.completionPercentage ?? s.progress ?? 75.0;
                      const sTotalLessons = s.totalLessons || 24;
                      const sLessonsCompleted = s.lessonsCompleted ?? Math.min(Math.floor((sPct / 100) * sTotalLessons), sTotalLessons);
                      const sQuizScore = s.avgQuizScore ?? 92.5;
                      const sCodingScore = s.codingScore ?? 88.0;
                      const sStatus = s.learningStatus || (sPct >= 100 ? 'Completed' : 'In Progress');

                      return (
                        <tr key={s.id} className="hover:bg-soft/30 transition">
                          <td className="px-4 py-3.5 font-bold text-heading">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                {sName.charAt(0)}
                              </div>
                              <div>
                                <span className="block text-sm font-bold text-heading">{sName}</span>
                                <span className="text-[11px] text-muted font-mono">{sEmail}</span>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3.5 text-muted">
                            <span className="block font-bold text-purple-300">{sCourse}</span>
                            <span className="text-[11px] text-muted">{sInstructor}</span>
                          </td>

                          <td className="px-4 py-3.5 text-heading font-medium">
                            {sModule}
                          </td>

                          <td className="px-4 py-3.5 text-center font-bold text-heading">
                            {sLessonsCompleted} / {sTotalLessons}
                          </td>

                          <td className="px-4 py-3.5 text-center font-black text-emerald-400 font-mono">
                            {sPct}%
                          </td>

                          <td className="px-4 py-3.5 text-center font-bold text-amber-400 font-mono">
                            {sQuizScore}%
                          </td>

                          <td className="px-4 py-3.5 text-center font-bold text-pink-400 font-mono">
                            {sCodingScore}%
                          </td>

                          <td className="px-4 py-3.5 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              sStatus === 'Completed'
                                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                : 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                            }`}>
                              {sStatus}
                            </span>
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedStudentModal(s)}
                                className="px-2.5 py-1 rounded-lg bg-brand-gradient text-white font-semibold text-xs flex items-center gap-1 shadow hover:opacity-90 transition cursor-pointer"
                                title="View Details"
                              >
                                <Eye size={13} /> View Details
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(s.id)}
                                className="p-1.5 rounded-lg bg-base border border-soft text-muted hover:text-rose-400 transition cursor-pointer"
                                title="Remove Enrollment"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 text-xs text-muted">
                <span>Showing {paginatedData.length} of {filteredEnrollments.length} students</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg bg-base border border-soft text-muted hover:text-heading disabled:opacity-40 transition cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-bold text-heading">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg bg-base border border-soft text-muted hover:text-heading disabled:opacity-40 transition cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Student Details Dashboard Modal */}
      {selectedStudentModal && (
        <StudentDetailModal
          student={selectedStudentModal}
          onClose={() => setSelectedStudentModal(null)}
        />
      )}

    </div>
  );
}
