import { ArrowUpRight } from 'lucide-react'

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
}) {
  return (
    <div className="card-glow rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted font-medium">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-heading">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-sm text-muted">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon
              size={24}
              className={iconColor}
            />
          </div>

          <ArrowUpRight
            size={18}
            className="text-primary"
          />
        </div>
      </div>
    </div>
  )
}
