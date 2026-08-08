const levels = [
  { label: 'Too short', color: 'bg-red-500', width: '25%' },
  { label: 'Weak', color: 'bg-orange-500', width: '50%' },
  { label: 'Good', color: 'bg-amber-400', width: '75%' },
  { label: 'Strong', color: 'bg-emerald-500', width: '100%' },
]

function scorePassword(password) {
  if (!password || password.length < 6) return 0
  let score = 1
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return Math.min(score, 3)
}

export default function PasswordStrength({ password }) {
  if (!password) return null
  const level = levels[scorePassword(password)]

  return (
    <div className="mb-4 -mt-2">
      <div className="h-1.5 bg-tint-10 rounded-full overflow-hidden">
        <div
          className={`h-full ${level.color} transition-all duration-300`}
          style={{ width: level.width }}
        />
      </div>
      <p className="text-[10px] text-muted mt-1">{level.label}</p>
    </div>
  )
}
