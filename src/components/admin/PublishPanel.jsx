import { useRef, useState } from 'react'
import { FaDownload, FaUpload, FaUndo } from 'react-icons/fa'
import { useContent } from '../../context/ContentContext.jsx'

export default function PublishPanel() {
  const { hasDraft, exportJson, importJson, resetToShipped } = useContent()
  const fileInputRef = useRef(null)
  const [message, setMessage] = useState('')

  const handleImportFile = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importJson(reader.result)
        setMessage('Imported successfully.')
      } catch {
        setMessage('That file is not valid JSON — nothing was changed.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-6">Publish Changes</h1>

      <div className="glass rounded-xl p-6 max-w-2xl space-y-6">
        <div>
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-cyan mb-2">
            Why this step exists
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            This site has no backend server or database — everything you edit here is saved only in
            this browser (so it's here if you come back later, or reload the page). To make your
            changes visible to actual site visitors, you need to export the updated content and
            redeploy the site with it.
          </p>
        </div>

        <div className="border-t border-white/5 pt-6">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide mb-3">Step 1 — Export</h2>
          <p className="text-sm text-text-secondary mb-4">
            Download your current content (including all your edits) as a file.
          </p>
          <button
            onClick={exportJson}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan text-bg text-sm font-semibold hover:shadow-glow transition-shadow"
          >
            <FaDownload size={13} /> Export content.json
          </button>
        </div>

        <div className="border-t border-white/5 pt-6">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide mb-3">Step 2 — Replace the file in your project</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            In your project's code, replace <code className="text-cyan bg-white/5 px-1.5 py-0.5 rounded">frontend/src/data/content.json</code> with
            the file you just downloaded.
          </p>
        </div>

        <div className="border-t border-white/5 pt-6">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide mb-3">Step 3 — Redeploy</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Commit and push the updated file to GitHub. If your site is connected to Vercel (or
            Netlify), it redeploys automatically within a minute or two — then your changes are live
            for everyone.
          </p>
        </div>

        <div className="border-t border-white/5 pt-6">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide mb-3">
            Already have a content.json to load?
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            Import a previously exported file to continue editing it in this browser.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleImportFile(e.target.files[0])}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-sm font-semibold hover:border-cyan/50 hover:text-cyan transition-colors"
          >
            <FaUpload size={13} /> Import content.json
          </button>
        </div>

        {hasDraft && (
          <div className="border-t border-white/5 pt-6">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-red-400 mb-3">
              Discard unpublished changes
            </h2>
            <p className="text-sm text-text-secondary mb-4">
              Throws away everything edited in this browser and goes back to the site's currently
              published content.
            </p>
            <button
              onClick={() => { if (confirm('Discard all unpublished changes in this browser?')) resetToShipped() }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-400/30 text-red-400 text-sm font-semibold hover:bg-red-400/10 transition-colors"
            >
              <FaUndo size={13} /> Reset to published content
            </button>
          </div>
        )}

        {message && <p className="text-sm text-cyan">{message}</p>}
      </div>
    </div>
  )
}
