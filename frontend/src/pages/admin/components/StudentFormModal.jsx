import { useEffect, useState } from "react";

// Kept consistent with the department options already used in
// StudentFilters.jsx so filtering and data entry always line up.
const DEPARTMENT_OPTIONS = [
  "Computer Science",
  "IT",
  "ECE",
  "Data Science",
];

const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  semester: "",
  active: true,
};

export default function StudentFormModal({
  open,
  student,
  onClose,
  onSave,
}) {

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (student) {
      setForm(student);
    } else {
      setForm(initialForm);
    }
  }, [student]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white text-gray-900 rounded-xl w-full max-w-2xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {student ? "Edit Student" : "Add Student"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            className="border p-3 rounded-lg"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="border p-3 rounded-lg"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="border p-3 rounded-lg"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <select
            className="border p-3 rounded-lg"
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {DEPARTMENT_OPTIONS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            className="border p-3 rounded-lg"
            name="semester"
            value={form.semester}
            onChange={handleChange}
          >
            <option value="">Select Semester</option>
            {SEMESTER_OPTIONS.map((sem) => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />

            Active Student

          </label>

          <div className="md:col-span-2 flex justify-end gap-3 mt-5">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:opacity-90 transition"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
