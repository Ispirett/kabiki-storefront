import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-24 space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 -m-6 -mt-8 mb-6 p-6 rounded-t-3xl">
          <Heading
            level="h2"
            className="text-2xl font-serif font-light text-white mb-2"
          >
            Order Summary
          </Heading>
          <p className="text-orange-100">Review your handcrafted organic soaps</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-orange-100">
          <ItemsPreviewTemplate cart={cart} />
        </div>
        
        <div className="space-y-4">
          <DiscountCode cart={cart} />
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-orange-100">
            <CartTotals totals={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
