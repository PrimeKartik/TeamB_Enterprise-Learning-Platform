import { useEffect, useState } from "react";

const SKILL_OPTIONS = [
  "Web Development",
  "React",
  "Java",
  "Database",
  "Python",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cyber Security",
  "Cloud Computing",
];

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

// Numeric fields start as empty strings, NOT 0 — an <input> only shows its
// placeholder text when the value is an empty string. Initializing these
// to 0 made the placeholder invisible (a real "0" was shown instead).
const initialForm = {
  title: "",
  description: "",
  imageUrl: "",
  skill: "",
  level: "",
  duration: "",
  price: "",
  rating: "",
  badge: "",
  badgeColor: "",
  totalLessons: "",
  totalHours: "",
  totalQuizzes: "",
  prerequisites: "",
  learningOutcomes: "",
};

// Fields that must be sent to the backend as numbers, not strings.
const NUMERIC_FIELDS = ["price", "rating", "totalLessons", "totalHours", "totalQuizzes"];

export default function CourseFormModal({
  open,
  onClose,
  onSave,
  course,
}) {

  const [form, setForm] = useState(initialForm);
  const [customSkill, setCustomSkill] = useState(false);

  useEffect(() => {
    if (course) {
      setForm(course);
      // If the existing course's skill isn't one of our presets, show the
      // free-text input pre-filled so the admin doesn't lose their data.
      setCustomSkill(!!course.skill && !SKILL_OPTIONS.includes(course.skill));
    } else {
      setForm(initialForm);
      setCustomSkill(false);
    }
  }, [course]);

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSkillSelect(e) {
    const value = e.target.value;

    if (value === "__custom__") {
      setCustomSkill(true);
      setForm({ ...form, skill: "" });
      return;
    }

    setCustomSkill(false);
    setForm({ ...form, skill: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Convert numeric fields back to numbers before handing off to the
    // parent save handler. Empty fields default to 0, matching the
    // backend's own defaults for these columns.
    const payload = { ...form };
    for (const field of NUMERIC_FIELDS) {
      payload[field] = payload[field] === "" ? 0 : Number(payload[field]);
    }

    onSave(payload);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white text-gray-900 rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {course ? "Edit Course" : "Add Course"}
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
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="border p-3 rounded-lg"
            required
          />

          {customSkill ? (
            <div className="flex gap-2">
              <input
                name="skill"
                value={form.skill}
                onChange={handleChange}
                placeholder="Custom Skill"
                className="border p-3 rounded-lg flex-1"
                autoFocus
              />
              <button
                type="button"
                onClick={() => { setCustomSkill(false); setForm({ ...form, skill: "" }); }}
                className="border px-3 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                title="Back to preset list"
              >
                ×
              </button>
            </div>
          ) : (
            <select
              name="skill"
              value={form.skill}
              onChange={handleSkillSelect}
              className="border p-3 rounded-lg"
            >
              <option value="">Select Skill</option>
              {SKILL_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
              <option value="__custom__">+ Custom...</option>
            </select>
          )}

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 rounded-lg"
          />

          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Level</option>
            {LEVEL_OPTIONS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="border p-3 rounded-lg"
          />

          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="Badge"
            className="border p-3 rounded-lg"
          />

          <input
            name="badgeColor"
            value={form.badgeColor}
            onChange={handleChange}
            placeholder="Badge Color"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="totalLessons"
            value={form.totalLessons}
            onChange={handleChange}
            placeholder="Total Lessons"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="totalHours"
            value={form.totalHours}
            onChange={handleChange}
            placeholder="Total Hours"
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="totalQuizzes"
            value={form.totalQuizzes}
            onChange={handleChange}
            placeholder="Total Quizzes"
            className="border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            name="prerequisites"
            value={form.prerequisites}
            onChange={handleChange}
            placeholder="Prerequisites"
            rows="3"
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            name="learningOutcomes"
            value={form.learningOutcomes}
            onChange={handleChange}
            placeholder="Learning Outcomes"
            rows="3"
            className="border p-3 rounded-lg md:col-span-2"
          />

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:opacity-90 transition"
            >
              Save Course
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
