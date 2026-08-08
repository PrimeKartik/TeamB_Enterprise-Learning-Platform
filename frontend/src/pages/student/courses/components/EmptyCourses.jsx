import { BookOpen } from 'lucide-react'

export default function EmptyCourses() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#201233] py-20 text-center text-white">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-950/60 border border-purple-800/40">
        <BookOpen
          size={40}
          className="text-[#EC4899]"
        />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-white">
        No Courses Found
      </h2>

      <p className="mx-auto mt-3 max-w-md text-[#B8B8C7]">
        We couldn't find any courses matching your search or filter.
        Try changing your search keywords or filter options.
      </p>

    </div>
  )
}