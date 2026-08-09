import { ArrowRight, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ContinueLearning({ enrollments = [] }) {
  if (!enrollments.length) return null

  const currentCourse =
    [...enrollments].sort((a, b) => b.progress - a.progress)[0]

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading text-xl font-bold">
          Continue Learning
        </h2>

        <Link
          to="/dashboard/learning"
          className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="card-glow rounded-2xl p-6 flex flex-col lg:flex-row justify-between gap-6">

        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">
            Resume Your Journey
          </p>

          <h3 className="text-heading text-2xl font-bold mb-2">
            {currentCourse.courseTitle}
          </h3>

          <p className="text-muted text-sm mb-6">
            {currentCourse.level} • {currentCourse.duration}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">
                Progress
              </span>

              <span className="font-semibold text-heading">
                {currentCourse.progress}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-tint-10 overflow-hidden">
              <div
                className="h-full bg-brand-gradient transition-all duration-500"
                style={{
                  width: `${currentCourse.progress}%`,
                }}
              />
            </div>
          </div>

          <Link
            to={`/courses/${currentCourse.courseId}`}
            className="inline-flex items-center gap-2 bg-brand-gradient text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            <PlayCircle size={18} />
            Continue Course
          </Link>
        </div>

        <div className="flex items-center justify-center relative w-36 h-36">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-primary/20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="60"
              cx="72"
              cy="72"
            />
            <circle
              className="text-primary transition-all duration-1000 ease-in-out"
              strokeWidth="8"
              strokeDasharray={377}
              strokeDashoffset={377 - (377 * currentCourse.progress) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="60"
              cx="72"
              cy="72"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-4xl font-bold text-heading">
              {currentCourse.progress}%
            </p>
            <p className="text-xs text-muted mt-1">
              Completed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
