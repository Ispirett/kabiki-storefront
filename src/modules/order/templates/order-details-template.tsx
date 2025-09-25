"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="content-container py-8 small:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 small:p-8">
            <div className="flex gap-2 justify-between items-center mb-8">
              <h1 className="text-3xl font-serif font-light text-gray-900">Order Details</h1>
              <LocalizedClientLink
                href="/account/orders"
                className="flex gap-2 items-center text-gray-600 hover:text-orange-600 transition-colors"
                data-testid="back-to-overview-button"
              >
                <XMark className="w-5 h-5" /> Back to overview
              </LocalizedClientLink>
            </div>
            
            <div
              className="space-y-8"
              data-testid="order-details-container"
            >
              <OrderDetails order={order} showStatus />
              
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">Items</h2>
                <Items order={order} />
              </div>
              
              <div className="border-t border-gray-200 pt-8 space-y-6">
                <ShippingDetails order={order} />
                <OrderSummary order={order} />
              </div>
              
              <div className="border-t border-gray-200 pt-8">
                <Help />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
