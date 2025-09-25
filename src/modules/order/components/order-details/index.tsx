import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <div className="space-y-3">
        <p className="text-gray-700">
          We have sent the order confirmation details to{" "}
          <span
            className="font-semibold text-gray-900"
            data-testid="order-email"
          >
            {order.email}
          </span>
          .
        </p>
        
        <div className="grid grid-cols-1 small:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium text-gray-900" data-testid="order-date">
              {new Date(order.created_at).toDateString()}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="font-medium text-orange-600" data-testid="order-id">
              #{order.display_id}
            </p>
          </div>

          {showStatus && (
            <>
              <div>
                <p className="text-sm text-gray-600">Order Status</p>
                <p className="font-medium text-gray-900" data-testid="order-status">
                  {formatStatus(order.fulfillment_status)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p className="font-medium text-gray-900" data-testid="order-payment-status">
                  {formatStatus(order.payment_status)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
