import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'

function SkillIcon({ name, iconSets }) {
  if (!iconSets) {
    // Icon libraries haven't finished loading yet — render an empty slot
    // the same size as an icon so the layout doesn't jump once they arrive.
    return <span className="inline-block w-[18px] h-[18px]" />
  }
  const Icon = iconSets[name] || iconSets.FaCode
  return Icon ? <Icon size={18} /> : <span className="inline-block w-[18px] h-[18px]" />
}

export default function Skills({ skills }) {
  const [iconSets, setIconSets] = useState(null)

  useEffect(() => {
    // The full Font Awesome + Simple Icons sets are large (several MB), and
    // which icon each skill uses is admin-editable, so we can't know ahead
    // of time which handful to import statically. Loading them dynamically,
    // only once this section actually mounts, keeps that weight out of the
    // initial page bundle entirely instead of blocking first paint.
    let cancelled = false
    Promise.all([import('react-icons/fa'), import('react-icons/si')]).then(([fa, si]) => {
      if (!cancelled) setIconSets({ ...fa, ...si })
    })
    return () => { cancelled = true }
  }, [])

  if (!skills || skills.length === 0) return null

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading eyebrow="Skills" title="What I build with"
        subtitle="A toolkit shaped by shipping real products end to end — from database schema to pixel." />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="glass rounded-2xl p-6">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-text-secondary mb-5">
              {category}
            </h3>
            <div className="space-y-5">
              {items.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-cyan"><SkillIcon name={skill.icon_name} iconSets={iconSets} /></span>
                      {skill.name}
                    </span>
                    <span className="text-xs font-display text-text-secondary tabular-nums">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan to-purple"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
