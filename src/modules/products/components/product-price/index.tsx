import { clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

// Currency symbol mapping for proper display
const getCurrencySymbol = (currencyCode: string): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€", 
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    KRW: "₩",
    BRL: "R$",
    MXN: "Mex$",
    CHF: "CHF",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł",
    CZK: "Kč",
    HUF: "Ft",
    RUB: "₽",
    TRY: "₺",
    ZAR: "R",
    SGD: "S$",
    HKD: "HK$",
    NZD: "NZ$",
    THB: "฿",
    MYR: "RM",
    PHP: "₱",
  }
  return symbols[currencyCode.toUpperCase()] || currencyCode.toUpperCase()
}

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  // Simple, direct approach - get the variant to display
  const displayVariant = variant || product.variants?.[0]
  
  if (!displayVariant?.calculated_price?.calculated_amount) {
    return (
      <div className="flex flex-col text-ui-fg-base">
        <span className="text-xl-semi text-gray-400">
          Price not available
        </span>
      </div>
    )
  }

  // Get the raw amount and currency
  const amount = displayVariant.calculated_price.calculated_amount
  const currency = displayVariant.calculated_price.currency_code || 'USD'
  const originalAmount = displayVariant.calculated_price.original_amount
  const symbol = getCurrencySymbol(currency)

  // Smart amount detection
  let finalAmount: number
  let finalOriginalAmount: number | null = null

  if (amount >= 1000) {
    // Likely in cents (e.g., 5000 = $50.00)
    finalAmount = amount / 100
    finalOriginalAmount = originalAmount ? originalAmount / 100 : null
  } else {
    // Likely in main currency unit (e.g., 50.00 = $50.00)
    finalAmount = amount
    finalOriginalAmount = originalAmount || null
  }

  // Format with proper currency symbol
  const formattedAmount = finalAmount.toFixed(2)
  const formattedOriginalAmount = finalOriginalAmount ? finalOriginalAmount.toFixed(2) : null

  // Some currencies have symbol after the amount
  const symbolAfter = ["SEK", "NOK", "DKK", "PLN", "CZK", "HUF"].includes(currency.toUpperCase())
  
  const displayPrice = symbolAfter ? `${formattedAmount} ${symbol}` : `${symbol}${formattedAmount}`
  const originalPrice = formattedOriginalAmount 
    ? (symbolAfter ? `${formattedOriginalAmount} ${symbol}` : `${symbol}${formattedOriginalAmount}`)
    : null

  const isOnSale = finalOriginalAmount && finalOriginalAmount > finalAmount
  const savingsPercent = isOnSale ? Math.round(((finalOriginalAmount - finalAmount) / finalOriginalAmount) * 100) : 0

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx("text-xl-semi", {
          "text-ui-fg-interactive": isOnSale,
        })}
      >
        {!variant && "From "}
        <span data-testid="product-price">
          {displayPrice}
        </span>
      </span>
      
      {isOnSale && originalPrice && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span className="line-through" data-testid="original-product-price">
              {originalPrice}
            </span>
          </p>
          {savingsPercent > 0 && (
            <span className="text-ui-fg-interactive">
              -{savingsPercent}%
            </span>
          )}
        </>
      )}
      
      {/* Currency indicator for non-standard currencies */}
      {!["USD", "EUR", "GBP"].includes(currency.toUpperCase()) && (
        <span className="text-xs text-gray-500 font-medium mt-1">
          {currency.toUpperCase()}
        </span>
      )}
    </div>
  )
}
