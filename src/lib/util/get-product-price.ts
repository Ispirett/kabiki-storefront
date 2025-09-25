import { HttpTypes } from "@medusajs/types"
import { getPercentageDiff } from "./get-precentage-diff"
import { convertToLocale } from "./money"

export const getPricesForVariant = (variant: any) => {
  if (!variant?.calculated_price?.calculated_amount) {
    console.warn('No calculated price found for variant:', variant?.id)
    return null
  }

  // Fallback currency code if not available
  const currencyCode = variant.calculated_price.currency_code || 'USD'
  const amount = variant.calculated_price.calculated_amount

  console.log('Processing variant price:', {
    variantId: variant.id,
    amount,
    currencyCode,
    originalAmount: variant.calculated_price.original_amount
  })

  try {
    const calculatedPrice = convertToLocale({
      amount,
      currency_code: currencyCode,
    })

    const originalPrice = variant.calculated_price.original_amount ? convertToLocale({
      amount: variant.calculated_price.original_amount,
      currency_code: currencyCode,
    }) : null

    const result = {
      calculated_price_number: amount,
      calculated_price: calculatedPrice,
      original_price_number: variant.calculated_price.original_amount,
      original_price: originalPrice,
      currency_code: currencyCode,
      price_type: variant.calculated_price.calculated_price?.price_list_type || 'default',
      percentage_diff: variant.calculated_price.original_amount ? getPercentageDiff(
        variant.calculated_price.original_amount,
        amount
      ) : null,
    }

    console.log('Formatted price result:', result)
    return result
  } catch (error) {
    console.warn('Error formatting variant price:', error)
    // Return basic price info as fallback
    const fallbackPrice = `$${amount.toFixed(2)}`
    const fallbackOriginal = variant.calculated_price.original_amount ? `$${variant.calculated_price.original_amount.toFixed(2)}` : null
    
    console.log('Using fallback price:', fallbackPrice)
    
    return {
      calculated_price_number: amount,
      calculated_price: fallbackPrice,
      original_price_number: variant.calculated_price.original_amount,
      original_price: fallbackOriginal,
      currency_code: currencyCode,
      price_type: 'default',
      percentage_diff: null,
    }
  }
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  if (!product || !product.id) {
    console.warn("No product provided to getProductPrice")
    return {
      product: null,
      cheapestPrice: null,
      variantPrice: null,
    }
  }

  const cheapestPrice = () => {
    try {
      if (!product || !product.variants?.length) {
        console.warn('No product or variants found:', { productId: product?.id, variantCount: product?.variants?.length })
        return null
      }

      const variantsWithPrices = product.variants.filter((v: any) => 
        v?.calculated_price?.calculated_amount !== undefined && 
        v?.calculated_price?.calculated_amount !== null
      )

      console.log('Variants with prices:', {
        totalVariants: product.variants.length,
        variantsWithPrices: variantsWithPrices.length,
        sampleVariant: variantsWithPrices[0]
      })

      if (variantsWithPrices.length === 0) {
        console.warn('No variants with calculated prices found')
        return null
      }

      const cheapestVariant: any = variantsWithPrices
        .sort((a: any, b: any) => {
          return (
            a.calculated_price.calculated_amount -
            b.calculated_price.calculated_amount
          )
        })[0]

      console.log('Cheapest variant found:', cheapestVariant?.id, cheapestVariant?.calculated_price?.calculated_amount)
      return getPricesForVariant(cheapestVariant)
    } catch (error) {
      console.warn("Error getting cheapest price:", error)
      return null
    }
  }

  const variantPrice = () => {
    try {
      if (!product || !variantId) {
        return null
      }

      const variant: any = product.variants?.find(
        (v) => v.id === variantId || v.sku === variantId
      )

      if (!variant) {
        return null
      }

      return getPricesForVariant(variant)
    } catch (error) {
      console.warn("Error getting variant price:", error)
      return null
    }
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}
