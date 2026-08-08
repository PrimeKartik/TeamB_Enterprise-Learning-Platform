import EnrolledCourseCard from './EnrolledCourseCard'

export default function CourseGrid({
  enrollments = [],
  onBump,
}) {
  if (!enrollments.length) {
    return (
      <div className="card-glow rounded-2xl p-10 text-center">
        <h3 className="text-heading text-xl font-semibold mb-2">
          No Courses Yet
        </h3>

        <p className="text-muted">
          Enroll in a course to start your learning journey.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {enrollments.map((course) => (
        <EnrolledCourseCard
          key={course.enrollmentId}
          enrollment={course}
          onBump={onBump}
        />
      ))}
    </div>
  )
}
