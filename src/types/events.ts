import { HttpTypes } from "@medusajs/types"

/**
 * Helper function to dispatch variant change event
 */
export function dispatchVariantChange(variant: HttpTypes.StoreProductVariant | null): void {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('variantChanged', {
      detail: { variant }
    })
    window.dispatchEvent(event)
  }
}