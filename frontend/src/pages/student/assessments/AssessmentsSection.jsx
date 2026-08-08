import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Award, ClipboardList, Loader2 } from "lucide-react";

import { assessmentApi } from "../../../api/assessmentApi";
import { enrollmentApi } from "../../../api/enrollmentApi";
import { useAssessmentResults } from "../../../hooks/useAssessmentResults";
import { useAssessmentCertificates } from "../../../hooks/useAssessmentCertificates";
import { getCurrentUser } from "../../../utils/auth";

import AssessmentCard from "./components/AssessmentCard";
import AssessmentQuiz from "./components/AssessmentQuiz";

export default function AssessmentsSection() {
  // Assessment summaries — one per course the user is enrolled in.
  // Comes straight from the backend, which already filters by enrollment,
  // so there is no separate "locked" state to compute on the frontend here.
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The currently open quiz, with its freshly AI-generated questions.
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [starting, setStartingCourseId] = useState(null); // courseId currently loading questions

  const { getResult, recordAttempt } = useAssessmentResults();
  const { earnCertificate, hasCertificate } = useAssessmentCertificates();
  const user = getCurrentUser();

  const loadAssessments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await assessmentApi.getAssessments();
      setAssessments(res.data);
    } catch (err) {
      setError("Unable to load your assessments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssessments();
  }, [loadAssessments]);

  async function handleStart(courseId) {
    const summary = assessments.find((a) => a.courseId === courseId);
    if (!summary) return;

    try {
      setStartingCourseId(courseId);

      // Every attempt gets a brand-new AI-generated question set.
      const res = await assessmentApi.startAssessment(courseId);

      setActiveAssessment({
        courseId: res.data.courseId,
        id: res.data.courseId, // used as the localStorage result key
        title: res.data.courseTitle,
        duration: res.data.duration,
        questions: res.data.questions,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Couldn't generate the assessment right now. Please try again."
      );
    } finally {
      setStartingCourseId(null);
    }
  }

  async function handleComplete(score, total) {
    const { courseId, id } = activeAssessment;

    recordAttempt(id, score, total);

    try {
      // Backend keeps the best-ever percentage as course completion (a
      // lower retake never lowers it) and only issues a certificate once
      // the user reaches a perfect (100%) score.
      await enrollmentApi.completeAssessment(courseId, score, total);

      if (score === total) {
        const studentName = user?.name || user?.email?.split("@")[0] || "Learner";
        const alreadyHad = hasCertificate(id);

        earnCertificate(activeAssessment, studentName);

        if (alreadyHad) {
          toast.success(`Perfect score again! 🎉 Your certificate is already in the Certificates section.`, { autoClose: 4000 });
        } else {
          toast.success(
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span>Perfect {total}/{total}! 🎉 A certificate has been added to your <strong>Certificates</strong> section!</span>
            </div>,
            { autoClose: 5000 }
          );
        }
      } else {
        toast.info(`You scored ${score}/${total}. Score ${total}/${total} to earn a certificate!`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving assessment result. Make sure you are enrolled in the course.");
    }

    setActiveAssessment(null);
  }

  // Called when the user hits "Retake" from inside the results screen —
  // fetches a brand-new AI-generated set for the same course.
  async function handleRetake() {
    const courseId = activeAssessment.courseId;
    setActiveAssessment(null);
    await handleStart(courseId);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted gap-2 text-sm">
        <Loader2 size={18} className="animate-spin" />
        Loading your assessments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-sm text-red-400">{error}</div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-dashed border-soft bg-panel/50">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-primary mb-4">
          <ClipboardList size={26} />
        </div>
        <h2 className="text-base font-bold text-heading mb-1.5">
          Enroll into a course to unlock its assessment
        </h2>
        <p className="text-xs text-muted max-w-sm">
          Once you enroll in a course, its skill assessment will appear here —
          generated specifically for that course.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {assessments.map((summary) => (
          <AssessmentCard
            key={summary.courseId}
            assessment={{
              id: summary.courseId,
              title: summary.courseTitle,
              description: summary.description,
              duration: summary.duration,
              questions: { length: summary.questionCount },
            }}
            result={getResult(summary.courseId)}
            hasCertificate={hasCertificate(summary.courseId)}
            locked={false}
            starting={starting === summary.courseId}
            onStart={handleStart}
          />
        ))}
      </div>

      {activeAssessment && (
        <AssessmentQuiz
          assessment={activeAssessment}
          onClose={() => setActiveAssessment(null)}
          onComplete={handleComplete}
          onRetake={handleRetake}
        />
      )}
    </>
  );
}
