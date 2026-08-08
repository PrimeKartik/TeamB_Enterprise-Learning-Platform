import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, Users, Check } from 'lucide-react'
import { courseApi } from '../../api/courseApi'
import { enrollmentApi } from '../../api/enrollmentApi'
import { getCurrentUser } from '../../utils/auth'
import Reveal from '../Reveal'
import { toast } from "react-toastify";

// Fallback data shown until/unless the backend responds (or if it's offline)
const fallbackCourses = [
  { id: 1, badge: 'BESTSELLER', badgeColor: 'bg-orange-500', title: 'Full Stack Development', level: 'Beginner', duration: '12 Weeks', rating: 4.8, reviews: '1.2K', price: 4999, image: '/images/full-stack-development.svg' },
  { id: 2, badge: 'POPULAR', badgeColor: 'bg-blue-500', title: 'React.js Essentials', level: 'Beginner', duration: '6 Weeks', rating: 4.7, reviews: '836', price: 3499, image: '/images/reactjs-essentials.svg' },
  { id: 3, badge: 'TRENDING', badgeColor: 'bg-emerald-500', title: 'Java Programming', level: 'Intermediate', duration: '8 Weeks', rating: 4.6, reviews: '1.1K', price: 3499, image: '/images/java-programming.svg' },
  { id: 4, badge: 'NEW', badgeColor: 'bg-fuchsia-500', title: 'Database Management', level: 'Intermediate', duration: '5 Weeks', rating: 4.5, reviews: '654', price: 2499, image: '/images/database-management.svg' },
]

const imageByTitle = {
  'Full Stack Development': '/images/full-stack-development.svg',
  'React.js Essentials': '/images/reactjs-essentials.svg',
  'Java Programming': '/images/java-programming.svg',
  'Database Management': '/images/database-management.svg',
}
const fallbackImage = '/images/full-stack-development.svg'

function resolveImage(course) {
  return course.image || imageByTitle[course.title] || fallbackImage
}

export default function Courses() {
  const [courses, setCourses] = useState(fallbackCourses)
  const [enrolledIds, setEnrolledIds] = useState(new Set())
  const [enrollingId, setEnrollingId] = useState(null)
  const navigate = useNavigate()
  const user = getCurrentUser()

  useEffect(() => {
    courseApi
      .getAll()
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length) setCourses(res.data.slice(0, 4))
      })
      .catch(() => {
        // Backend not reachable yet — keep showing fallback data
      })

    if (user) {
      enrollmentApi
        .getMine()
        .then((res) => setEnrolledIds(new Set(res.data.map((c) => c.course?.id ?? c.courseId))))
        .catch(() => { })
    }
  }, [])

  const handleEnroll = async (course) => {
    if (!user) {
      toast.info("🔒 Login Required");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }
    setEnrollingId(course.id)
    try {
      await enrollmentApi.enroll(course.id)
      setEnrolledIds((prev) => new Set(prev).add(course.id))
    } catch (err) {
      if (err.response?.status === 409) {
        setEnrolledIds((prev) => new Set(prev).add(course.id))
      }
    } finally {
      setEnrollingId(null)
    }
  }

  return (
    <section id="courses" className="max-w-7xl mx-auto px-6 py-14 scroll-mt-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-primary text-xs font-semibold tracking-widest mb-2">POPULAR COURSES</p>
          <h2 className="text-heading text-2xl md:text-3xl font-bold">Explore Our Top Courses</h2>
        </div>
        <button onClick={() => {
          if (!user) {
            toast.info("🔒 Login Required");
            setTimeout(() => {
              navigate("/login");
            }, 1500);
            return;
          }
          navigate("/courses");
        }}
          className="hidden sm:block px-5 py-2 rounded-full border border-soft-20 text-heading text-sm hover-tint-10 transition"
        >
          View All Courses
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {courses.map((c, i) => {
          const isEnrolled = enrolledIds.has(c.id)
          return (
            <Reveal key={c.id} delay={i * 80}>
              <div className="card-glow rounded-xl overflow-hidden flex flex-col h-full">
                <div className="h-32 relative">
                  <img src={resolveImage(c)} alt={c.title} className="w-full h-full object-cover" loading="lazy" />
                  {c.badge && (
                    <span className={`absolute top-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded ${c.badgeColor || 'bg-primary'}`}>
                      {c.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-heading text-sm font-semibold mb-2">{c.title}</p>
                  <div className="flex items-center gap-3 text-muted text-[11px] mb-2">
                    <span className="flex items-center gap-1"><Users size={12} /> {c.level}</span>
                    <span>{c.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 mb-3">
                    <Star size={12} fill="currentColor" /> {c.rating} ({c.reviews})
                  </div>
                  <p className="text-heading font-bold mb-3">₹{Number(c.price).toLocaleString('en-IN')}</p>

                  <button
                    onClick={() => handleEnroll(c)}
                    disabled={isEnrolled || enrollingId === c.id}
                    className={`mt-auto w-full py-2 rounded-full text-xs font-semibold transition flex items-center justify-center gap-1 ${isEnrolled
                        ? 'bg-emerald-500/15 text-emerald-400 cursor-default'
                        : 'bg-brand-gradient text-white hover:opacity-90 disabled:opacity-60'
                      }`}
                  >
                    {isEnrolled ? (<><Check size={13} /> Enrolled</>) : enrollingId === c.id ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
