import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const SESSION_KEY = 'portfolio_admin_session'

/**
 * IMPORTANT — read this before relying on it for anything sensitive:
 *
 * There is no backend in this build, so this "login" only checks the
 * email/password against values baked into the frontend bundle at build
 * time (VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD). Anyone who opens browser
 * dev tools and inspects the built JavaScript can find those values. This
 * is NOT real authentication — it's just enough to keep casual visitors
 * out of the admin UI. Don't use this pattern to protect anything that
 * actually needs to be secure.
 */
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'arsalanalisargana@gmail.com'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@123'

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  )

  const login = async (email, password) => {
    const emailMatches = email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase()
    if (emailMatches && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
