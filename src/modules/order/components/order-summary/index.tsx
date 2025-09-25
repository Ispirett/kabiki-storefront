import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    })
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h2 className="text-xl font-serif font-light text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-gray-700">
          <span>Subtotal</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        
        {order.discount_total > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>Discount</span>
            <span>- {getAmount(order.discount_total)}</span>
          </div>
        )}
        
        {order.gift_card_total > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span>Gift Card</span>
            <span>- {getAmount(order.gift_card_total)}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-gray-700">
          <span>Shipping</span>
          <span>{getAmount(order.shipping_total)}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-700">
          <span>Taxes</span>
          <span>{getAmount(order.tax_total)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-4">
          <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>{getAmount(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
