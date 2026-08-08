import { useEffect, useState } from "react";
import { adminCourseApi } from "../api/adminCourseApi";

export default function useCourses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);

      const res = await adminCourseApi.getAllCourses();

      setCourses(res.data);
    } catch (err) {
      setError("Unable to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const createCourse = async (course) => {
    await adminCourseApi.createCourse(course);
    loadCourses();
  };

  const updateCourse = async (id, course) => {
    await adminCourseApi.updateCourse(id, course);
    loadCourses();
  };

  const deleteCourse = async (id) => {
    await adminCourseApi.deleteCourse(id);
    loadCourses();
  };

  const getCourse = (id) => {
    return courses.find((course) => course.id === id);
  };

  return {
    courses,
    loading,
    error,
    refresh: loadCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
  };
}