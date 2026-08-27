import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaCheck } from 'react-icons/fa'
import { openFileValue } from '../utils/openFileValue.js'

export default function Hero({ settings }) {
  const [copied, setCopied] = useState(false)
  if (!settings) return null

  const handleCvClick = (e) => {
    e.preventDefault()
    openFileValue(settings.cv_file, `${settings.name || 'CV'}.pdf`)
  }

  const handleEmailClick = (e) => {
    // mailto: links silently do nothing on devices with no default mail
    // app configured (very common on mobile browsers). Always copy the
    // address to the clipboard too, so clicking never feels like a dead
    // button even when mailto itself doesn't open anything.
    if (settings.email && navigator.clipboard) {
      navigator.clipboard.writeText(settings.email).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => {})
    }
  }

  return (
    <section id="top" className="relative pt-40 pb-28 overflow-hidden bg-grid-fade">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full
                      bg-purple/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 text-xs font-display tracking-widest uppercase
                          text-cyan border border-cyan/30 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            {settings.name}
          </h1>
          <p className="mt-5 text-lg text-text-secondary max-w-xl">{settings.title}</p>
          <p className="mt-2 font-display text-cyan text-lg">{settings.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#projects"
               className="px-6 py-3 rounded-lg bg-cyan text-bg font-semibold text-sm hover:shadow-glow transition-shadow">
              View My Work
            </a>
            {settings.cv_file && (
              <button onClick={handleCvClick}
                 className="px-6 py-3 rounded-lg border border-white/15 text-sm font-semibold
                            hover:border-cyan/50 hover:text-cyan transition-colors">
                Download CV
              </button>
            )}
          </div>

          <div className="mt-9 flex items-center gap-5 text-text-secondary">
            {settings.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors" aria-label="LinkedIn"><FaLinkedin size={20} /></a>}
            {settings.github_url && <a href={settings.github_url} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors" aria-label="GitHub"><FaGithub size={20} /></a>}
            {settings.email && (
              <span className="relative">
                <a href={`mailto:${settings.email}`} onClick={handleEmailClick}
                   className="hover:text-cyan transition-colors" aria-label="Email">
                  {copied ? <FaCheck size={20} className="text-cyan" /> : <FaEnvelope size={20} />}
                </a>
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-surface-hi text-cyan
                                   px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </span>
            )}
            {settings.whatsapp_url && <a href={settings.whatsapp_url} target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan/20 to-purple/20 blur-2xl" />
          <div className="relative glass rounded-3xl p-3 w-72 sm:w-80">
            <img
              src={settings.profile_image}
              alt={settings.name}
              className="rounded-2xl w-full aspect-[4/5] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
