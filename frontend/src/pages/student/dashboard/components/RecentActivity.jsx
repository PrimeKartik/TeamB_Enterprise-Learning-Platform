import {
  Clock,
  BookOpen,
  Award,
  ClipboardCheck,
} from 'lucide-react'

const icons = {
  COURSE: BookOpen,
  CERTIFICATE: Award,
  ASSESSMENT: ClipboardCheck,
}

export default function RecentActivity({ activities = [] }) {
  return (
    <div className="card-glow rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-heading text-xl font-bold">
          Recent Activity
        </h2>

        <Clock
          size={18}
          className="text-primary"
        />
      </div>

      {!activities.length ? (
        <div className="text-center py-10">
          <p className="text-muted">
            No recent activity available.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => {
            const Icon = icons[activity.type] || BookOpen

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center">
                  <Icon
                    size={18}
                    className="text-white"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-heading font-semibold">
                    {activity.title}
                  </h4>

                  <p className="text-muted text-sm mt-1">
                    {activity.description}
                  </p>

                  <p className="text-xs text-muted mt-2">
                    {activity.time}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
