"use client"

import { useState } from "react"
import { setShippingMethod } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useRouter } from "next/navigation"

type TestShippingComponentProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

export default function TestShippingComponent({ 
  cart, 
  availableShippingMethods 
}: TestShippingComponentProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleSetShippingMethod = async (shippingMethodId: string) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await setShippingMethod({ 
        cartId: cart.id, 
        shippingMethodId 
      })
      
      setSuccess(`Shipping method set successfully! Refreshing page...`)
      
      // Force refresh to see updated cart data
      setTimeout(() => {
        router.refresh()
      }, 1000)
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleContinueToPayment = () => {
    if (cart.shipping_methods?.[0]) {
      alert("Continue to Payment button would work! ✓")
    } else {
      alert("Continue to Payment button is disabled ✗")
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded">
          <strong>Success:</strong> {success}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Shipping Methods</h2>
        
        {availableShippingMethods && availableShippingMethods.length > 0 ? (
          <div className="space-y-3">
            {availableShippingMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-gray-600">
                    {method.amount} {cart.currency_code} • {method.price_type}
                  </div>
                  <div className="text-xs text-gray-500">ID: {method.id}</div>
                </div>
                
                <div className="flex items-center gap-3">
                  {cart.shipping_methods?.some(sm => sm.shipping_option_id === method.id) && (
                    <span className="text-green-600 text-sm font-medium">✓ Selected</span>
                  )}
                  
                  <button
                    onClick={() => handleSetShippingMethod(method.id)}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    {loading ? "Setting..." : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No shipping methods available</p>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Continue to Payment Test</h2>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            Button should be {cart.shipping_methods?.[0] ? "enabled" : "disabled"}
          </div>
          
          <button
            onClick={handleContinueToPayment}
            disabled={!cart.shipping_methods?.[0]}
            className={`px-6 py-3 rounded-lg font-semibold ${
              cart.shipping_methods?.[0]
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue to Payment
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          Current shipping methods on cart: {cart.shipping_methods?.length || 0}
          {cart.shipping_methods?.map((method, index) => (
            <div key={index} className="ml-4 mt-1">
              • {method.name} (Option ID: {method.shipping_option_id})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}