import { Helmet } from 'react-helmet-async'
import { useContent } from '../context/ContentContext.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import Projects from '../components/Projects.jsx'
import Testimonials from '../components/Testimonials.jsx'
import BlogPreview from '../components/BlogPreview.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  const { content } = useContent()
  const { settings, skills, projects, testimonials, blogs } = content
  const publishedBlogs = blogs.filter((b) => b.published)

  return (
    <>
      <Helmet>
        <title>{settings.name} — {settings.title}</title>
        <meta name="description" content={settings.tagline} />
      </Helmet>

      <Navbar settings={settings} />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <BlogPreview posts={publishedBlogs} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
      <WhatsAppButton url={settings.whatsapp_url} />
    </>
  )
}
