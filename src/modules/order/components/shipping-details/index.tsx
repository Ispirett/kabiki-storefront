import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading level="h2" className="text-2xl font-serif font-light text-gray-900 mb-6">
        Delivery Information
      </Heading>
      <div className="grid grid-cols-1 small:grid-cols-3 gap-6">
        <div
          className="bg-gray-50 rounded-2xl p-4"
          data-testid="shipping-address-summary"
        >
          <h3 className="font-semibold text-gray-900 mb-3">
            Shipping Address
          </h3>
          <div className="space-y-1 text-gray-700">
            <p>
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </p>
            <p>
              {order.shipping_address?.address_1}{" "}
              {order.shipping_address?.address_2}
            </p>
            <p>
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city}
            </p>
            <p>
              {order.shipping_address?.country_code?.toUpperCase()}
            </p>
          </div>
        </div>

        <div
          className="bg-gray-50 rounded-2xl p-4"
          data-testid="shipping-contact-summary"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
          <div className="space-y-1 text-gray-700">
            <p>{order.shipping_address?.phone}</p>
            <p>{order.email}</p>
          </div>
        </div>

        <div
          className="bg-gray-50 rounded-2xl p-4"
          data-testid="shipping-method-summary"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Shipping Method</h3>
          <div className="text-gray-700">
            <p className="font-medium">{(order as any).shipping_methods[0]?.name}</p>
            <p className="text-sm text-gray-600">
              {convertToLocale({
                amount: order.shipping_methods?.[0].total ?? 0,
                currency_code: order.currency_code,
              })
                .replace(/,/g, "")
                .replace(/\./g, ",")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
