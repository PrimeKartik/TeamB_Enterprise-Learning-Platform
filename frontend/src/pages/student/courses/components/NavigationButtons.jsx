import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function NavigationButtons({
  currentLesson,
  totalLessons,
  onPrevious,
  onNext,
  loading
}) {

  const isFirst = currentLesson === 0

  const isLast = currentLesson === totalLessons - 1

  return (

    <div className="flex justify-between rounded-2xl bg-[#201233] p-6 shadow-xl border border-white/10 text-white">

      <button
        onClick={onPrevious}
        disabled={isFirst || loading}
        className="flex items-center gap-2 rounded-xl bg-[#1A1028] border border-white/10 px-5 py-2.5 text-xs font-semibold text-purple-200 hover:text-white hover:bg-purple-900/60 disabled:cursor-not-allowed disabled:opacity-30 transition"
      >
        <ArrowLeft size={16} />
        Previous Lesson
      </button>

      <button
        onClick={onNext}
        disabled={isLast || loading}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 transition"
      >
        {loading ? "Saving..." : "Next Lesson"}
        <ArrowRight size={16} />
      </button>

    </div>

  )

}