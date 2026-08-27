import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(email, password)
    setLoading(false)
    if (ok) {
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect email or password.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-grid-fade">
      <form onSubmit={onSubmit} className="glass rounded-2xl p-8 w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold mb-1">Admin Login</h1>
        <p className="text-text-secondary text-sm mb-6">Sign in to manage your portfolio.</p>

        <label className="text-xs text-text-secondary">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm mt-1 mb-4
                     focus:border-cyan/50 outline-none transition-colors"
        />

        <label className="text-xs text-text-secondary">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm mt-1 mb-6
                     focus:border-cyan/50 outline-none transition-colors"
        />

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-cyan text-bg font-semibold text-sm hover:shadow-glow transition-shadow disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
