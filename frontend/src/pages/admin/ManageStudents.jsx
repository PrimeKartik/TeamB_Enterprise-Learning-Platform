import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { adminStudentApi } from "../../api/adminStudentApi";

import StudentTable from "./components/StudentTable";
import StudentStats from "./components/StudentStats";
import StudentFilters from "./components/StudentFilters";
import StudentFormModal from "./components/StudentFormModal";
import StudentDetailsModal from "./components/StudentDetailsModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

export default function ManageStudents() {

  const [students, setStudents] = useState([]);

  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    completedCourses: 0,
    certificates: 0,
  });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [formOpen, setFormOpen] = useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  useEffect(() => {
    loadStudents();
    loadStats();
  }, []);

  async function loadStudents() {
    try {
      const res =
        await adminStudentApi.getAllStudents();

      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const res =
        await adminStudentApi.getDashboardStats();

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        !department ||
        student.department === department;

      const matchesStatus =
        !status ||
        (status === "active"
          ? student.active
          : !student.active);

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [students, search, department, status]);

  function handleAdd() {
    setSelectedStudent(null);
    setFormOpen(true);
  }

  function handleEdit(student) {
    setSelectedStudent(student);
    setFormOpen(true);
  }

  function handleView(student) {
    setSelectedStudent(student);
    setDetailsOpen(true);
  }

  function handleDelete(student) {
    setSelectedStudent(student);
    setDeleteOpen(true);
  }

  async function handleSave(student) {
    try {
      if (student.id) {
        await adminStudentApi.updateStudent(
          student.id,
          student
        );
      } else {
        await adminStudentApi.createStudent(
          student
        );
      }

      setFormOpen(false);

      loadStudents();

      loadStats();
    } catch (err) {
      console.error(err);
    }
  }

  async function confirmDelete() {
    try {
      await adminStudentApi.deleteStudent(
        selectedStudent.id
      );

      setDeleteOpen(false);

      loadStudents();

      loadStats();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading)
    return (
      <div className="p-8">
        Loading...
      </div>
    );

  return (
    <div className="space-y-8 p-8">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Manage Students
        </h1>

        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-5 py-3 rounded-xl font-bold flex gap-2 items-center shadow-lg hover:opacity-90 transition"
        >
          <Plus size={18} />

          Add Student
        </button>

      </div>

      <StudentStats stats={stats} />

      <StudentFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        status={status}
        setStatus={setStatus}
      />

      <StudentTable
        students={filteredStudents}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StudentFormModal
        open={formOpen}
        student={selectedStudent}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <StudentDetailsModal
        open={detailsOpen}
        student={selectedStudent}
        onClose={() => setDetailsOpen(false)}
      />

      <DeleteConfirmationModal
        open={deleteOpen}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

    </div>
  );
}