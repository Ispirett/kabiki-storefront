import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"


export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  // Debug logging
  console.log('Checkout Form Debug:', {
    cartId: cart.id,
    regionId: cart.region?.id,
    shippingMethodsCount: shippingMethods?.length || 0,
    paymentMethodsCount: paymentMethods?.length || 0,
    paymentMethods: paymentMethods
  })

  // Don't return null - show checkout even if methods are missing
  if (!shippingMethods) {
    console.error('No shipping methods available')
  }
  
  if (!paymentMethods) {
    console.error('No payment methods available')
  }

  return (
    <div className="w-full space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-light text-gray-900 mb-2">Secure Checkout</h1>
        <p className="text-lg text-gray-600">Complete your natural skincare journey in just a few simple steps</p>
        
        {/* Progress Indicator */}
        <div className="mt-6">
          <CheckoutProgress cart={cart} />
        </div>
      </div>
      
      <div className="space-y-6">

        <Addresses cart={cart} customer={customer} />
        <Shipping cart={cart} availableShippingMethods={shippingMethods || []} />
        <Payment cart={cart} availablePaymentMethods={paymentMethods || []} />
        <Review cart={cart} />
      </div>
    </div>
  )
}

// Progress indicator component
function CheckoutProgress({ cart }: { cart: HttpTypes.StoreCart }) {
  const steps = [
    { id: 'address', name: 'Shipping Address', completed: !!(cart?.shipping_address?.address_1 && cart.email) },
    { id: 'delivery', name: 'Delivery Method', completed: !!(cart?.shipping_methods?.length > 0) },
    { id: 'payment', name: 'Payment Details', completed: false }, // This would need payment status check
    { id: 'review', name: 'Review Order', completed: false }
  ]

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 text-gray-500'
          }`}>
            {step.completed ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-sm font-medium">{index + 1}</span>
            )}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            step.completed ? 'text-green-600' : 'text-gray-500'
          }`}>
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div className={`ml-4 w-12 h-0.5 ${
              step.completed ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}
