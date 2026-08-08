import { Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react'
import CountUp from './CountUp'
import Reveal from '../Reveal'

const stats = [
  { icon: Users, value: 10, suffix: 'K+', label: 'Happy Learners' },
  { icon: BookOpen, value: 200, suffix: '+', label: 'Expert Courses' },
  { icon: UserCheck, value: 50, suffix: '+', label: 'Expert Instructors' },
  { icon: TrendingUp, value: 95, suffix: '%', label: 'Success Rate' },
]

export default function Stats() {
  return (
    <section className="border-y border-soft bg-panel/40">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, suffix, label }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Icon size={20} className="text-primary" />
              <div>
                <p className="text-heading font-bold">
                  <CountUp value={value} suffix={suffix} />
                </p>
                <p className="text-muted text-xs">{label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
