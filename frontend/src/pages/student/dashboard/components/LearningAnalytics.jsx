import {
  Trophy,
  BookOpen,
  TrendingUp,
  Target,
  CheckCircle2,
} from 'lucide-react'

export default function LearningAnalytics({
  totalCourses = 0,
  completedCourses = 0,
  averageProgress = 0,
}) {
  const inProgressCourses = totalCourses - completedCourses

  const completionRate =
    totalCourses === 0
      ? 0
      : Math.round((completedCourses / totalCourses) * 100)

  const progressColor = () => {
    if (averageProgress >= 80) return 'bg-green-500'
    if (averageProgress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <section className="card-glow rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-heading text-2xl font-bold">
            Learning Analytics
          </h2>

          <p className="text-muted mt-1">
            Overview of your learning progress
          </p>
        </div>

        <TrendingUp
          size={28}
          className="text-primary"
        />
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="rounded-xl border border-border p-5">
          <div className="flex items-center justify-between">

            <BookOpen className="text-primary" />

            <span className="text-xs text-muted">
              Total
            </span>

          </div>

          <h3 className="text-3xl font-bold text-heading mt-4">
            {totalCourses}
          </h3>

          <p className="text-muted text-sm mt-2">
            Courses Enrolled
          </p>
        </div>

        <div className="rounded-xl border border-border p-5">

          <div className="flex items-center justify-between">

            <CheckCircle2 className="text-green-500" />

            <span className="text-xs text-muted">
              Completed
            </span>

          </div>

          <h3 className="text-3xl font-bold text-heading mt-4">
            {completedCourses}
          </h3>

          <p className="text-muted text-sm mt-2">
            Courses Finished
          </p>

        </div>

        <div className="rounded-xl border border-border p-5">

          <div className="flex items-center justify-between">

            <Target className="text-orange-500" />

            <span className="text-xs text-muted">
              Active
            </span>

          </div>

          <h3 className="text-3xl font-bold text-heading mt-4">
            {inProgressCourses}
          </h3>

          <p className="text-muted text-sm mt-2">
            Courses In Progress
          </p>

        </div>

        <div className="rounded-xl border border-border p-5">

          <div className="flex items-center justify-between">

            <Trophy className="text-yellow-500" />

            <span className="text-xs text-muted">
              Success
            </span>

          </div>

          <h3 className="text-3xl font-bold text-heading mt-4">
            {completionRate}%
          </h3>

          <p className="text-muted text-sm mt-2">
            Completion Rate
          </p>

        </div>

      </div>

      {/* Average Progress */}

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="font-medium text-heading">
            Average Progress
          </span>

          <span className="font-semibold text-heading">
            {Math.round(averageProgress)}%
          </span>

        </div>

        <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

          <div
            className={`h-full transition-all duration-700 ${progressColor()}`}
            style={{
              width: `${averageProgress}%`,
            }}
          />

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 rounded-xl bg-primary/5 p-5">

        <h3 className="text-heading font-semibold mb-2">
          Performance Summary
        </h3>

        <p className="text-muted leading-7">

          {completionRate >= 80 &&
            'Outstanding! You are completing courses consistently.'}

          {completionRate >= 50 &&
            completionRate < 80 &&
            'Great progress! Keep completing your enrolled courses.'}

          {completionRate < 50 &&
            'You have started your learning journey. Keep learning consistently to improve your completion rate.'}

        </p>

      </div>

    </section>
  )
}
