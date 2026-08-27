import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa'
import { useContent } from '../../context/ContentContext.jsx'
import { fileToDataUrl } from '../../utils/fileToDataUrl.js'

/**
 * Generic CRUD manager operating on a collection inside ContentContext
 * (no backend — everything is saved to this browser's localStorage draft
 * immediately, then made visible to all visitors once exported and
 * redeployed — see the "Publish Changes" tab).
 *
 * @param title        Heading shown above the table
 * @param collection    Collection name in content.json, e.g. "skills"
 * @param fields         Array of { key, label, type, placeholder }
 * @param columns         Array of field keys to show as table columns
 * @param emptyItem        Default values for a new record
 */
export default function CrudManager({ title, collection, fields, columns, emptyItem }) {
  const { content, addItem, updateItem, deleteItem } = useContent()
  const items = content[collection]

  const [editing, setEditing] = useState(null) // null = closed, {} = new, {...} = editing existing
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const openNew = () => setEditing({ ...emptyItem })
  const openEdit = (item) => setEditing({ ...item })
  const closeForm = () => { setEditing(null); setError('') }

  const handleChange = (key, value) => setEditing((prev) => ({ ...prev, [key]: value }))

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

  const save = () => {
    if (editing.id) {
      updateItem(collection, editing.id, editing)
    } else {
      addItem(collection, editing)
    }
    closeForm()
  }

  const remove = (id) => {
    if (!confirm('Delete this item? This cannot be undone.')) return
    deleteItem(collection, id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan text-bg text-sm font-semibold hover:shadow-glow transition-shadow">
          <FaPlus size={12} /> Add New
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-text-secondary text-sm">No records yet — add your first one.</p>
      ) : (
        <div className="glass rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-text-secondary text-xs uppercase tracking-wide">
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 font-medium">{col.label}</th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 max-w-xs truncate">
                      {typeof item[col.key] === 'boolean' ? (item[col.key] ? 'Yes' : 'No') : String(item[col.key] ?? '')}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => openEdit(item)} className="text-text-secondary hover:text-cyan transition-colors" aria-label="Edit">
                        <FaEdit size={14} />
                      </button>
                      <button onClick={() => remove(item.id)} className="text-text-secondary hover:text-red-400 transition-colors" aria-label="Delete">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={closeForm}>
          <div className="glass rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg">{editing.id ? 'Edit' : 'Add'} {title.replace(' CMS', '')}</h2>
              <button onClick={closeForm} aria-label="Close"><FaTimes className="text-text-secondary hover:text-text-primary" /></button>
            </div>

            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-text-secondary block mb-1.5">{field.label}</label>

                  {field.type === 'textarea' || field.type === 'markdown' ? (
                    <textarea
                      value={editing[field.key] ?? ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={field.type === 'markdown' ? 8 : 3}
                      className="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-cyan/50 outline-none"
                    />
                  ) : field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={!!editing[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.checked)}
                      className="w-4 h-4 accent-cyan"
                    />
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      value={editing[field.key] ?? 0}
                      onChange={(e) => handleChange(field.key, Number(e.target.value))}
                      className="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-cyan/50 outline-none"
                    />
                  ) : field.type === 'image' ? (
                    <div>
                      {editing[field.key] && (
                        <img src={editing[field.key]} alt="" className="w-24 h-24 object-cover rounded-lg mb-2" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleUpload(field.key, e.target.files[0])}
                        className="text-xs text-text-secondary"
                      />
                      {uploading && <p className="text-xs text-cyan mt-1">Processing…</p>}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={editing[field.key] ?? ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-cyan/50 outline-none"
                    />
                  )}
                </div>
              ))}
            </div>

            {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button onClick={save}
                className="flex-1 py-2.5 rounded-lg bg-cyan text-bg font-semibold text-sm hover:shadow-glow transition-shadow">
                Save
              </button>
              <button onClick={closeForm}
                className="px-5 py-2.5 rounded-lg border border-white/15 text-sm hover:border-white/30 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
