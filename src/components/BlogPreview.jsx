import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading.jsx'

export default function BlogPreview({ posts }) {
  if (!posts || posts.length === 0) return null

  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between">
        <SectionHeading eyebrow="Blog" title="Latest writing" />
        <Link to="/blog" className="text-sm font-semibold text-cyan hover:underline mb-12 hidden sm:block">
          View all posts →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="glass rounded-2xl overflow-hidden group">
            <div className="aspect-video bg-gradient-to-br from-surface-hi to-surface overflow-hidden">
              {post.cover_image && (
                <img src={post.cover_image} alt={post.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold mb-2 group-hover:text-cyan transition-colors">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
