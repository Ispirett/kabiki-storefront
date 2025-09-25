import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"
import { reformatPriceString, getCurrencySymbol } from "@lib/util/format-currency"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  // Format prices with proper currency symbols
  const formattedCalculatedPrice = reformatPriceString(price.calculated_price, price.currency_code)
  const formattedOriginalPrice = price.original_price 
    ? reformatPriceString(price.original_price, price.currency_code)
    : null

  // Calculate savings percentage for sale items
  const getSavingsPercentage = () => {
    if (!price.original_price || price.price_type !== "sale") return 0
    
    const originalAmount = parseFloat(price.original_price.replace(/[^0-9.-]+/g, ""))
    const calculatedAmount = parseFloat(price.calculated_price.replace(/[^0-9.-]+/g, ""))
    
    if (originalAmount <= 0) return 0
    
    return Math.round(((originalAmount - calculatedAmount) / originalAmount) * 100)
  }

  const savingsPercentage = getSavingsPercentage()

  return (
    <div className="flex items-center gap-2">
      {price.price_type === "sale" && formattedOriginalPrice && (
        <Text
          className="line-through text-gray-400 text-sm"
          data-testid="original-price"
        >
          {formattedOriginalPrice}
        </Text>
      )}
      <Text
        className={clx("font-semibold", {
          "text-red-600 text-lg": price.price_type === "sale",
          "text-gray-900 text-lg": price.price_type !== "sale",
        })}
        data-testid="price"
      >
        {formattedCalculatedPrice}
      </Text>
      {price.price_type === "sale" && savingsPercentage > 0 && (
        <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
          Save {savingsPercentage}%
        </div>
      )}
      
      {/* Currency indicator for non-standard currencies */}
      {!["USD", "EUR", "GBP"].includes(price.currency_code.toUpperCase()) && (
        <span className="text-xs text-gray-500 font-medium">
          {price.currency_code.toUpperCase()}
        </span>
      )}
    </div>
  )
}
