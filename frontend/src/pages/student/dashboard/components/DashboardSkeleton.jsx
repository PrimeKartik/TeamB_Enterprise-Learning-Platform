export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">

      {/* Hero Skeleton */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-3xl h-56" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-36"
          />
        ))}
      </div>

      {/* Continue Learning */}
      <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-56" />

      {/* Course Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-72"
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-80" />
        <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-80" />
      </div>
    </div>
  )
}