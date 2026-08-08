import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

import { enrollmentApi } from "../../../api/enrollmentApi";

import ContinueCard from "./components/ContinueCard";
import LearningCard from "./components/LearningCard";
import FilterBar from "./components/FilterBar";

export default function MyLearningSection() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      setError(null);
      const res = await enrollmentApi.getDashboard();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load your courses right now.");
    } finally {
      setLoading(false);
    }
  }

  async function continueLearning(courseId) {
    try {
      await enrollmentApi.continueLearning(courseId);
    } catch (err) {
      console.warn("Auto syncing course state...", err);
    } finally {
      navigate(`/dashboard/courses/${courseId}/player`);
    }
  }

  const filtered = courses.filter((c) =>
    c.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl bg-[#201233] border border-white/10" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-950/40 p-8 text-center text-white">
        <AlertCircle className="mx-auto mb-3 text-red-500" size={28} />
        <p className="text-red-400">{error}</p>
        <button
          onClick={loadCourses}
          className="mt-4 rounded-xl bg-[#7C3AED] px-5 py-2 text-sm font-bold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#201233] p-10 text-center text-white space-y-2">
        <BookOpen size={36} className="mx-auto text-[#EC4899]" />
        <h2 className="text-xl font-extrabold text-white">No enrolled courses yet</h2>
        <p className="text-sm text-[#B8B8C7]">
          Browse the course catalog and enroll in something you'd like to learn.
        </p>
      </div>
    );
  }

  return (

    <div className="space-y-8">

      <ContinueCard
        course={courses[0]}
        onContinue={continueLearning}
      />

      <FilterBar
        search={search}
        setSearch={setSearch}
      />

      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500">
          No courses match "{search}".
        </p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <LearningCard
              key={course.courseId}
              course={course}
              onContinue={continueLearning}
            />
          ))}
        </div>
      )}

    </div>

  );

}
