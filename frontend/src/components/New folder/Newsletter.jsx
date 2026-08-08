import { useState } from 'react'
import { Send, Check } from 'lucide-react'
import { newsletterApi } from '../../api/newsletterApi'
import Reveal from '../Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      await newsletterApi.subscribe(email)
      setSubmitted(true)
    } catch {
      setError('Could not subscribe right now — please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <Reveal>
        <div className="card-glow rounded-2xl px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-heading text-xl md:text-2xl font-bold mb-2 relative">
            Get new courses in your inbox
          </h2>
          <p className="text-muted text-sm mb-6 relative">
            One email a month. New courses, discounts, and learning tips. No spam.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium relative">
              <Check size={18} /> You're subscribed — thanks for joining!
            </div>
          ) : (
            <>
              {error && <p className="text-red-400 text-xs mb-3 relative">{error}</p>}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 bg-base/60 border border-soft rounded-full px-4 py-2.5 text-heading text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-gradient text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'} <Send size={14} />
                </button>
              </form>
            </>
          )}
        </div>
      </Reveal>
    </section>
  )
}
