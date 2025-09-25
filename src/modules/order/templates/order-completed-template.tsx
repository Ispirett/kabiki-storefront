import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="content-container py-8 small:py-12">
        <div className="max-w-4xl mx-auto">
          {isOnboarding && <OnboardingCta orderId={order.id} />}
          <div
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 small:p-8"
            data-testid="order-complete-container"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <Heading
                level="h1"
                className="text-3xl font-serif font-light text-gray-900 mb-2"
              >
                Thank you!
              </Heading>
              <p className="text-gray-600 text-lg">
                Your order was placed successfully.
              </p>
            </div>

            <div className="space-y-8">
              <OrderDetails order={order} />
              
              <div className="border-t border-gray-200 pt-8">
                <Heading level="h2" className="text-2xl font-serif font-light text-gray-900 mb-6">
                  Order Summary
                </Heading>
                <div className="space-y-6">
                  <Items order={order} />
                  <CartTotals totals={order} />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 space-y-6">
                <ShippingDetails order={order} />
                <PaymentDetails order={order} />
              </div>

              <div className="border-t border-gray-200 pt-8">
                <Help />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
