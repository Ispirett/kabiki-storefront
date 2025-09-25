import { Container, Heading, Text } from "@medusajs/ui"

import { isStripe, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <Heading level="h2" className="text-2xl font-serif font-light text-gray-900 mb-6">
        Payment Information
      </Heading>
      <div>
        {payment && (
          <div className="grid grid-cols-1 small:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Payment Method
              </h3>
              <p
                className="text-gray-700"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id].title}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Payment Details
              </h3>
              <div className="flex gap-3 items-center">
                <div className="flex items-center justify-center h-8 w-8 bg-white rounded-lg border border-gray-200">
                  {paymentInfoMap[payment.provider_id].icon}
                </div>
                <p className="text-gray-700" data-testid="payment-amount">
                  {isStripe(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} paid at ${new Date(
                        payment.created_at ?? ""
                      ).toLocaleString()}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentDetails
