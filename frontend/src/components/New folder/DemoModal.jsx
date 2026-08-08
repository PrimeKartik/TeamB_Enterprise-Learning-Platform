import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, BarChart3, BookOpen, Award, Users } from 'lucide-react'

const slides = [
  {
    icon: BookOpen,
    title: 'Browse expert-led courses',
    desc: 'Filter by level and topic to find the exact course you need — from beginner web dev to advanced databases.',
  },
  {
    icon: BarChart3,
    title: 'Track your progress',
    desc: 'Every lesson you complete updates your personal dashboard, so you always know exactly where you left off.',
  },
  {
    icon: Users,
    title: 'Learn with real instructors',
    desc: 'Ask questions, get feedback on projects, and learn from people who\'ve actually worked in the field.',
  },
  {
    icon: Award,
    title: 'Get certified',
    desc: 'Finish a course and earn a certificate you can add straight to your resume or LinkedIn profile.',
  },
]

export default function DemoModal({ onClose }) {
  const [step, setStep] = useState(0)
  const isLast = step === slides.length - 1
  const Slide = slides[step]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-panel border border-soft rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="absolute top-4 right-4 text-muted hover:text-heading transition"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5">
          <Slide.icon size={26} className="text-white" />
        </div>

        <p className="text-primary text-xs font-semibold tracking-widest mb-2">
          STEP {step + 1} OF {slides.length}
        </p>
        <h3 className="text-heading text-xl font-bold mb-2">{Slide.title}</h3>
        <p className="text-muted text-sm leading-relaxed mb-6">{Slide.desc}</p>

        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-primary' : 'w-1.5 bg-tint-10'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-full border border-soft-20 text-heading text-sm hover-tint-10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={15} /> Back
          </button>

          {isLast ? (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-full bg-brand-gradient text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => Math.min(slides.length - 1, s + 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-brand-gradient text-white text-sm font-semibold hover:opacity-90 transition"
            >
              Next <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
