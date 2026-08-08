import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, Heart } from 'lucide-react'

import { courseApi } from '../../../api/courseApi'
import { useWishlist } from '../../../hooks/useWishlist'

import CourseSearch from './components/CourseSearch'
import CourseFilter from './components/CourseFilter'
import CourseGrid from './components/CourseGrid'
import CourseSkeleton from './components/CourseSkeleton'
import EmptyCourses from './components/EmptyCourses'

export default function CoursesSection() {

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [selectedBadge, setSelectedBadge] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [savedOnly, setSavedOnly] = useState(false)

  const { savedIds } = useWishlist()

  function handleEnrolled(courseId) {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, enrolled: true, progress: c.progress ?? 0 } : c
      )
    )
  }

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    try {
      setLoading(true)
      setError(null)
      const response = await courseApi.getAll()
      setCourses(response.data)
    } catch (err) {
      console.error(err)
      setError('Unable to load courses.')
    } finally {
      setLoading(false)
    }
  }

  const levels = useMemo(() => {
    return [...new Set(
      courses
        .map(course => course.level)
        .filter(Boolean)
    )]
  }, [courses])

  const skills = useMemo(() => {
    return [...new Set(
      courses
        .map(course => course.skill)
        .filter(Boolean)
    )]
  }, [courses])

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skill?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLevel = selectedLevel === '' || course.level === selectedLevel
      const matchesSkill = selectedSkill === '' || course.skill === selectedSkill
      const matchesBadge = selectedBadge === '' || (course.badge && course.badge.toUpperCase() === selectedBadge.toUpperCase())
      const matchesRating = selectedRating === '' || (course.rating && course.rating >= Number(selectedRating))
      const matchesSaved = !savedOnly || savedIds.includes(course.id)

      return (
        matchesSearch &&
        matchesLevel &&
        matchesSkill &&
        matchesBadge &&
        matchesRating &&
        matchesSaved
      )
    })
  }, [
    courses,
    searchTerm,
    selectedLevel,
    selectedSkill,
    selectedBadge,
    selectedRating,
    savedOnly,
    savedIds
  ])

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Explore Courses
          </h1>
          <p className="mt-2 text-[#B8B8C7]">
            Discover new skills, master industry fundamentals, and continue your learning journey.
          </p>
        </div>

        <div className="rounded-xl bg-[#201233] px-5 py-3 border border-white/10 shadow-lg">
          <p className="text-xs font-semibold text-[#B8B8C7]">
            Total Courses
          </p>
          <p className="text-2xl font-extrabold text-[#EC4899]">
            {filteredCourses.length}
          </p>
        </div>
      </div>

      {/* Search */}
      <CourseSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <CourseFilter
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            selectedSkill={selectedSkill}
            onSkillChange={setSelectedSkill}
            selectedBadge={selectedBadge}
            onBadgeChange={setSelectedBadge}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            levels={levels}
            skills={skills}
          />
        </div>

        <button
          onClick={() => setSavedOnly((s) => !s)}
          className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
            savedOnly
              ? 'border-[#EC4899] bg-[#EC4899]/20 text-[#EC4899]'
              : 'border-white/10 bg-[#201233] text-[#B8B8C7] hover:text-white'
          }`}
        >
          <Heart size={16} fill={savedOnly ? 'currentColor' : 'none'} />
          Saved {savedIds.length > 0 && `(${savedIds.length})`}
        </button>
      </div>

      {/* Loading */}
      {loading && <CourseSkeleton />}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-500/20 bg-red-950/40 p-8 text-center text-white">
          <AlertCircle
            size={42}
            className="mx-auto text-red-500"
          />
          <h2 className="mt-4 text-xl font-semibold text-red-400">
            Failed to Load Courses
          </h2>
          <p className="mt-2 text-[#B8B8C7]">
            {error}
          </p>
          <button
            onClick={loadCourses}
            className="mt-6 rounded-lg bg-[#7C3AED] px-5 py-2 text-white font-bold"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        filteredCourses.length > 0 ? (
          <CourseGrid
            courses={filteredCourses}
            onEnrolled={handleEnrolled}
          />
        ) : (
          <EmptyCourses />
        )
      )}

    </div>
  )
}