import { Target } from 'lucide-react'

export default function DailyGoal({
  completedLessons = 0,
  targetLessons = 1,
}) {
  const percentage =
    targetLessons === 0
      ? 0
      : Math.round(
          (completedLessons / targetLessons) * 100
        )

  return (
    <div className="card-glow rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <Target
          size={22}
          className="text-primary"
        />

        <h2 className="text-heading text-xl font-bold">
          Daily Goal
        </h2>
      </div>

      <h3 className="text-4xl font-bold text-heading">
        {percentage}%
      </h3>

      <p className="text-muted mt-2">
        {completedLessons} of {targetLessons} lessons completed today.
      </p>

      <div className="mt-6 h-3 rounded-full bg-tint-10 overflow-hidden">
        <div
          className="h-full bg-brand-gradient transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="text-xs text-muted mt-4">
        Keep learning every day to build consistency.
      </p>
    </div>
  )
}
