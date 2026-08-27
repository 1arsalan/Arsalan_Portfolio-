/**
 * Opens (or downloads) a file that's stored as a base64 data URL.
 *
 * Browsers block top-level navigation to `data:` URLs opened via
 * `target="_blank"` as a security measure — clicking a link with
 * `href="data:application/pdf;base64,..."` silently does nothing in
 * Chrome, Safari, and most modern browsers. Converting it to a `blob:`
 * URL at click time works around this restriction reliably.
 *
 * If the value isn't a data URL (e.g. it's a normal http(s) link the
 * admin pasted instead of uploading a file), it's opened as-is.
 */
export function openFileValue(value, filename = 'file') {
  if (!value) return

  if (!value.startsWith('data:')) {
    window.open(value, '_blank', 'noopener,noreferrer')
    return
  }

  try {
    const [header, base64] = value.split(',')
    const mimeMatch = header.match(/data:(.*);base64/)
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream'

    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: mime })
    const blobUrl = URL.createObjectURL(blob)

    window.open(blobUrl, '_blank', 'noopener,noreferrer')
    // Give the new tab time to load the blob before revoking it.
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000)
  } catch {
    // Fall back to a direct download if anything above fails.
    const a = document.createElement('a')
    a.href = value
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
