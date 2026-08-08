import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";

export default function useDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalCertificates: 0,
    totalEnrollments: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await adminApi.dashboard();

      setStats(res.data);
    } catch (err) {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    stats,
    loading,
    error,
    refresh: loadDashboard,
  };
}