"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CODConfirmationProps = {
  order: HttpTypes.StoreOrder
}

const CODConfirmation = ({ order }: CODConfirmationProps) => {
  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount / 100)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <Heading level="h1" className="text-3xl font-serif font-light text-gray-900 mb-2">
          Order Confirmed!
        </Heading>
        <Text className="text-lg text-gray-600">
          Your Cash on Delivery order has been successfully placed.
        </Text>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <Heading level="h2" className="text-xl font-semibold text-gray-900">
            Cash on Delivery Details
          </Heading>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Text className="text-gray-700">Order Number:</Text>
            <Text className="font-semibold text-gray-900">#{order.display_id}</Text>
          </div>
          <div className="flex justify-between items-center">
            <Text className="text-gray-700">Total Amount to Pay:</Text>
            <Text className="font-bold text-green-600 text-lg">
              {formatPrice(order.total, order.currency_code)}
            </Text>
          </div>
          <div className="flex justify-between items-center">
            <Text className="text-gray-700">Payment Method:</Text>
            <Text className="font-semibold text-gray-900">Cash on Delivery</Text>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <Heading level="h3" className="text-lg font-semibold text-gray-900">
            What Happens Next?
          </Heading>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-bold text-blue-600">1</span>
            </div>
            <div>
              <Text className="font-medium text-gray-900">Order Processing</Text>
              <Text className="text-sm text-gray-600 mt-1">
                We'll prepare your organic soap order within 1-2 business days.
              </Text>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-bold text-blue-600">2</span>
            </div>
            <div>
              <Text className="font-medium text-gray-900">Shipping & Tracking</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Your order will be shipped to your address. You'll receive tracking information via email.
              </Text>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-bold text-blue-600">3</span>
            </div>
            <div>
              <Text className="font-medium text-gray-900">Cash Payment on Delivery</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Pay the delivery person with exact cash amount when you receive your package.
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <Heading level="h3" className="text-lg font-semibold text-gray-900">
            Important Reminders
          </Heading>
        </div>
        
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>Please have the exact cash amount ready for payment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>Ensure someone is available at the delivery address</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>A receipt will be provided upon payment completion</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>COD orders may take 1-2 additional business days to process</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <LocalizedClientLink href="/account/orders" className="flex-1">
          <Button 
            variant="secondary" 
            className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 px-6 rounded-2xl transition-all duration-300"
          >
            View Order Details
          </Button>
        </LocalizedClientLink>
        <LocalizedClientLink href="/" className="flex-1">
          <Button 
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white py-3 px-6 rounded-2xl transition-all duration-300"
          >
            Continue Shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default CODConfirmation