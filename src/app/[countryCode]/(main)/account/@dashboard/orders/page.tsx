import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full space-y-8" data-testid="orders-page-wrapper">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-600">
          Track your organic soap orders, view order details, and manage returns or exchanges 
          for your natural skincare products.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-orange-100">
          <OrderOverview orders={orders} />
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h2 className="text-xl font-serif font-light text-gray-900 mb-4">Need Help with an Order?</h2>
          <TransferRequestForm />
        </div>
      </div>
    </div>
  )
}
