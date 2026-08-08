import CourseCard from './CourseCard'

export default function CourseGrid({ courses, onEnrolled }) {
  if (!courses || courses.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEnrolled={onEnrolled}
        />
      ))}
    </div>
  )
}