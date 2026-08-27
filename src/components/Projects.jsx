import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import SectionHeading from './SectionHeading.jsx'

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) return null

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeading eyebrow="Projects" title="Selected work"
        subtitle="Production systems built for real clients — trading platforms, healthcare tools, and AI-driven SaaS." />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass rounded-2xl overflow-hidden flex flex-col group"
          >
            <div className="aspect-video bg-gradient-to-br from-surface-hi to-surface flex items-center justify-center overflow-hidden">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display text-4xl text-white/10 group-hover:text-cyan/20 transition-colors">
                  {project.title.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              {project.featured && (
                <span className="text-[10px] font-display uppercase tracking-widest text-cyan mb-2">Featured</span>
              )}
              <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-1">{project.description}</p>

              {project.tech_stack && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech_stack.split(',').map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-text-secondary">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 mt-5 pt-5 border-t border-white/5">
                <Link to={`/projects/${project.id}`} className="text-sm font-semibold text-cyan hover:underline">
                  View Details
                </Link>
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer"
                     className="text-text-secondary hover:text-cyan transition-colors" aria-label="Live demo">
                    <FaExternalLinkAlt size={14} />
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer"
                     className="text-text-secondary hover:text-cyan transition-colors" aria-label="GitHub repo">
                    <FaGithub size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
