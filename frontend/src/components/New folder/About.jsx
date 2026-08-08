import { Target, Heart, Rocket } from 'lucide-react'
import Reveal from '../Reveal'

const points = [
  { icon: Target, title: 'Our Mission', desc: 'Make industry-grade skills accessible to anyone, anywhere, at a fair price.' },
  { icon: Heart, title: 'Our Values', desc: 'Learner-first design, honest progress tracking, and real mentorship — not just videos.' },
  { icon: Rocket, title: 'Our Impact', desc: 'Thousands of learners have gone from beginner to job-ready with our guided paths.' },
]

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary text-xs font-semibold tracking-widest mb-2">ABOUT US</p>
          <h2 className="text-heading text-2xl md:text-3xl font-bold mb-3">
            Built by educators. Backed by outcomes.
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            SkillSphere Learning Nexus was founded to close the gap between what
            classrooms teach and what the industry actually needs — through
            practical, project-based courses taught by people who've done the job.
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-5">
        {points.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 100}>
            <div className="card-glow rounded-xl p-6 h-full">
              <div className="w-10 h-10 rounded-lg bg-brand-gradient flex items-center justify-center mb-4">
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-heading font-semibold text-sm mb-2">{title}</p>
              <p className="text-muted text-xs leading-relaxed">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
