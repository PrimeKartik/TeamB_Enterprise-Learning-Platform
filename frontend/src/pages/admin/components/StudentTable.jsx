import { Eye, Pencil, Trash2 } from "lucide-react";

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-panel border border-soft rounded-2xl shadow-xl overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-base border-b border-soft text-xs text-muted font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">Student Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Semester</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-soft text-xs text-body">
          {students.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-10 text-muted">
                No Students Found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="hover:bg-soft/50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        student.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || "User")}&background=a855f7&color=fff`
                      }
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border border-soft"
                    />
                    <span className="font-bold text-heading text-xs">{student.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-muted">{student.email}</td>

                <td className="px-6 py-4 font-semibold text-heading">{student.department || 'Computer Science'}</td>

                <td className="px-6 py-4 text-heading font-medium">{student.semester || 'Semester 6'}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      student.active !== false
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {student.active !== false ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(student)}
                      className="p-1.5 rounded-lg bg-base border border-soft text-muted hover:text-heading hover:bg-soft transition"
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>

                    <button
                      onClick={() => onEdit(student)}
                      className="p-1.5 rounded-lg bg-base border border-soft text-purple-400 hover:bg-soft transition"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() => onDelete(student)}
                      className="p-1.5 rounded-lg bg-base border border-soft text-red-400 hover:bg-soft transition"
                      title="Delete"
                    >
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