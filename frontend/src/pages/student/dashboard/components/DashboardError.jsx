import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function DashboardError({
  message = 'Something went wrong while loading your dashboard.',
  onRetry,
}) {
  return (
    <div className="card-glow rounded-2xl p-10 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle
          className="text-red-600 dark:text-red-400"
          size={32}
        />
      </div>

      <h2 className="text-heading text-2xl font-bold">
        Unable to Load Dashboard
      </h2>

      <p className="text-muted mt-3 max-w-md mx-auto">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-white font-semibold hover:opacity-90 transition"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      )}
    </div>
  )
}
