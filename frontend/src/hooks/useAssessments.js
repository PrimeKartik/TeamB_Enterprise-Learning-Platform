import { useEffect, useState } from "react";
import { assessmentApi } from "../api/assessmentApi";

export default function useAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const [timer, setTimer] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadAssessments = async () => {
    try {

      setLoading(true);

      const res =
        await assessmentApi.getAssessments();

      setAssessments(res.data);

    } catch (err) {

      setError("Unable to load assessments.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const startAssessment = async (id) => {

    const res =
      await assessmentApi.startAssessment(id);

    setQuestions(res.data.questions);

    setTimer(res.data.duration);

    setAnswers({});

    setResult(null);

  };

  const updateAnswer = (questionId, option) => {

    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));

  };

  const submitAssessment = async (assessmentId) => {

    const res =
      await assessmentApi.submitAssessment(
        assessmentId,
        answers
      );

    setResult(res.data);

    return res.data;

  };

  return {
    assessments,
    questions,
    answers,
    result,
    timer,
    loading,
    error,
    refresh: loadAssessments,
    startAssessment,
    updateAnswer,
    submitAssessment,
    setTimer,
  };
}