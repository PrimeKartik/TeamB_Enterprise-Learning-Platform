import { useEffect, useState } from "react";
import { adminStudentApi } from "../api/adminStudentApi";

export default function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await adminStudentApi.getAllStudents();

      setStudents(res.data);
    } catch (err) {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const createStudent = async (student) => {
    await adminStudentApi.createStudent(student);
    loadStudents();
  };

  const updateStudent = async (id, student) => {
    await adminStudentApi.updateStudent(id, student);
    loadStudents();
  };

  const deleteStudent = async (id) => {
    await adminStudentApi.deleteStudent(id);
    loadStudents();
  };

  const getStudent = (id) =>
    students.find((student) => student.id === id);

  return {
    students,
    loading,
    error,
    refresh: loadStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudent,
  };
}