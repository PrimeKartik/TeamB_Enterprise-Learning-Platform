import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2 } from 'lucide-react'
import { authApi } from '../api/authApi'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="card-glow rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-heading text-2xl font-bold mb-1">Reset Password</h1>
        <p className="text-muted text-sm mb-6">Enter your email to receive a reset link</p>

        {success ? (
          <div className="flex flex-col items-center justify-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-heading font-semibold mb-2">Check your email</h3>
            <p className="text-muted text-sm mb-6">
              If an account exists for <span className="text-heading font-medium">{email}</span>, 
              we've sent a password reset link.
            </p>
            <Link 
              to="/login"
              className="w-full py-2.5 rounded-full bg-panel border border-soft text-heading font-semibold text-sm hover:bg-tint-5 transition"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2 mb-4">
                {error}
              </div>
            )}

            <label className="text-muted text-xs">Email</label>
            <div className="relative mb-6 mt-1">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-base/60 border border-soft rounded-lg pl-9 pr-3 py-2 text-heading text-sm outline-none focus:border-primary transition"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full bg-brand-gradient text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>

            <p className="text-muted text-xs text-center mt-6">
              Remember your password?{' '}
              <Link to="/login" className="text-primary font-medium">Log In</Link>
            </p>
          </form>
        )}
      </div>
  )
}
