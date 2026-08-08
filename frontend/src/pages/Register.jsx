import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { authApi } from '../api/authApi'
import { useAuthContext } from '../context/AuthContext'
import GoogleSignInButton from '../components/GoogleSignInButton'
import PasswordStrength from '../components/New folder/PasswordStrength'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { applyAuthResponse } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!agreedToTerms) {
      setError('Please agree to the Terms & Conditions to continue')
      return
    }

    setLoading(true)
    try {
      const res = await authApi.register(name, email, password)
      applyAuthResponse(res.data, true)
      navigate('/complete-profile')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create account')
    } finally {
      setLoading(false)
    }
  }

  return (
      <form onSubmit={handleSubmit} className="card-glow rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-heading text-2xl font-bold mb-1">Create your account</h1>
        <p className="text-muted text-sm mb-6">Start learning without limits</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <label className="text-muted text-xs">Full Name</label>
        <div className="relative mb-4 mt-1">
          <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-base/60 border border-soft rounded-lg pl-9 pr-3 py-2 text-heading text-sm outline-none focus:border-primary transition"
            placeholder="Jane Doe"
          />
        </div>

        <label className="text-muted text-xs">Email</label>
        <div className="relative mb-4 mt-1">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-base/60 border border-soft rounded-lg pl-9 pr-3 py-2 text-heading text-sm outline-none focus:border-primary transition"
            placeholder="you@example.com"
          />
        </div>

        <label className="text-muted text-xs">Password</label>
        <div className="relative mb-2 mt-1">
          <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-base/60 border border-soft rounded-lg pl-9 pr-9 py-2 text-heading text-sm outline-none focus:border-primary transition"
            placeholder="At least 6 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-heading transition"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        <PasswordStrength password={password} />

        <label className="flex items-start gap-2 text-muted text-xs cursor-pointer mb-6 mt-3">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="rounded border-soft-20 bg-base/60 accent-primary mt-0.5"
          />
          <span>
            I agree to the <Link to="/privacy-policy#terms" target="_blank" className="text-primary hover:underline">Terms &amp; Conditions</Link>{' '}
            and <Link to="/privacy-policy" target="_blank" className="text-primary hover:underline">Privacy Policy</Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-full bg-brand-gradient text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-tint-10" />
          <span className="text-muted text-xs">or</span>
          <div className="h-px flex-1 bg-tint-10" />
        </div>

        <GoogleSignInButton onError={setError} />

        <p className="text-muted text-xs text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium">Log In</Link>
        </p>
      </form>
  )
}
