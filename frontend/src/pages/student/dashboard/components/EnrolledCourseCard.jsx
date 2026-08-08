import { Link } from 'react-router-dom'
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

export default function EnrolledCourseCard({
  enrollment,
  onBump,
}) {
  const handleProgress = async () => {
    if (enrollment.progress >= 100) return

    await onBump(
      enrollment.courseId,
      Math.min(100, enrollment.progress + 10)
    )
  }

  return (
    <div className="card-glow rounded-2xl overflow-hidden hover:-translate-y-1 transition">
      <div className="h-2 bg-brand-gradient" />

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen
                size={18}
                className="text-primary"
              />

              <Link
                to={`/courses/${enrollment.courseId}`}
                className="font-semibold text-heading hover:text-primary"
              >
                {enrollment.courseTitle}
              </Link>
            </div>

            <p className="text-muted text-sm">
              {enrollment.level} • {enrollment.duration}
            </p>
          </div>

          {enrollment.progress === 100 && (
            <CheckCircle2
              className="text-emerald-500"
              size={22}
            />
          )}
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">
              Progress
            </span>

            <span className="font-semibold text-heading">
              {enrollment.progress}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-brand-gradient transition-all duration-500"
              style={{
                width: `${enrollment.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleProgress}
            disabled={enrollment.progress >= 100}
            className="text-primary text-sm font-semibold hover:underline disabled:opacity-50"
          >
            {enrollment.progress === 100
              ? 'Completed'
              : 'Log 10% Progress'}
          </button>

          <Link
            to={`/courses/${enrollment.courseId}`}
            className="flex items-center gap-1 text-primary text-sm font-semibold"
          >
            Open
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
