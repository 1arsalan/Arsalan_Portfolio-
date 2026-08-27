import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

export default function Footer({ settings }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-text-secondary">
          &copy; {year} {settings?.name || 'Arsalan Ali Sargana'}. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-text-secondary">
          {settings?.github_url && (
            <a href={settings.github_url} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors" aria-label="GitHub"><FaGithub size={18} /></a>
          )}
          {settings?.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
          )}
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="hover:text-cyan transition-colors" aria-label="Email"><FaEnvelope size={18} /></a>
          )}
          {settings?.whatsapp_url && (
            <a href={settings.whatsapp_url} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
          )}
        </div>
      </div>
    </footer>
  )
}
