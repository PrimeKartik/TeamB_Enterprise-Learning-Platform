import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react'
import { useAuthContext } from '../../context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login({ email, password })
      if (res?.user?.role === 'ADMIN') {
        navigate('/admin')
      } else {
        setError('Access denied. This account does not have Admin privileges.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glow background shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-panel border border-soft rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-heading">Admin Portal</h1>
            <p className="text-xs text-muted">SkillSphere System Administration</p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-muted mb-1.5 font-medium">Admin Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-base/80 border border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition"
                placeholder="admin@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted mb-1.5 font-medium">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-base/80 border border-soft rounded-xl pl-10 pr-4 py-2.5 text-sm text-heading outline-none focus:border-primary transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-gradient text-white font-semibold text-sm hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating Admin...' : (
              <>
                Enter Admin Control Panel <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="text-xs text-muted mt-6 text-center">
        SkillSphere Security Protocol · Direct Admin Route Access Only
      </p>
    </div>
  )
}
