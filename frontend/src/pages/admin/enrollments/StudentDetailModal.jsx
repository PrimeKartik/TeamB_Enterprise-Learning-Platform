import React from 'react';
import {
  X,
  BookOpen,
  Download,
  GraduationCap,
  TrendingUp,
  HelpCircle,
  Code2
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function StudentDetailModal({ student, onClose }) {
  if (!student) return null;

  // Robust field extraction supporting both DTOs and JPA Entities
  const sId = student.studentId || student.id || 101;
  const sName = student.studentName || student.name || student.fullName || student.user?.name || 'Kavipriya S';
  const sEmail = student.email || student.user?.email || 'kavipriya@skillsphere.edu';
  const sMobile = student.mobileNumber || student.phone || student.user?.mobileNumber || '+91 98765 43210';
  const sCollege = student.collegeName || student.user?.collegeName || 'PSG College of Technology';
  const sCourse = student.courseName || student.course?.title || student.courseTitle || 'Full Stack Web Development';
  const sInstructor = student.instructorName || student.course?.instructor || 'Dr. Alex Morgan';
  const sModule = student.currentModule || 'Module 4: Spring Boot REST APIs';
  
  const sPct = student.completionPercentage ?? student.progress ?? 75.0;
  const sTotalModules = student.totalModules || 6;
  const sModCompleted = student.modulesCompleted ?? Math.min(Math.floor((sPct / 100) * sTotalModules), sTotalModules);
  const sTotalLessons = student.totalLessons || 24;
  const sLessonsCompleted = student.lessonsCompleted ?? Math.min(Math.floor((sPct / 100) * sTotalLessons), sTotalLessons);
  
  const sEnrolledDate = student.enrollmentDate || (student.enrolledAt ? String(student.enrolledAt).split('T')[0] : '2026-07-20');
  const sTimeSpent = student.timeSpentHours || 38.5;
  const sLastActive = student.lastActive ? String(student.lastActive).replace('T', ' ').slice(0, 16) : 'Today';
  
  const sQuizAttempted = student.quizzesAttempted ?? 8;
  const sAvgQuiz = student.avgQuizScore ?? 92.5;
  const sCodingScore = student.codingScore ?? 88.0;
  
  const sEasy = student.easySolved ?? 15;
  const sMedium = student.mediumSolved ?? 10;
  const sHard = student.hardSolved ?? 3;
  const sXp = student.totalXp ?? 1450;
  const sCertStatus = student.certificateStatus || (sPct >= 100 ? 'Generated' : 'Not Generated');

  const handleDownloadCert = () => {
    toast.success(`Downloading official certificate for ${sName}...`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn text-heading">
      <div className="max-w-4xl w-full bg-panel border border-soft rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-base border border-soft text-muted hover:text-heading transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Top Student Header Card */}
        <div className="bg-base border border-soft p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
              {sName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-heading">{sName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  ID: #{sId}
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5">{sEmail} · {sMobile}</p>
              <p className="text-xs text-purple-400 font-medium flex items-center gap-1 mt-1">
                <GraduationCap size={13} /> {sCollege}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {sCertStatus === 'Generated' ? (
              <button
                onClick={handleDownloadCert}
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Download size={14} /> Download Certificate
              </button>
            ) : (
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                Certificate Pending
              </span>
            )}
          </div>
        </div>

        {/* Section 1: Course & Learning Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Course Details (5 cols) */}
          <div className="md:col-span-5 bg-base/60 border border-soft p-5 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <BookOpen size={14} className="text-purple-400" /> Course Details
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-soft pb-2">
                <span className="text-muted">Enrolled Course:</span>
                <span className="font-bold text-heading text-right">{sCourse}</span>
              </div>
              <div className="flex justify-between border-b border-soft pb-2">
                <span className="text-muted">Instructor:</span>
                <span className="font-semibold text-purple-300">{sInstructor}</span>
              </div>
              <div className="flex justify-between border-b border-soft pb-2">
                <span className="text-muted">Current Module:</span>
                <span className="font-medium text-heading">{sModule}</span>
              </div>
              <div className="flex justify-between border-b border-soft pb-2">
                <span className="text-muted">Module Completion:</span>
                <span className="font-bold text-emerald-400">{sModCompleted} / {sTotalModules} Modules</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Enrollment Date:</span>
                <span className="font-mono text-heading">{sEnrolledDate}</span>
              </div>
            </div>
          </div>

          {/* Learning Progress (7 cols) */}
          <div className="md:col-span-7 bg-base/60 border border-soft p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-400" /> Learning Progress
              </h3>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {sPct}% Complete
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full bg-panel border border-soft h-3 rounded-full overflow-hidden">
              <div
                style={{ width: `${sPct}%` }}
                className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-panel border border-soft">
                <span className="text-muted block text-[10px]">Lessons Completed</span>
                <span className="font-bold text-sm text-heading">{sLessonsCompleted} / {sTotalLessons}</span>
              </div>
              <div className="p-3 rounded-xl bg-panel border border-soft">
                <span className="text-muted block text-[10px]">Time Spent</span>
                <span className="font-bold text-sm text-purple-300">{sTimeSpent} hrs</span>
              </div>
              <div className="p-3 rounded-xl bg-panel border border-soft">
                <span className="text-muted block text-[10px]">Last Accessed</span>
                <span className="font-bold text-xs text-heading">{sLastActive}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Quiz & Coding Practice Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Quiz Performance Card */}
          <div className="bg-base/60 border border-soft p-5 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <HelpCircle size={14} className="text-amber-400" /> Quiz Performance
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-panel border border-soft">
                <span className="text-muted block text-[10px]">Quizzes Attempted</span>
                <span className="font-bold text-base text-heading">{sQuizAttempted}</span>
              </div>
              <div className="p-3 rounded-xl bg-panel border border-soft">
                <span className="text-muted block text-[10px]">Average Quiz Score</span>
                <span className="font-bold text-base text-amber-400 font-mono">{sAvgQuiz}%</span>
              </div>
            </div>
          </div>

          {/* Coding Practice Card */}
          <div className="bg-base/60 border border-soft p-5 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Code2 size={14} className="text-pink-400" /> Coding Practice Performance
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-panel border border-soft">
                <span className="text-emerald-400 font-bold block text-[10px]">Easy</span>
                <span className="font-mono font-bold text-sm">{sEasy}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-panel border border-soft">
                <span className="text-amber-400 font-bold block text-[10px]">Medium</span>
                <span className="font-mono font-bold text-sm">{sMedium}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-panel border border-soft">
                <span className="text-rose-400 font-bold block text-[10px]">Hard</span>
                <span className="font-mono font-bold text-sm">{sHard}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-soft">
              <span className="text-muted">Total XP Earned:</span>
              <span className="font-bold text-amber-400 font-mono">+{sXp} XP</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
