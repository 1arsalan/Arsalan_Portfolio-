import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'settings', label: 'Settings' },
  { id: 'skills', label: 'Skills CMS' },
  { id: 'projects', label: 'Projects CMS' },
  { id: 'blogs', label: 'Blogs CMS' },
  { id: 'testimonials', label: 'Testimonials CMS' },
  { id: 'publish', label: 'Publish Changes' },
]

export default function AdminLayout({ active, onChange, children }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-surface/50 p-4 md:p-6">
        <p className="font-display font-semibold text-lg mb-6 px-2">
          Admin<span className="text-cyan">.</span>
        </p>
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`text-left text-sm px-3 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                active === tab.id
                  ? 'bg-cyan/10 text-cyan font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-left text-sm px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors mt-2"
          >
            <FaSignOutAlt size={13} /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-5xl">{children}</main>
    </div>
  )
}
