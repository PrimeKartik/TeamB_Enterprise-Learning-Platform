import { useEffect, useState } from "react";
import { X, Award } from "lucide-react";
import { adminStudentApi } from "../../../api/adminStudentApi";
import { adminCourseApi } from "../../../api/adminCourseApi";

export default function IssueCertificateModal({ open, onClose, onIssue }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [grade, setGrade] = useState("A+");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;

    async function loadOptions() {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          adminStudentApi.getAllStudents(),
          adminCourseApi.getAllCourses(),
        ]);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error(err);
        setError("Could not load students/courses.");
      }
    }
    loadOptions();
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!studentId || !courseId) {
      setError("Please select both a student and a course.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onIssue({ studentId, courseId, grade });
      setStudentId("");
      setCourseId("");
      setGrade("A+");
    } catch (err) {
      setError(err.response?.data?.message || "Could not issue certificate.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white text-gray-900 rounded-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Award size={20} className="text-purple-600" /> Issue Certificate
          </h2>
          <button onClick={onClose} className="text-2xl leading-none">×</button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Student</label>
            <select
              className="w-full border p-3 rounded-lg"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            >
              <option value="">Select a student...</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              className="w-full border p-3 rounded-lg"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Select a course...</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Grade</label>
            <select
              className="w-full border p-3 rounded-lg"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              {["A+", "A", "B+", "B", "C"].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg border">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-60"
            >
              {submitting ? "Issuing..." : "Issue Certificate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
