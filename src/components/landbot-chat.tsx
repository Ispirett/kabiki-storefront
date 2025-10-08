"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    Landbot: any
    myLandbot?: any
  }
}

export default function LandbotChat() {
  useEffect(() => {
    let initialized = false

    function initLandbot() {
      if (!window.myLandbot && !initialized) {
        initialized = true
        const script = document.createElement("script")
        script.type = "module"
        script.async = true
        script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs"
        
        script.addEventListener("load", () => {
          if (window.Landbot) {
            window.myLandbot = new window.Landbot.Livechat({
              configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3169379-V71788HXMGO6SL7G/index.json',
            })
          }
        })
        
        const firstScript = document.getElementsByTagName("script")[0]
        firstScript.parentNode?.insertBefore(script, firstScript)
      }
    }

    // Lazy load on first user interaction
    window.addEventListener("mouseover", initLandbot, { once: true })
    window.addEventListener("touchstart", initLandbot, { once: true })

    return () => {
      window.removeEventListener("mouseover", initLandbot)
      window.removeEventListener("touchstart", initLandbot)
    }
  }, [])

  return null
}
