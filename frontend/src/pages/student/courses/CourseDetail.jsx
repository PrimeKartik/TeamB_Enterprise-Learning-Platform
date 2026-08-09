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

      {/* New Hero Banner (Split Layout) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#201233] border border-white/10 shadow-xl p-8 lg:p-12 text-white flex flex-col-reverse lg:flex-row gap-12 items-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#7C3AED]/20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-[#EC4899]/10 blur-[100px] rounded-full"></div>
        </div>

        {/* Left Content */}
        <div className="flex-1 space-y-6 z-10 w-full">
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

          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">{course.title}</h1>

          <p className="text-lg leading-relaxed text-[#B8B8C7]">{course.description}</p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="font-semibold text-white">{course.rating}</span>
              <span className="text-sm text-[#B8B8C7]">({course.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-[#EC4899]" size={20} />
              <span className="font-semibold text-white">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-[#7C3AED]" size={20} />
              <span className="font-semibold text-white">{course.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="text-blue-400" size={20} />
              <span className="font-semibold text-white">{course.totalLessons} Lessons</span>
            </div>
          </div>
          
          {/* Course Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['React', 'Web Dev', 'Full Stack', 'JavaScript', 'Spring Boot'].map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-black/30 border border-white/5 text-xs font-medium text-purple-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Image/Video Preview */}
        <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 z-10 relative">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-[#1A1028]">
            <img
              src={course.imageUrl || '/images/full-stack-development.svg'}
              alt={course.title}
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/images/full-stack-development.svg'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setShowPreviewModal(true)}
                className="flex flex-col items-center gap-3 hover:scale-110 transition-transform cursor-pointer"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#EC4899] text-white shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                  <Play size={24} className="fill-white translate-x-0.5" />
                </div>
                <span className="text-sm font-bold text-white tracking-wide shadow-black drop-shadow-md">Watch Preview</span>
              </button>
            </div>
          </div>
          
          {/* Decorative floating elements around the video */}
          <div className="absolute -top-4 -right-4 bg-[#7C3AED] w-20 h-20 rounded-full blur-[40px] -z-10"></div>
          <div className="absolute -bottom-4 -left-4 bg-[#EC4899] w-20 h-20 rounded-full blur-[40px] -z-10"></div>
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