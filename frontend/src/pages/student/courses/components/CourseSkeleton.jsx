export default function CourseSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="h-52 bg-gray-200" />

          <div className="space-y-4 p-5">
            <div className="h-6 w-3/4 rounded bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>

            <div className="h-8 w-24 rounded-full bg-gray-200" />

            <div className="grid grid-cols-2 gap-3">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
            </div>

            <div className="h-10 rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}