import { Star, Quote } from 'lucide-react'
import Reveal from '../Reveal'

const testimonials = [
  {
    name: 'Ananya Rao',
    role: 'Full Stack Developer at a fintech startup',
    quote: 'The Full Stack Development course took me from barely knowing HTML to shipping real features at my job in twelve weeks.',
    rating: 5,
  },
  {
    name: 'Vikram Shah',
    role: 'Frontend Engineer',
    quote: 'React.js Essentials explained hooks better than any tutorial I\'d tried before. The pacing was exactly right for a beginner.',
    rating: 5,
  },
  {
    name: 'Priya Menon',
    role: 'Backend Developer',
    quote: 'Clear explanations, practical assignments, and instructors who actually reply to questions. Worth every rupee.',
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <Reveal>
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-primary text-xs font-semibold tracking-widest mb-2">TESTIMONIALS</p>
          <h2 className="text-heading text-2xl md:text-3xl font-bold">What Our Learners Say</h2>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <div className="card-glow rounded-xl p-6 h-full flex flex-col">
              <Quote size={22} className="text-primary/50 mb-3" />
              <p className="text-body text-sm leading-relaxed mb-4 flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={13} fill={idx < t.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-heading text-xs font-semibold">{t.name}</p>
                  <p className="text-muted text-[10px]">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
