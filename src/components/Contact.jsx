import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import SectionHeading from './SectionHeading.jsx'

export default function Contact({ settings }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [status, setStatus] = useState(null) // 'success' | 'error' | 'mailto' | null

  const endpoint = settings?.formspree_endpoint

  const onSubmit = async (data) => {
    setStatus(null)

    // No backend in this build — messages go straight to Formspree (free,
    // no server needed) if the admin has set an endpoint in Settings.
    if (!endpoint) {
      const body = encodeURIComponent(`From: ${data.name} <${data.email}>\n\n${data.message}`)
      const mailtoUrl = `mailto:${settings?.email || ''}?subject=${encodeURIComponent(
        data.subject || 'Portfolio contact form'
      )}&body=${body}`

      // Also copy the message to the clipboard as a safety net — if the
      // visitor's device has no email app configured, mailto: silently
      // does nothing, and they'd otherwise have no way to actually reach out.
      if (navigator.clipboard) {
        navigator.clipboard.writeText(
          `To: ${settings?.email || ''}\nFrom: ${data.name} <${data.email}>\nSubject: ${data.subject || 'Portfolio contact form'}\n\n${data.message}`
        ).catch(() => {})
      }

      window.location.href = mailtoUrl
      setStatus('mailto')
      reset()
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(document.getElementById('contact-form')),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading eyebrow="Contact" title="Let's build something"
        subtitle="Have a project in mind, or an internship to offer? I'd love to hear from you." />

      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10">
        <div className="space-y-5">
          {settings?.email && (
            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <span className="text-cyan"><FaEnvelope size={18} /></span>
              <div>
                <p className="text-xs text-text-secondary">Email</p>
                <a href={`mailto:${settings.email}`} className="text-sm font-medium hover:text-cyan transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>
          )}
          {settings?.phone && (
            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <span className="text-cyan"><FaPhone size={16} /></span>
              <div>
                <p className="text-xs text-text-secondary">Phone</p>
                <p className="text-sm font-medium">{settings.phone}</p>
              </div>
            </div>
          )}
          {settings?.location && (
            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <span className="text-cyan"><FaMapMarkerAlt size={18} /></span>
              <div>
                <p className="text-xs text-text-secondary">Location</p>
                <p className="text-sm font-medium">{settings.location}</p>
              </div>
            </div>
          )}
        </div>

        <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="Your name"
                className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm
                           focus:border-cyan/50 outline-none transition-colors"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="Your email"
                className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm
                           focus:border-cyan/50 outline-none transition-colors"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <input
            {...register('subject')}
            placeholder="Subject"
            className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm
                       focus:border-cyan/50 outline-none transition-colors"
          />

          <div>
            <textarea
              {...register('message', { required: 'Message is required' })}
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm
                         focus:border-cyan/50 outline-none transition-colors resize-none"
            />
            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-cyan text-bg font-semibold text-sm
                       hover:shadow-glow transition-shadow disabled:opacity-60"
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-cyan text-center">Message sent — I'll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400 text-center">Something went wrong. Please try again.</p>
          )}
          {status === 'mailto' && (
            <p className="text-sm text-cyan text-center">
              Your email app should be opening now — the message was also copied, just in case.
            </p>
          )}
          {!endpoint && !status && (
            <p className="text-xs text-text-secondary text-center">
              This will open your email app to send the message.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
