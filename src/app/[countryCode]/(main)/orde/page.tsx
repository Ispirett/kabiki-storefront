import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Order",
  description: "Order page",
}

export default function OrderPage() {
  // This is a placeholder page for the /orde route
  // You can customize this based on your specific needs
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="content-container py-8 small:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 small:p-8">
            <div className="text-center">
              <h1 className="text-3xl font-serif font-light text-gray-900 mb-4">
                Order Information
              </h1>
              <p className="text-gray-600 mb-8">
                Welcome to the order page. This page has been styled to match the rest of the site.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-6 text-left">
                <h2 className="text-xl font-serif font-light text-gray-900 mb-4">
                  What would you like to do?
                </h2>
                <div className="space-y-4">
                  <a 
                    href="/account/orders" 
                    className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">View Order History</h3>
                    <p className="text-gray-600 text-sm">See all your previous orders and their status</p>
                  </a>
                  
                  <a 
                    href="/cart" 
                    className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">View Cart</h3>
                    <p className="text-gray-600 text-sm">Check your current cart and proceed to checkout</p>
                  </a>
                  
                  <a 
                    href="/store" 
                    className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Continue Shopping</h3>
                    <p className="text-gray-600 text-sm">Browse our collection of organic soaps</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}