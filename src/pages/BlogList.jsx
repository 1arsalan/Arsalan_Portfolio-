import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function BlogList() {
  const { content } = useContent()
  const posts = content.blogs.filter((b) => b.published)

  return (
    <>
      <Navbar settings={content.settings} />
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-4xl font-semibold mb-2">Blog</h1>
        <p className="text-text-secondary mb-12">Notes on building AI-powered and healthcare software.</p>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts published yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="glass rounded-2xl overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-surface-hi to-surface overflow-hidden">
                  {post.cover_image && (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold mb-2 group-hover:text-cyan transition-colors">{post.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer settings={content.settings} />
    </>
  )
}
