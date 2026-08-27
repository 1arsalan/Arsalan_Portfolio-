import SectionHeading from './SectionHeading.jsx'

export default function About({ settings }) {
  if (!settings) return null
  const paragraphs = (settings.bio || '').split('\n\n').filter(Boolean)

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading eyebrow="About" title="Engineering with intent" />
      <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        <div className="glass rounded-2xl p-2">
          <img src={settings.profile_image} alt={settings.name}
               className="rounded-xl w-full aspect-square object-cover" />
        </div>
        <div>
          {paragraphs.map((p, i) => (
            <p key={i} className="text-text-secondary leading-relaxed mb-4">{p}</p>
          ))}
          {settings.approach && (
            <div className="mt-8 glass rounded-xl p-6 border-l-2 border-cyan">
              <h3 className="font-display font-semibold text-sm tracking-wide uppercase text-cyan mb-2">
                My Approach
              </h3>
              <p className="text-text-secondary leading-relaxed">{settings.approach}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
