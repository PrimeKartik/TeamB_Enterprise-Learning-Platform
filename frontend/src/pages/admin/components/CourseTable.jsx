import { Eye, Pencil, Trash2, Star, Clock, ListPlus } from "lucide-react";

export default function CourseTable({
  courses,
  onView,
  onEdit,
  onDelete,
  onManageModules
}) {
  return (
    <div className="bg-panel border border-soft rounded-2xl shadow-xl overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-base border-b border-soft text-xs text-muted font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Course Details</th>
            <th className="px-6 py-4">Skill Category</th>
            <th className="px-6 py-4">Level</th>
            <th className="px-6 py-4 text-center">Duration</th>
            <th className="px-6 py-4 text-center">Lessons</th>
            <th className="px-6 py-4 text-center">Price</th>
            <th className="px-6 py-4 text-center">Rating</th>
            <th className="px-6 py-4 text-center">Enrolled</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-soft text-xs text-body">
          {courses.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center py-10 text-muted">
                No courses found in database.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.id} className="hover:bg-soft/50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80"}
                      alt={course.title}
                      className="w-12 h-12 rounded-xl object-cover border border-soft shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-heading text-sm line-clamp-1">{course.title}</h3>
                      <p className="text-muted text-[11px] line-clamp-1 mt-0.5">{course.description}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-heading">{course.skill}</td>

                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    course.level === "Beginner"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : course.level === "Intermediate"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-purple-500/10 border-purple-500/30 text-purple-400"
                  }`}>
                    {course.level}
                  </span>
                </td>

                <td className="px-6 py-4 text-center text-heading font-medium">{course.duration}</td>

                <td className="px-6 py-4 text-center text-heading font-medium">{course.totalLessons}</td>

                <td className="px-6 py-4 text-center font-bold text-emerald-400">₹{Number(course.price).toLocaleString('en-IN')}</td>

                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 font-semibold text-amber-400">
                    <Star size={14} fill="currentColor" /> {course.rating}
                  </div>
                </td>

                <td className="px-6 py-4 text-center font-semibold text-heading">{course.enrolled}</td>

                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    course.active !== false
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {course.active !== false ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => onView(course)} className="p-1.5 rounded-lg bg-base border border-soft text-muted hover:text-heading hover:bg-soft transition" title="View Details">
                      <Eye size={15} />
                    </button>
                    <button onClick={() => onEdit(course)} className="p-1.5 rounded-lg bg-base border border-soft text-purple-400 hover:bg-soft transition" title="Edit Course">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => onManageModules(course)} className="p-1.5 rounded-lg bg-base border border-soft text-pink-400 hover:bg-soft transition" title="Manage Modules">
                      <ListPlus size={15} />
                    </button>
                    <button onClick={() => onDelete(course)} className="p-1.5 rounded-lg bg-base border border-soft text-red-400 hover:bg-soft transition" title="Delete Course">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}