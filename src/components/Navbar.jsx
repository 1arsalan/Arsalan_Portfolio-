import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

// Leading "/" before the "#" means these always work correctly no matter
// which page you're currently on — the browser goes to the homepage first,
// then scrolls to that section. A bare "#about" only works while already
// on the homepage, which was silently breaking these links on every other page.
const LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const displayName = settings?.name || 'Arsalan Ali Sargana'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled ? 'glass shadow-glow/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/#top" className="font-display font-semibold tracking-tight text-lg whitespace-nowrap">
          {displayName}
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
          {LINKS.map((l) =>
            l.isRoute ? (
              <Link key={l.href} to={l.href} className="hover:text-text-primary transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="hover:text-text-primary transition-colors">
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {settings?.github_url && (
            <a href={settings.github_url} target="_blank" rel="noreferrer" aria-label="GitHub"
               className="text-text-secondary hover:text-cyan transition-colors">
              <FaGithub size={18} />
            </a>
          )}
          {settings?.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn"
               className="text-text-secondary hover:text-cyan transition-colors">
              <FaLinkedin size={18} />
            </a>
          )}
        </div>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-text-primary mb-1.5" />
          <div className="w-6 h-0.5 bg-text-primary" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass px-6 pb-6 flex flex-col gap-4 text-text-secondary">
          {LINKS.map((l) =>
            l.isRoute ? (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
                    className="hover:text-text-primary transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="hover:text-text-primary transition-colors">
                {l.label}
              </a>
            )
          )}
        </div>
      )}
    </header>
  )
}
