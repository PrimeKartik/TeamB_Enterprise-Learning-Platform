import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext'
import GoogleSignInButton from '../components/GoogleSignInButton'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user } = await login({ email, password }, rememberMe)
      navigate(user?.role === 'ADMIN' ? '/admin' : '/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
      <form onSubmit={handleSubmit} className="card-glow rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-heading text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-muted text-sm mb-6">Log in to continue learning</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-base/60 border border-soft rounded-lg pl-9 pr-9 py-2 text-heading text-sm outline-none focus:border-primary transition"
            placeholder="••••••••"
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

        <div className="flex items-center justify-between mb-6 mt-3">
          <label className="flex items-center gap-2 text-muted text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-soft-20 bg-base/60 accent-primary"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary text-xs font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-full bg-brand-gradient text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-tint-10" />
          <span className="text-muted text-xs">or</span>
          <div className="h-px flex-1 bg-tint-10" />
        </div>

        <GoogleSignInButton onError={setError} />

        <p className="text-muted text-xs text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium">Sign Up</Link>
        </p>
      </form>
  )
}
