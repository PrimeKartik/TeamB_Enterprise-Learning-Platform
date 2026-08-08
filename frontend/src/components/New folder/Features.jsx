import { Users, Clock, TrendingUp, Award } from 'lucide-react'
import Reveal from '../Reveal'

const items = [
  { icon: Users, title: 'Expert Instructors', desc: 'Learn from industry experts and professionals' },
  { icon: Clock, title: 'Flexible Learning', desc: 'Learn at your own pace, anytime, anywhere' },
  { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your progress with detailed analytics' },
  { icon: Award, title: 'Get Certified', desc: 'Earn certificates and boost your career' },
]

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-10 scroll-mt-24">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 80}>
            <div className="card-glow rounded-xl p-5 flex gap-3 h-full transition-transform hover:-translate-y-1">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-brand-gradient flex items-center justify-center">
                <Icon size={16} className="text-white" />
              </div>
              <div>
                <p className="text-heading text-sm font-semibold">{title}</p>
                <p className="text-muted text-xs mt-1 leading-snug">{desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
