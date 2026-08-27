import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <span className="font-display text-6xl text-white/10">404</span>
      <p className="text-text-secondary">This page doesn't exist.</p>
      <Link to="/" className="text-cyan hover:underline">Back home</Link>
    </div>
  )
}
