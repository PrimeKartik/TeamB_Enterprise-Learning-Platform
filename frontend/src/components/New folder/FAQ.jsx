import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Reveal from '../Reveal'

const faqs = [
  {
    q: 'Do I get a certificate after finishing a course?',
    a: 'Yes. Every course on SkillSphere includes a completion certificate you can add to your resume or LinkedIn profile.',
  },
  {
    q: 'Can I learn at my own pace?',
    a: 'All courses are fully self-paced — there are no fixed class times. Progress is saved automatically as you go.',
  },
  {
    q: 'What if I\'m not satisfied with a course?',
    a: 'We offer a 7-day refund window from your purchase date, no questions asked.',
  },
  {
    q: 'Do you offer any free courses?',
    a: 'Select introductory courses are free to audit. Paid courses include instructor support and graded projects.',
  },
]

function FaqItem({ faq, isOpen, onClick }) {
  return (
    <div className="card-glow rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-heading text-sm font-medium">{faq.q}</span>
        <ChevronDown
          size={18}
          className={`text-primary shrink-0 ml-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="text-muted text-xs leading-relaxed px-5 pb-4">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-16">
      <Reveal>
        <div className="text-center mb-10">
          <p className="text-primary text-xs font-semibold tracking-widest mb-2">FAQ</p>
          <h2 className="text-heading text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
      </Reveal>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 60}>
            <FaqItem
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
