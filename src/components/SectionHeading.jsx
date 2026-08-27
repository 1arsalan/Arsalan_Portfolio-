import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12 max-w-2xl"
    >
      {eyebrow && (
        <span className="font-display text-xs tracking-[0.2em] uppercase text-cyan">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3 tracking-tight">{title}</h2>
      {subtitle && <p className="text-text-secondary mt-3 leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}
