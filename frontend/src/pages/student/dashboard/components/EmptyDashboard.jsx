import { BookOpen, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyDashboard() {
  return (
    <div className="card-glow rounded-2xl p-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <BookOpen
          size={40}
          className="text-primary"
        />
      </div>

      <h2 className="mt-6 text-heading text-3xl font-bold">
        Welcome to SkillSphere!
      </h2>

      <p className="mt-3 text-muted max-w-xl mx-auto">
        You haven't enrolled in any courses yet.
        Start exploring our catalog and begin your learning journey.
      </p>

      <Link
        to="/dashboard/courses"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-white font-semibold hover:opacity-90 transition"
      >
        <Search size={18} />
        Browse Courses
      </Link>
    </div>
  )
}