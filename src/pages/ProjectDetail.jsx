import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { useContent } from '../context/ContentContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function ProjectDetail() {
  const { id } = useParams()
  const { content } = useContent()
  const project = content.projects.find((p) => p.id === Number(id))

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">Project not found.</p>
        <Link to="/" className="text-cyan hover:underline">Back home</Link>
      </div>
    )
  }

  return (
    <>
      <Navbar settings={content.settings} />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-cyan mb-8 transition-colors">
          <FaArrowLeft size={12} /> Back to projects
        </Link>

        {project.image_url && (
          <img src={project.image_url} alt={project.title} className="rounded-2xl w-full aspect-video object-cover mb-8" />
        )}

        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">{project.title}</h1>
        <p className="text-text-secondary text-lg mb-6">{project.description}</p>

        {project.tech_stack && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech_stack.split(',').map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-text-secondary">{t.trim()}</span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mb-10">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan text-bg text-sm font-semibold hover:shadow-glow transition-shadow">
              <FaExternalLinkAlt size={13} /> Live Demo
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-sm font-semibold hover:border-cyan/50 hover:text-cyan transition-colors">
              <FaGithub size={15} /> GitHub
            </a>
          )}
        </div>

        <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
          <ReactMarkdown>{project.long_description}</ReactMarkdown>
        </article>
      </main>
      <Footer settings={content.settings} />
    </>
  )
}
