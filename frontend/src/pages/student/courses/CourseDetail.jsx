import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Star,
  Clock,
  BookOpen,
  Award,
  CheckCircle,
  Loader2,
  Heart,
  Play,
  Tag,
  Send,
  Sparkles
} from 'lucide-react'

import { courseApi } from '../../../api/courseApi'
import { enrollmentApi } from '../../../api/enrollmentApi'
import { wishlistApi } from '../../../api/wishlistApi'
import CourseReviewsSection from './components/CourseReviewsSection'
import { toast } from 'react-toastify'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [relatedCourses, setRelatedCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [userRating, setUserRating] = useState(5)
  const [userReview, setUserReview] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCourse()
  }, [id])

  async function loadCourse() {
    try {
      setLoading(true)
      setError(null)
      const response = await courseApi.getById(id)
      setCourse(response.data)

      // Fetch related courses
      const allRes = await courseApi.getAll()
      if (allRes.data) {
        setRelatedCourses(allRes.data.filter(c => c.id !== Number(id)).slice(0, 3))
      }
    } catch (err) {
      console.error(err)
      setError('Unable to load course.')
    } finally {
      setLoading(false)
    }
  }

  async function handleEnroll() {
    try {
      setEnrolling(true)
      await enrollmentApi.enroll(course.id)
      setCourse(prev => ({ ...prev, enrolled: true }))
      toast.success('Enrolled successfully!')
      navigate(`/dashboard/courses/${course.id}/player`)
    } catch (err) {
      console.error(err)
      if (err.response?.status === 409) {
        setCourse(prev => ({ ...prev, enrolled: true }))
        toast.info('You are already enrolled in this course.')
        navigate(`/dashboard/courses/${course.id}/player`)
      } else {
        toast.error(err.response?.data?.message || 'Enrollment failed.')
      }
    } finally {
      setEnrolling(false)
    }
  }

  async function handleToggleWishlist() {
    try {
      await wishlistApi.toggle(course.id)
      setInWishlist(!inWishlist)
      toast.success(inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to update wishlist')
    }
  }

  async function handleSubmitReview(e) {
    e.preventDefault()
    if (!userReview.trim()) return
    try {
      setSubmittingReview(true)
      toast.success('Thank you for rating this course!')
      setUserReview('')
    } catch (err) {
      console.error(err)
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#EC4899]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-950/40 p-8 text-center text-white">
        <h2 className="text-xl font-semibold text-red-400">{error}</h2>
        <button
          onClick={loadCourse}
          className="mt-6 rounded-lg bg-[#7C3AED] px-5 py-2 text-white"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!course) return null

  return (
    <div className="space-y-8">
      {/* Back & Wishlist Toolbar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1A1028] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2A1740]"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={handleToggleWishlist}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${
            inWishlist
              ? 'border-[#EC4899] bg-[#EC4899]/20 text-[#EC4899]'
              : 'border-white/10 bg-[#1A1028] text-white hover:bg-[#2A1740]'
          }`}
        >
          <Heart size={18} className={inWishlist ? 'fill-[#EC4899]' : ''} />
          {inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Hero Banner with Preview Overlay */}
      <div className="overflow-hidden rounded-3xl bg-[#201233] border border-white/10 shadow-xl text-white">
        <div className="relative h-80 w-full overflow-hidden group">
          <img
            src={course.imageUrl || '/images/full-stack-development.svg'}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/images/full-stack-development.svg'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201233] via-black/40 to-transparent flex items-center justify-center">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <Play size={20} className="fill-white" />
              Watch Course Preview Video
            </button>
          </div>
        </div>

        <div className="space-y-6 p-8">
          <div className="flex flex-wrap items-center gap-3">
            {course.badge && (
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: course.badgeColor || '#7C3AED' }}
              >
                {course.badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-xs font-semibold text-purple-300">
              <Tag size={12} className="text-[#EC4899]" />
              {course.skill || 'Technology'}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-white">{course.title}</h1>

          <p className="text-lg leading-relaxed text-[#B8B8C7]">{course.description}</p>

          {/* Course Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['React', 'Web Dev', 'Full Stack', 'JavaScript', 'Spring Boot'].map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-[#1A1028] border border-white/10 text-xs font-medium text-purple-300">
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 pt-2">
            <div className="flex items-center gap-3">
              <Star className="fill-yellow-400 text-yellow-400" size={22} />
              <div>
                <p className="font-semibold text-white">{course.rating}</p>
                <p className="text-sm text-[#B8B8C7]">{course.reviews} reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-[#EC4899]" size={22} />
              <div>
                <p className="font-semibold text-white">{course.duration}</p>
                <p className="text-sm text-[#B8B8C7]">Estimated Time</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="text-[#7C3AED]" size={22} />
              <div>
                <p className="font-semibold text-white">{course.totalLessons} Lessons</p>
                <p className="text-sm text-[#B8B8C7]">5 Modules</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="text-[#EC4899]" size={22} />
              <div>
                <p className="font-semibold text-white">{course.level}</p>
                <p className="text-sm text-[#B8B8C7]">Difficulty Level</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Prerequisites */}
          <div className="rounded-2xl bg-[#201233] border border-white/10 p-8 shadow-lg text-white">
            <h2 className="mb-4 text-2xl font-bold text-white">Course Prerequisites</h2>
            <p className="leading-8 text-[#B8B8C7]">
              {course.prerequisites || 'Basic computer literacy. No prior advanced programming experience required.'}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="rounded-2xl bg-[#201233] border border-white/10 p-8 shadow-lg text-white">
            <h2 className="mb-5 text-2xl font-bold text-white">Learning Objectives & Outcomes</h2>
            <ul className="space-y-4">
              {(course.learningOutcomes || 'Master industry core fundamentals, Build full stack web applications, Deploy apps to cloud platforms, Write clean production ready code')
                .split(',')
                .filter(Boolean)
                .map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-1 text-emerald-400 shrink-0" />
                    <span className="text-[#B8B8C7] font-medium">{item.trim()}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Ratings & Reviews Section */}
          <CourseReviewsSection courseId={course.id} courseTitle={course.title} />
        </div>

        {/* Right Sidebar Enrollment Panel */}
        <div>
          <div className="sticky top-24 rounded-2xl bg-[#201233] border border-white/10 p-8 shadow-xl text-white space-y-6">
            <p className="text-center text-4xl font-extrabold text-[#EC4899]">
              {course.price === 0 ? 'Free' : `₹${Number(course.price).toLocaleString('en-IN')}`}
            </p>

            <button
              onClick={handleEnroll}
              disabled={enrolling || course.enrolled}
              className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] py-4 text-lg font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-purple-950/40 cursor-pointer"
            >
              {course.enrolled ? 'Already Enrolled' : enrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>

            {course.enrolled && (
              <button
                onClick={() => navigate(`/dashboard/courses/${course.id}/player`)}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-lg font-bold text-white transition hover:opacity-90 shadow-lg cursor-pointer"
              >
                Continue Learning
              </button>
            )}

            <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-[#B8B8C7]">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#EC4899]" /> Lifetime access & Verified Certificate
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#7C3AED]" /> 25 Modules & 125 Interactive Lessons
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses Section */}
      {relatedCourses.length > 0 && (
        <div className="pt-8 border-t border-white/10 space-y-6">
          <h2 className="text-2xl font-bold text-white">Related Courses You Might Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedCourses.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/dashboard/courses/${rel.id}`)}
                className="rounded-2xl bg-[#201233] border border-white/10 p-5 shadow-lg hover:border-[#EC4899]/50 transition-all cursor-pointer space-y-3"
              >
                <img src={rel.imageUrl} alt={rel.title} className="h-40 w-full object-cover rounded-xl" />
                <h3 className="font-bold text-white text-base line-clamp-1">{rel.title}</h3>
                <p className="text-xs text-[#B8B8C7]">{rel.level} • {rel.duration}</p>
                <p className="text-sm font-bold text-[#EC4899]">₹{Number(rel.price).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Video Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[#201233] rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">{course.title} - Course Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 font-bold text-xs hover:bg-red-900/60"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Course Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}