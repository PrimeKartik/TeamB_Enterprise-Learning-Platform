export default function CourseFilter({
  selectedLevel,
  onLevelChange,
  selectedSkill,
  onSkillChange,
  selectedBadge,
  onBadgeChange,
  selectedRating,
  onRatingChange,
  levels,
  skills
}) {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      {/* Level Filter */}
      <select
        value={selectedLevel}
        onChange={(e) => onLevelChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-[#201233] px-4 py-3 text-white outline-none transition focus:border-[#EC4899]"
      >
        <option value="" className="bg-[#201233]">All Levels</option>
        {levels.map((level) => (
          <option key={level} value={level} className="bg-[#201233]">
            {level}
          </option>
        ))}
      </select>

      {/* Skill / Category Filter */}
      <select
        value={selectedSkill}
        onChange={(e) => onSkillChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-[#201233] px-4 py-3 text-white outline-none transition focus:border-[#EC4899]"
      >
        <option value="" className="bg-[#201233]">All Categories</option>
        {skills.map((skill) => (
          <option key={skill} value={skill} className="bg-[#201233]">
            {skill}
          </option>
        ))}
      </select>

      {/* Badge / Collection Filter */}
      <select
        value={selectedBadge}
        onChange={(e) => onBadgeChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-[#201233] px-4 py-3 text-white outline-none transition focus:border-[#EC4899]"
      >
        <option value="" className="bg-[#201233]">All Collections</option>
        <option value="POPULAR" className="bg-[#201233]">Popular Courses</option>
        <option value="BESTSELLER" className="bg-[#201233]">Recently Added / Bestseller</option>
        <option value="TRENDING" className="bg-[#201233]">Recommended / Trending</option>
      </select>

      {/* Rating Filter */}
      <select
        value={selectedRating}
        onChange={(e) => onRatingChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-[#201233] px-4 py-3 text-white outline-none transition focus:border-[#EC4899]"
      >
        <option value="" className="bg-[#201233]">All Ratings</option>
        <option value="4.5" className="bg-[#201233]">4.5 ⭐ & above</option>
        <option value="4.0" className="bg-[#201233]">4.0 ⭐ & above</option>
      </select>

    </div>
  )
}