import { useCallback, useState } from "react";
import { getCurrentUser } from "../utils/auth";

// Generate a unique storage key for each logged-in user
function getStorageKey() {
  const user = getCurrentUser();

  return user?.email
    ? `skillsphere:assessment-results:${user.email}`
    : "skillsphere:assessment-results:guest";
}

function readResults() {
  try {
    const raw = localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeResults(results) {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(results));
  } catch {
    // Ignore storage errors (private mode, quota exceeded, etc.)
  }
}

/**
 * Stores assessment results separately for each logged-in user.
 */
export function useAssessmentResults() {
  const [results, setResults] = useState(() => readResults());

  const recordAttempt = useCallback((assessmentId, score, total) => {
    setResults((prev) => {
      const existing = prev[assessmentId];

      const attempts = (existing?.attempts || 0) + 1;

      const bestScore = Math.max(existing?.bestScore ?? 0, score);

      const next = {
        ...prev,
        [assessmentId]: {
          bestScore,
          lastScore: score,
          total,
          attempts,
          lastAttemptAt: new Date().toISOString(),
        },
      };

      writeResults(next);

      return next;
    });
  }, []);

  const getResult = useCallback(
    (assessmentId) => results[assessmentId],
    [results]
  );

  const clearResults = useCallback(() => {
    localStorage.removeItem(getStorageKey());
    setResults({});
  }, []);

  return {
    results,
    recordAttempt,
    getResult,
    clearResults,
  };
}