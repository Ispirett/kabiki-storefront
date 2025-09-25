import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <Heading className="text-xl font-serif font-light text-gray-900 mb-4">Need Help?</Heading>
      <div className="space-y-3">
        <LocalizedClientLink 
          href="/contact"
          className="block text-orange-600 hover:text-orange-700 transition-colors font-medium"
        >
          Contact Support
        </LocalizedClientLink>
        <LocalizedClientLink 
          href="/contact"
          className="block text-orange-600 hover:text-orange-700 transition-colors font-medium"
        >
          Returns & Exchanges
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
