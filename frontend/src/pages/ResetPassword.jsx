import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react'
import { authApi } from '../api/authApi'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [validating, setValidating] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setValidating(false)
        return
      }
      try {
        await authApi.verifyResetToken(token)
        setTokenValid(true)
      } catch (err) {
        setTokenValid(false)
      } finally {
        setValidating(false)
      }
    }
    verifyToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await authApi.resetPassword(token, password)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. The link might have expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="card-glow rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-heading text-2xl font-bold mb-1">Set New Password</h1>
        
        {validating ? (
          <div className="text-center py-10 text-muted">
            Validating reset link...
          </div>
        ) : !tokenValid ? (
          <div className="flex flex-col items-center justify-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-heading font-semibold mb-2">Invalid or Expired Link</h3>
            <p className="text-muted text-sm mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link 
              to="/forgot-password"
              className="w-full py-2.5 rounded-full bg-brand-gradient text-white font-semibold text-sm hover:opacity-90 transition"
            >
              Request New Link
            </Link>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center justify-center text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-heading font-semibold mb-2">Password Reset Successful</h3>
            <p className="text-muted text-sm mb-6">
              Your password has been successfully updated. Redirecting to login...
            </p>
            <Link 
              to="/login"
              className="text-primary font-medium text-sm hover:underline"
            >
              Click here if not redirected
            </Link>
          </div>
        ) : (
          <>
            <p className="text-muted text-sm mb-6">Please enter your new password below.</p>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2 mb-4">
                  {error}
                </div>
              )}

              <label className="text-muted text-xs">New Password</label>
              <div className="relative mb-4 mt-1">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-base/60 border border-soft rounded-lg pl-9 pr-3 py-2 text-heading text-sm outline-none focus:border-primary transition"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <label className="text-muted text-xs">Confirm New Password</label>
              <div className="relative mb-6 mt-1">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-base/60 border border-soft rounded-lg pl-9 pr-3 py-2 text-heading text-sm outline-none focus:border-primary transition"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-full bg-brand-gradient text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
  )
}
