import { GraduationCap, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AuthNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-base/90 backdrop-blur-md border-b border-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-brand-gradient flex items-center justify-center">
            <GraduationCap size={20} className="text-white" />
          </div>

          <div>
            <p className="text-heading font-bold text-sm">
              SkillSphere
            </p>
            <p className="text-muted text-[10px]">
              Learning Nexus
            </p>
          </div>
        </Link>

        {/* Back */}
        <Link
          to="/"
          className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

      </div>
    </nav>
  )
}