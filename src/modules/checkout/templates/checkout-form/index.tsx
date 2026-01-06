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

  let shippingMethods = null
  let paymentMethods = null

  try {
    shippingMethods = await listCartShippingMethods(cart.id)
  } catch (error) {
    console.error('Error fetching shipping methods:', error)
  }

  try {
    paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")
  } catch (error) {
    console.error('Error fetching payment methods:', error)
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
        
        {!shippingMethods || shippingMethods.length === 0 ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">No Shipping Methods Available</h3>
                <p className="text-yellow-800 mb-3">
                  Shipping options haven't been configured for your region yet. Please contact us to complete your order.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+18683680893" className="inline-flex items-center justify-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full font-medium transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (868) 368-0893
                  </a>
                  <a href="mailto:kabikinaturalsoap@gmail.com" className="inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-gray-50 text-yellow-900 border-2 border-yellow-600 rounded-full font-medium transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Shipping cart={cart} availableShippingMethods={shippingMethods} />
        )}
        
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
    { id: 'delivery', name: 'Delivery Method', completed: !!((cart?.shipping_methods?.length ?? 0) > 0) },
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
