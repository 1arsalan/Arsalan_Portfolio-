/**
 * Converts a File to a base64 data URL entirely in the browser — no upload
 * server needed. The resulting string is stored directly in content.json
 * and works as a normal <img src="..."> value.
 *
 * Trade-off: base64 is ~33% larger than the original file and lives inside
 * the JSON/page itself, so keep images reasonably small (a few hundred KB).
 * Fine for a portfolio's profile photo, project screenshots, and a CV PDF.
 */
export function fileToDataUrl(file, maxSizeMB = 5) {
  return new Promise((resolve, reject) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      reject(new Error(`File is larger than ${maxSizeMB}MB — please use a smaller file.`))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read file.'))
    reader.readAsDataURL(file)
  })
}
