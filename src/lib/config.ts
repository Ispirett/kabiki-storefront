import Medusa from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL
}

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
  console.warn("⚠️  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is not set. This may cause authentication issues.")
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: false,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

// Log configuration in development
if (process.env.NODE_ENV === "development") {
  console.log("🔧 Medusa SDK Configuration:")
  console.log("   Backend URL:", MEDUSA_BACKEND_URL)
  console.log("   Publishable Key:", process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ? "✅ Set" : "❌ Not set")

}
