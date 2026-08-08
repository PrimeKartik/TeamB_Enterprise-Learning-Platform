import { GraduationCap, Star } from 'lucide-react'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center relative px-6 py-12 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary2/10 rounded-full blur-3xl pointer-events-none" />
      {children}
    </div>
  )
}
