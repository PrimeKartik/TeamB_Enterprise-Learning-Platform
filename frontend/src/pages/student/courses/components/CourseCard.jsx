import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Clock,
  Star,
  BookOpen,
  CheckCircle,
  PlayCircle,
  Heart,
  Loader2,
  Award
} from 'lucide-react'

import { enrollmentApi } from '../../../../api/enrollmentApi'
import { getCurrentUser } from '../../../../utils/auth'
import { useWishlist } from '../../../../hooks/useWishlist'

export default function CourseCard({ course, onEnrolled }) {
  const {
    id,
    title,
    description,
    imageUrl,
    badge,
    badgeColor,
    level,
    duration,
    rating,
    reviews,
    totalLessons,
    skill,
    enrolled,
    progress
  } = course

  const navigate = useNavigate()
  const user = getCurrentUser()
  const { isSaved, toggle } = useWishlist()
  const [enrolling, setEnrolling] = useState(false)
  const saved = isSaved(id)

  async function handleEnroll() {
    if (!user) {
      toast.info('Please log in to enroll in this course.')
      navigate('/login')
      return
    }

    try {
      setEnrolling(true)
      await enrollmentApi.enroll(id)
      toast.success(`Enrolled in "${title}"!`)
      onEnrolled?.(id)
    } catch (err) {
      // 409 = already enrolled on the backend — treat as success, not an error.
      if (err.response?.status === 409) {
        toast.info('You are already enrolled in this course.')
        onEnrolled?.(id)
      } else {
        toast.error('Could not enroll right now. Please try again.')
      }
    } finally {
      setEnrolling(false)
    }
  }

  function handleContinue() {
    navigate(`/dashboard/courses/${id}/player`)
  }

  function handleViewCertificate() {
    navigate('/dashboard/certificates')
  }

  function handleToggleSave(e) {
    e.preventDefault()
    e.stopPropagation()
    toggle(id)
    toast.info(saved ? 'Removed from saved courses' : 'Saved for later')
  }

  const getButton = () => {
    if (!enrolled) {
      return (
        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2.5 font-bold text-white transition hover:opacity-90 disabled:opacity-60 shadow-md shadow-purple-950/40"
        >
          {enrolling ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Enrolling...
            </>
          ) : (
            'Enroll Now'
          )}
        </button>
      )
    }

    if (progress === 100) {
      return (
        <button
          onClick={handleViewCertificate}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-bold text-white transition hover:bg-emerald-500 shadow-md"
        >
          <Award size={16} /> View Certificate
        </button>
      )
    }

    return (
      <button
        onClick={handleContinue}
        className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2.5 font-bold text-white transition hover:opacity-90 shadow-md"
      >
        Continue Learning
      </button>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#201233] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-purple-600/50">

      {/* Course Image */}

      <div className="relative">

        <img
          src={imageUrl || '/images/full-stack-development.svg'}
          alt={title}
          className="h-52 w-full object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/images/full-stack-development.svg'
          }}
        />

        {badge && (
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md"
            style={{ backgroundColor: badgeColor }}
          >
            {badge}
          </span>
        )}

        <button
          onClick={handleToggleSave}
          aria-label={saved ? 'Remove from saved courses' : 'Save for later'}
          title={saved ? 'Remove from saved courses' : 'Save for later'}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1028]/90 border border-white/10 shadow transition hover:scale-105"
        >
          <Heart
            size={16}
            className={saved ? 'text-rose-500' : 'text-purple-300'}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Body */}

      <div className="space-y-4 p-5">

        <div>

          <h3 className="line-clamp-2 text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm text-[#B8B8C7]">
            {description}
          </p>

        </div>

        {/* Skill */}

        <span className="inline-block rounded-full bg-purple-950/60 border border-purple-800/40 px-3 py-1 text-xs font-medium text-purple-300">
          {skill}
        </span>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-3 text-sm text-[#B8B8C7]">

          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[#7C3AED]" />
            {totalLessons} Lessons
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#EC4899]" />
            {duration}
          </div>

          <div className="flex items-center gap-2">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
            {rating} ({reviews})
          </div>

          <div className="flex items-center gap-2">
            <PlayCircle size={16} className="text-[#7C3AED]" />
            {level}
          </div>

        </div>

        {/* Progress */}

        {enrolled && (

          <div>

            <div className="mb-2 flex justify-between text-sm text-[#B8B8C7]">

              <span>Progress</span>

              <span className="font-semibold text-white">{progress}%</span>

            </div>

            <div className="h-2 rounded-full bg-[#1A1028]">

              <div
                className="h-2 rounded-full bg-[#EC4899]"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>

          </div>

        )}

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-white/10 pt-4">

          <Link
            to={`/courses/${id}`}
            className="text-sm font-semibold text-purple-400 hover:text-purple-300"
          >
            View Details
          </Link>

          {progress === 100 && (
            <CheckCircle
              className="text-emerald-400"
              size={20}
            />
          )}

        </div>

        {getButton()}

      </div>

    </div>
  )
}
