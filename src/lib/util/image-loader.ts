/**
 * Custom image loader for Next.js Image component
 * Handles both absolute URLs and relative paths from Medusa backend
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export function getImageUrl(src: string | null | undefined): string {
  if (!src) {
    return ""
  }

  // If it's already an absolute URL (http:// or https://), return as is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src
  }

  // If it's a local public folder path (starts with /images/), return as is
  if (src.startsWith("/images/")) {
    return src
  }

  // If it's a relative path from Medusa backend, prepend the backend URL
  // Remove leading slash if present to avoid double slashes
  const cleanPath = src.startsWith("/") ? src.slice(1) : src
  return `${BACKEND_URL}/${cleanPath}`
}

export function medusaImageLoader({ src }: { src: string }): string {
  return getImageUrl(src)
}
