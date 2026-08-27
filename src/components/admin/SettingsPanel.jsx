import { useEffect, useState } from 'react'
import { useContent } from '../../context/ContentContext.jsx'
import { fileToDataUrl } from '../../utils/fileToDataUrl.js'

const FIELDS = [
  { key: 'name', label: 'Full Name' },
  { key: 'title', label: 'Title' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'linkedin_url', label: 'LinkedIn URL' },
  { key: 'github_url', label: 'GitHub URL' },
  { key: 'whatsapp_url', label: 'WhatsApp URL' },
  { key: 'formspree_endpoint', label: 'Formspree Endpoint (contact form — see note below)' },
]

export default function SettingsPanel() {
  const { content, updateSettings } = useContent()
  const [draft, setDraft] = useState(content.settings)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  // If the underlying content changes from elsewhere (e.g. an Import on
  // the Publish tab) while this panel is open, pick that up instead of
  // silently overwriting it with a stale draft.
  useEffect(() => {
    setDraft(content.settings)
  }, [content.settings])

  const handleChange = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleUpload = async (key, file) => {
    setUploading(true)
    setError('')
    try {
      const dataUrl = await fileToDataUrl(file)
      handleChange(key, dataUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = () => {
    updateSettings(draft)
    setSaved(true)
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Settings</h1>

      {!draft.formspree_endpoint && (
        <div className="glass rounded-xl p-5 mb-6 border-l-4 border-yellow-400 max-w-2xl">
          <h2 className="font-display font-semibold text-sm text-yellow-400 mb-2">
            ⚠ Contact form messages are NOT reaching your email
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            This site has no backend, so without a Formspree endpoint set below, the contact form
            only opens the <i>visitor's</i> email app — if they don't have one set up (common on
            phones and browsers), you never receive anything. This takes 2 minutes to fix:
          </p>
          <ol className="text-sm text-text-secondary list-decimal list-inside space-y-1 mb-3">
            <li>Go to <a href="https://formspree.io" target="_blank" rel="noreferrer" className="text-cyan hover:underline">formspree.io</a> and create a free account</li>
            <li>Create a new form, pointing to your email address</li>
            <li>Copy the endpoint URL it gives you (looks like <code className="bg-white/5 px-1 rounded">https://formspree.io/f/xxxxxxx</code>)</li>
            <li>Paste it into "Formspree Endpoint" below, then click Save Settings, then Publish Changes</li>
          </ol>
        </div>
      )}

      <div className="glass rounded-xl p-6 space-y-5 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-5">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-text-secondary block mb-1.5">{f.label}</label>
              <input
                value={draft[f.key] ?? ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-cyan/50 outline-none"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-text-secondary -mt-2">
          Leave Formspree Endpoint empty and the contact form will open the visitor's email app instead.
          Get a free endpoint at <span className="text-cyan">formspree.io</span>.
        </p>

        <div>
          <label className="text-xs text-text-secondary block mb-1.5">Bio (blank line between paragraphs)</label>
          <textarea
            value={draft.bio ?? ''}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={6}
            className="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-cyan/50 outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1.5">My Approach</label>
          <textarea
            value={draft.approach ?? ''}
            onChange={(e) => handleChange('approach', e.target.value)}
            rows={3}
            className="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-cyan/50 outline-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">Profile Photo</label>
            {draft.profile_image && (
              <img src={draft.profile_image} alt="" className="w-20 h-20 object-cover rounded-lg mb-2" />
            )}
            <input type="file" accept="image/*" className="text-xs text-text-secondary"
              onChange={(e) => e.target.files[0] && handleUpload('profile_image', e.target.files[0])} />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">CV (PDF)</label>
            {draft.cv_file && (
              <a href={draft.cv_file} target="_blank" rel="noreferrer" className="text-xs text-cyan block mb-2">
                View current CV
              </a>
            )}
            <input type="file" accept="application/pdf" className="text-xs text-text-secondary"
              onChange={(e) => e.target.files[0] && handleUpload('cv_file', e.target.files[0])} />
          </div>
        </div>

        {uploading && <p className="text-xs text-cyan">Processing…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-4 pt-2 border-t border-white/5">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-cyan text-bg font-semibold text-sm hover:shadow-glow transition-shadow"
          >
            Save Settings
          </button>
          {saved && <span className="text-sm text-cyan">✓ Saved to this browser</span>}
        </div>
        <p className="text-xs text-text-secondary">
          After saving, go to <b>Publish Changes</b> when you're ready to make these changes visible
          to site visitors.
        </p>
      </div>
    </div>
  )
}
