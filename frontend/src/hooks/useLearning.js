import { useEffect, useState } from "react";
import { enrollmentApi } from "../api/enrollmentApi";

export default function useLearning() {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLearning = async () => {
    try {
      setLoading(true);

      const res = await enrollmentApi.getDashboard();

      setCourses(res.data);

      if (res.data.length > 0) {
        setCurrentCourse(res.data[0]);
      }
    } catch (err) {
      setError("Unable to load learning.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLearning();
  }, []);

  const continueLearning = async (courseId) => {
    const res = await enrollmentApi.continueLearning(courseId);

    setCurrentLesson(res.data);

    return res.data;
  };

  const completeLesson = async (courseId, lessonId) => {
    await enrollmentApi.completeLesson(courseId, lessonId);

    loadLearning();
  };

  const nextLesson = async (courseId) => {
    const res = await enrollmentApi.nextLesson(courseId);

    setCurrentLesson(res.data);

    return res.data;
  };

  return {
    courses,
    currentCourse,
    currentLesson,
    loading,
    error,
    refresh: loadLearning,
    continueLearning,
    completeLesson,
    nextLesson,
    setCurrentCourse,
  };
}