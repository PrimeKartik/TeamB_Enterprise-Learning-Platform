import { Search } from 'lucide-react'

export default function CourseSearch({
  searchTerm,
  onSearchChange
}) {
  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search courses..."
        className="w-full rounded-xl border border-white/10 bg-[#201233] py-3 pl-11 pr-4 text-white placeholder-gray-500 outline-none transition focus:border-[#EC4899]"
      />

    </div>
  )
}