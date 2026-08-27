import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { FaArrowLeft } from 'react-icons/fa'
import { useContent } from '../context/ContentContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function BlogDetail() {
  const { slug } = useParams()
  const { content } = useContent()
  const post = content.blogs.find((b) => b.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">Post not found.</p>
        <Link to="/blog" className="text-cyan hover:underline">Back to blog</Link>
      </div>
    )
  }

  return (
    <>
      <Navbar settings={content.settings} />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-cyan mb-8 transition-colors">
          <FaArrowLeft size={12} /> Back to blog
        </Link>

        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} className="rounded-2xl w-full aspect-video object-cover mb-8" />
        )}

        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{post.title}</h1>

        <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </main>
      <Footer settings={content.settings} />
    </>
  )
}
