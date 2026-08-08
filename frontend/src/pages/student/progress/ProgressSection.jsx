import { useEffect, useState } from "react";
import { AlertCircle, TrendingUp, Flame, Calendar, Target, Award, Sparkles, RotateCcw } from "lucide-react";

import { dashboardApi } from "../../../api/dashboardApi";

import StatisticsCard from "./components/StatisticsCard";
import ProgressChart from "./components/ProgressChart";
import CourseProgressChart from "./components/CourseProgressChart";

export default function ProgressSection() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await dashboardApi.get();
      setDashboard(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load your progress right now.");
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-soft" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-80 animate-pulse rounded-2xl bg-soft" />
          <div className="h-80 animate-pulse rounded-2xl bg-soft" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-dashed border-soft bg-panel/50">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
          <AlertCircle size={26} />
        </div>
        <h2 className="text-base font-bold text-heading mb-1.5">{error}</h2>
        <button
          onClick={loadData}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-xs font-semibold text-white hover:opacity-90 transition"
        >
          <RotateCcw size={14} /> Try Again
        </button>
      </div>
    );
  }

  const totalCourses = dashboard?.totalCourses ?? 0;
  const completedCourses = dashboard?.completedCourses ?? 0;
  const inProgress = totalCourses - completedCourses;
  const avgProgress = Math.round(dashboard?.averageProgress ?? 0);

  const courses = (dashboard?.enrollments || []).map((e) => ({
    courseTitle: e.course?.title || e.courseTitle || "Course",
    progress: e.progress ?? 0,
  }));

  if (totalCourses === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-dashed border-soft bg-panel/50">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-primary mb-4">
          <TrendingUp size={26} />
        </div>
        <h2 className="text-base font-bold text-heading mb-1.5">
          No progress yet
        </h2>
        <p className="text-xs text-muted max-w-sm">
          Enroll in a course to start tracking your learning progress here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Analytics Banner Header */}
      <div className="bg-panel border border-soft rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold w-fit mb-3">
              <TrendingUp size={14} /> Analytics & Learning Insights
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">
              Learning Velocity & Performance
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
              Track course completion rates and progress across your enrolled courses.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Enrolled"
          value={totalCourses}
          icon="courses"
          color="bg-purple-600"
        />

        <StatisticsCard
          title="Average Completion"
          value={`${avgProgress}%`}
          icon="progress"
          color="bg-emerald-500"
        />

        <StatisticsCard
          title="Courses Completed"
          value={completedCourses}
          icon="certificates"
          color="bg-amber-500"
        />

        <StatisticsCard
          title="Active In-Progress"
          value={inProgress}
          icon="hours"
          color="bg-pink-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ProgressChart progress={avgProgress} />
        <CourseProgressChart courses={courses} />
      </div>
    </div>
  );
}
