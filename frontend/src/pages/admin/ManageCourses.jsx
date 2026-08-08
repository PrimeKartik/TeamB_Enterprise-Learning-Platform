import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, AlertCircle, ListPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CourseFormModal from "./components/CourseFormModal";
import { adminCourseApi } from "../../api/adminCourseApi";
import { toast } from "react-toastify";

export default function ManageCourses() {

    const [courseRows, setCourseRows] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [formOpen, setFormOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);

    useEffect(() => {
        loadCourses();
    }, []);

    async function loadCourses() {
        try {
            setLoading(true);
            setError(null);

            const response = await adminCourseApi.getAllCourses();

            // Backend returns CourseAdminDTO: { course: {...}, enrolledCount, completedCount }
            setCourseRows(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load courses right now.");
        } finally {
            setLoading(false);
        }
    }

    const filteredRows = courseRows.filter((row) =>
        row.title && row.title.toLowerCase().includes(search.toLowerCase())
    );

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Delete this course?");
        if (!confirmDelete) return;

        try {
            await adminCourseApi.deleteCourse(id);
            toast.success("Course deleted.");
            loadCourses();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Could not delete this course.");
        }
    }

    function handleAdd() {
        setEditingCourse(null);
        setFormOpen(true);
    }

    function handleEdit(course) {
        setEditingCourse(course);
        setFormOpen(true);
    }

    async function handleSave(formData) {
        try {
            if (editingCourse?.id) {
                await adminCourseApi.updateCourse(editingCourse.id, formData);
                toast.success("Course updated.");
            } else {
                await adminCourseApi.createCourse(formData);
                toast.success("Course created.");
            }
            setFormOpen(false);
            loadCourses();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Could not save this course.");
        }
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
                <AlertCircle className="mx-auto mb-3 text-red-400" size={28} />
                <p className="text-red-400">{error}</p>
                <button
                    onClick={loadCourses}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold text-heading">
                    Manage Courses
                </h1>

                <button
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white px-5 py-3 rounded-xl font-bold flex gap-2 items-center hover:opacity-90 transition shadow-lg"
                >
                    <Plus size={18}/>
                    Add Course
                </button>

            </div>

            <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                    className="w-full border rounded-lg pl-10 py-3"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-14 rounded-lg bg-soft animate-pulse" />
                    ))}
                </div>
            ) : filteredRows.length === 0 ? (
                <div className="rounded-lg border border-soft bg-panel p-10 text-center text-muted">
                    No courses found. Click "Add Course" to create your first one.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">

                    <table className="w-full bg-white text-gray-900">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Title</th>
                                <th className="text-left">Level</th>
                                <th className="text-left">Duration</th>
                                <th className="text-left">Lessons</th>
                                <th className="text-left">Price</th>
                                <th className="text-left">Enrolled</th>
                                <th className="text-left">Completed</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRows.map((row) => (
                                <tr key={row.id} className="border-t">
                                    <td className="p-4">{row.title}</td>
                                    <td>{row.level}</td>
                                    <td>{row.duration}</td>
                                    <td>{row.totalLessons}</td>
                                    <td>₹{Number(row.price).toLocaleString('en-IN')}</td>
                                    <td>{row.enrolledCount}</td>
                                    <td>{row.completedCount}</td>
                                    <td>
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleEdit(row)}
                                                className="text-[#EC4899] hover:text-purple-300 transition"
                                            >
                                                <Pencil size={18}/>
                                            </button>
                                            <button
                                                onClick={() => navigate(`/admin/courses/${row.id}/modules`)}
                                                className="text-purple-600 hover:text-purple-800"
                                                title="Manage Modules"
                                            >
                                                <ListPlus size={18}/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            )}

            <CourseFormModal
                open={formOpen}
                course={editingCourse}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
            />

        </div>

    );

}
