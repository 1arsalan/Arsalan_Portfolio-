import { useContent } from '../../context/ContentContext.jsx'

function StatCard({ label, value }) {
  return (
    <div className="glass rounded-xl p-6">
      <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">{label}</p>
      <p className="font-display text-3xl font-semibold gradient-text">{value}</p>
    </div>
  )
}

export default function Overview() {
  const { content, hasDraft } = useContent()

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Overview</h1>

      {hasDraft && (
        <div className="glass rounded-xl p-4 mb-6 border-l-2 border-cyan">
          <p className="text-sm text-text-secondary">
            You have unpublished changes in this browser. Visit <b>Publish Changes</b> to make them
            visible to site visitors.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Projects" value={content.projects.length} />
        <StatCard label="Blog Posts" value={content.blogs.length} />
        <StatCard label="Skills" value={content.skills.length} />
        <StatCard label="Testimonials" value={content.testimonials.length} />
      </div>
    </div>
  )
}
