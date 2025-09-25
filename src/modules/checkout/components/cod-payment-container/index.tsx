import { Radio as RadioGroupOption } from "@headlessui/react"
import { Text, clx } from "@medusajs/ui"
import React, { type JSX } from "react"

import Radio from "@modules/common/components/radio"
import { isManual } from "@lib/constants"

type CODPaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
}

const CODPaymentContainer: React.FC<CODPaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isSelected = selectedPaymentOptionId === paymentProviderId
  const isCOD = isManual(paymentProviderId)

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "flex flex-col gap-y-3 text-small-regular cursor-pointer py-6 border rounded-2xl px-6 mb-4 transition-all duration-300",
        {
          "border-orange-300 bg-orange-50 shadow-lg": isSelected,
          "border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-25": !isSelected,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Radio checked={isSelected} />
          <div className="flex flex-col">
            <Text className="text-base font-semibold text-gray-900">
              {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
            </Text>
            {isCOD && (
              <Text className="text-sm text-gray-600 mt-1">
                Pay with cash when your order is delivered
              </Text>
            )}
          </div>
        </div>
        <span className="justify-self-end text-orange-600">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>
      
      {isSelected && isCOD && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-orange-200">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <Text className="text-sm font-medium text-gray-900">
                  How Cash on Delivery Works
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Your order will be prepared and shipped to your address. Pay the delivery person with cash when you receive your package.
                </Text>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <Text className="text-sm font-medium text-gray-900">
                  Payment Requirements
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Please have the exact amount ready in cash. Our delivery partner will provide a receipt upon payment.
                </Text>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <Text className="text-sm font-medium text-gray-900">
                  Important Note
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  COD orders may take 1-2 additional business days to process. A small COD fee may apply.
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </RadioGroupOption>
  )
}

export default CODPaymentContainer