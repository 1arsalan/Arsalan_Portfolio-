import { FaQuoteLeft } from 'react-icons/fa'
import SectionHeading from './SectionHeading.jsx'

export default function Testimonials({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading eyebrow="Testimonials" title="What clients say" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="glass rounded-2xl p-6 flex flex-col">
            <FaQuoteLeft className="text-cyan/40 mb-4" size={22} />
            <p className="text-text-secondary text-sm leading-relaxed flex-1">{t.message}</p>
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
              {t.image_url ? (
                <img src={t.image_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan/30 to-purple/30 flex items-center justify-center font-display text-sm">
                  {t.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-text-secondary">
                  {[t.role, t.company].filter(Boolean).join(' · ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
