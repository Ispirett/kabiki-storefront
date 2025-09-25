import { retrieveCart } from "@lib/data/cart"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import TestShippingComponent from "./test-shipping-component"

export default async function TestCheckoutFlowPage() {
  const cart = await retrieveCart()
  
  if (!cart) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Test Checkout Flow</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          No cart found. Please add items to cart first.
        </div>
      </div>
    )
  }

  const shippingMethods = await listCartShippingMethods(cart.id)

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Test Checkout Flow</h1>
      
      <div className="mb-8 bg-blue-50 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Current Cart Status</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Cart ID:</strong> {cart.id}
          </div>
          <div>
            <strong>Items:</strong> {cart.items?.length || 0}
          </div>
          <div>
            <strong>Email Set:</strong> {cart.email ? "✓ Yes" : "✗ No"}
          </div>
          <div>
            <strong>Shipping Address:</strong> {cart.shipping_address ? "✓ Yes" : "✗ No"}
          </div>
          <div>
            <strong>Shipping Methods:</strong> {cart.shipping_methods?.length || 0} selected
          </div>
          <div>
            <strong>Continue Button Should Be:</strong> 
            <span className={cart.shipping_methods?.[0] ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {cart.shipping_methods?.[0] ? " ENABLED" : " DISABLED"}
            </span>
          </div>
        </div>
      </div>

      <TestShippingComponent 
        cart={cart} 
        availableShippingMethods={shippingMethods} 
      />
    </div>
  )
}