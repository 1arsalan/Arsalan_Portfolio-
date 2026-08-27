import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import defaultContent from '../data/content.json'

const ContentContext = createContext(null)
const STORAGE_KEY = 'portfolio_content_draft'

/**
 * How content works in this frontend-only build:
 *
 * - `defaultContent` (src/data/content.json) is what ships in the build —
 *   this is what every visitor sees.
 * - When the admin edits something in /admin, changes are saved to this
 *   browser's localStorage as a "draft" and applied on top of the shipped
 *   content, so the admin can see and keep working on their changes.
 * - That draft only exists in the admin's own browser. To make edits
 *   visible to everyone, the admin must use "Export JSON" in the admin
 *   dashboard, replace src/data/content.json with the downloaded file, and
 *   redeploy (e.g. push to GitHub — Vercel redeploys automatically).
 */
function loadInitialContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // Corrupt or inaccessible localStorage — fall back to shipped content.
  }
  return defaultContent
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadInitialContent)
  const [hasDraft, setHasDraft] = useState(() => !!localStorage.getItem(STORAGE_KEY))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    setHasDraft(true)
  }, [content])

  const updateSettings = useCallback((updates) => {
    setContent((prev) => ({ ...prev, settings: { ...prev.settings, ...updates } }))
  }, [])

  const nextIdFor = (list) => (list.length ? Math.max(...list.map((i) => i.id)) + 1 : 1)

  const addItem = useCallback((collection, item) => {
    setContent((prev) => {
      const list = prev[collection]
      const newItem = { ...item, id: nextIdFor(list) }
      if (collection === 'projects' || collection === 'blogs') {
        newItem.created_at = new Date().toISOString()
      }
      return { ...prev, [collection]: [...list, newItem] }
    })
  }, [])

  const updateItem = useCallback((collection, id, updates) => {
    setContent((prev) => ({
      ...prev,
      [collection]: prev[collection].map((i) => (i.id === id ? { ...i, ...updates, id } : i)),
    }))
  }, [])

  const deleteItem = useCallback((collection, id) => {
    setContent((prev) => ({
      ...prev,
      [collection]: prev[collection].filter((i) => i.id !== id),
    }))
  }, [])

  const resetToShipped = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setContent(defaultContent)
    setHasDraft(false)
  }, [])

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [content])

  const importJson = useCallback((jsonText) => {
    const parsed = JSON.parse(jsonText)
    setContent(parsed)
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        hasDraft,
        updateSettings,
        addItem,
        updateItem,
        deleteItem,
        resetToShipped,
        exportJson,
        importJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
