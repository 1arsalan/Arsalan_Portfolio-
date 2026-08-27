import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import Overview from '../../components/admin/Overview.jsx'
import SettingsPanel from '../../components/admin/SettingsPanel.jsx'
import CrudManager from '../../components/admin/CrudManager.jsx'
import PublishPanel from '../../components/admin/PublishPanel.jsx'

const SKILL_FIELDS = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'e.g. Python' },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Backend' },
  { key: 'proficiency', label: 'Proficiency (%)', type: 'number' },
  { key: 'icon_name', label: 'Icon name (react-icons, e.g. FaPython, SiFastapi)', type: 'text' },
]
const SKILL_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'proficiency', label: 'Proficiency' },
]
const SKILL_EMPTY = { name: '', category: '', proficiency: 80, icon_name: 'FaCode' }

const PROJECT_FIELDS = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Short Description', type: 'textarea' },
  { key: 'long_description', label: 'Long Description (Markdown)', type: 'markdown' },
  { key: 'tech_stack', label: 'Tech Stack (comma-separated)', type: 'text', placeholder: 'React, FastAPI, PostgreSQL' },
  { key: 'live_url', label: 'Live Demo URL', type: 'text' },
  { key: 'github_url', label: 'GitHub URL', type: 'text' },
  { key: 'image_url', label: 'Cover Image', type: 'image' },
  { key: 'featured', label: 'Featured', type: 'checkbox' },
]
const PROJECT_COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'featured', label: 'Featured' },
]
const PROJECT_EMPTY = { title: '', description: '', long_description: '', tech_stack: '', live_url: '', github_url: '', image_url: '', featured: false }

const BLOG_FIELDS = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'slug', label: 'Slug', type: 'text', placeholder: 'my-post-slug' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { key: 'content', label: 'Content (Markdown)', type: 'markdown' },
  { key: 'cover_image', label: 'Cover Image', type: 'image' },
  { key: 'published', label: 'Published', type: 'checkbox' },
]
const BLOG_COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'published', label: 'Published' },
]
const BLOG_EMPTY = { title: '', slug: '', excerpt: '', content: '', cover_image: '', published: true }

const TESTIMONIAL_FIELDS = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'message', label: 'Message', type: 'textarea' },
  { key: 'image_url', label: 'Avatar', type: 'image' },
]
const TESTIMONIAL_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
]
const TESTIMONIAL_EMPTY = { name: '', role: '', company: '', message: '', image_url: '' }

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview')

  return (
    <AdminLayout active={tab} onChange={setTab}>
      {tab === 'overview' && <Overview />}
      {tab === 'settings' && <SettingsPanel />}
      {tab === 'skills' && (
        <CrudManager title="Skills CMS" collection="skills" fields={SKILL_FIELDS} columns={SKILL_COLUMNS} emptyItem={SKILL_EMPTY} />
      )}
      {tab === 'projects' && (
        <CrudManager title="Projects CMS" collection="projects" fields={PROJECT_FIELDS} columns={PROJECT_COLUMNS} emptyItem={PROJECT_EMPTY} />
      )}
      {tab === 'blogs' && (
        <CrudManager title="Blogs CMS" collection="blogs" fields={BLOG_FIELDS} columns={BLOG_COLUMNS} emptyItem={BLOG_EMPTY} />
      )}
      {tab === 'testimonials' && (
        <CrudManager title="Testimonials CMS" collection="testimonials" fields={TESTIMONIAL_FIELDS} columns={TESTIMONIAL_COLUMNS} emptyItem={TESTIMONIAL_EMPTY} />
      )}
      {tab === 'publish' && <PublishPanel />}
    </AdminLayout>
  )
}
