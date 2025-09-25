"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-orange-100 shadow-lg">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={clx(
            "w-10 h-10 rounded-full flex items-center justify-center",
            {
              "bg-orange-100 border-2 border-orange-300": !isOpen,
              "bg-green-100 border-2 border-green-300": isOpen,
              "opacity-50": !isOpen,
            }
          )}>
            <span className={`text-sm font-semibold ${isOpen ? 'text-green-700' : 'text-orange-700'}`}>4</span>
          </div>
          <Heading
            level="h2"
            className={clx(
              "text-xl font-serif font-light text-gray-900",
              {
                "opacity-50 pointer-events-none select-none": !isOpen,
              }
            )}
          >
            Review & Place Order
          </Heading>
        </div>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 rounded-2xl p-6 mb-6">
            <div className="w-full">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <Text className="text-sm text-gray-800 leading-relaxed">
                  By clicking the <strong>Place Order</strong> button, you confirm that you have
                  read, understand and accept our Terms of Use, Terms of Sale and
                  Returns Policy and acknowledge that you have read Kabiki&apos;s Privacy Policy.
                </Text>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>
        </>
      )}
    </div>
  )
}

export default Review
