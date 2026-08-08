import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { setActiveStorage } from '../utils/auth'

export default function GoogleSignInButton({ onError }) {
  const navigate = useNavigate()

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await authApi.google(credentialResponse.credential)

      // Google sign-in is treated as a "remembered" login (localStorage),
      // and — critically — clears out any leftover sessionStorage session
      // from a previous user so the app can't keep reading a stale token.
      const storage = setActiveStorage(true)
      storage.setItem('token', res.data.token)

      if (res.data.name || res.data.email) {
        storage.setItem('user', JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        }))
      }

      navigate('/dashboard')
    } catch (err) {
      onError?.(err.response?.data?.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="flex justify-center my-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => onError?.('Google sign-in failed')}
        theme="filled_black"
        shape="pill"
        text="continue_with"
      />
    </div>
  )
}
