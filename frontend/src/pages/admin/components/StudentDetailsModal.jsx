export default function StudentDetailsModal({
  open,
  student,
  onClose,
}) {

  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white text-gray-900 rounded-xl w-full max-w-3xl p-8">

        <div className="flex justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Student Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <div className="flex gap-8">

          <img
            src={student.profileImage || "/default-avatar.png"}
            alt=""
            className="w-32 h-32 rounded-full"
          />

          <div className="space-y-3">

            <p>
              <strong>Name:</strong> {student.name}
            </p>

            <p>
              <strong>Email:</strong> {student.email}
            </p>

            <p>
              <strong>Phone:</strong> {student.phone}
            </p>

            <p>
              <strong>Department:</strong> {student.department}
            </p>

            <p>
              <strong>Semester:</strong> {student.semester}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {student.active ? "Active" : "Inactive"}
            </p>

            <p>
              <strong>Joined:</strong>{" "}
              {student.joinedDate}
            </p>

          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-bold mb-3">
            Enrolled Courses
          </h3>

          <ul className="list-disc ml-6">

            {(student.courses || []).map((course) => (

              <li key={course.id}>
                {course.title}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}