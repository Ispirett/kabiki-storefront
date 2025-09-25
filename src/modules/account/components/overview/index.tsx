import { Container } from "@medusajs/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Package from "@modules/common/icons/package"
import MapPin from "@modules/common/icons/map-pin"
import User from "@modules/common/icons/user"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900 mb-2" data-testid="welcome-message" data-value={customer?.first_name}>
            Hello, {customer?.first_name}! 🧼
          </h1>
          <p className="text-gray-600">
            Welcome to your natural skincare journey dashboard
          </p>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-orange-100">
          <p className="text-sm text-gray-600">
            Signed in as:{" "}
            <span
              className="font-semibold text-orange-600"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-light text-gray-900">Profile Completion</h3>
            <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
              <User size={24} className="text-orange-600" />
            </div>
          </div>
          <div className="flex items-end gap-x-2">
            <span
              className="text-4xl font-bold text-orange-600 leading-none"
              data-testid="customer-profile-completion"
              data-value={getProfileCompletion(customer)}
            >
              {getProfileCompletion(customer)}%
            </span>
            <span className="text-sm font-medium text-orange-700 mb-1">
              Complete
            </span>
          </div>
          <p className="text-sm text-orange-700 mt-2">
            Complete your profile to get personalized soap recommendations
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-light text-gray-900">Saved Addresses</h3>
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <MapPin size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-end gap-x-2">
            <span
              className="text-4xl font-bold text-blue-600 leading-none"
              data-testid="addresses-count"
              data-value={customer?.addresses?.length || 0}
            >
              {customer?.addresses?.length || 0}
            </span>
            <span className="text-sm font-medium text-blue-700 mb-1">
              Addresses
            </span>
          </div>
          <p className="text-sm text-blue-700 mt-2">
            Save addresses for faster checkout on your soap orders
          </p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-light text-gray-900">Recent Orders</h2>
          <LocalizedClientLink 
            href="/account/orders"
            className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-300"
          >
            View All Orders →
          </LocalizedClientLink>
        </div>
        
        <div className="space-y-4" data-testid="orders-wrapper">
          {orders && orders.length > 0 ? (
            orders.slice(0, 3).map((order) => (
              <LocalizedClientLink
                key={order.id}
                href={`/account/orders/details/${order.id}`}
                data-testid="order-wrapper"
                data-value={order.id}
              >
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">Order Date</p>
                        <p className="text-sm text-gray-600" data-testid="order-created-date">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">Order Number</p>
                        <p 
                          className="text-sm text-orange-600 font-mono"
                          data-testid="order-id"
                          data-value={order.display_id}
                        >
                          #{order.display_id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">Total Amount</p>
                        <p className="text-sm font-bold text-gray-900" data-testid="order-amount">
                          {convertToLocale({
                            amount: order.total,
                            currency_code: order.currency_code,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center group-hover:bg-orange-300 transition-colors duration-300">
                        <ChevronDown className="-rotate-90 text-orange-600" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </LocalizedClientLink>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600" data-testid="no-orders-message">
                No orders yet. Start your natural skincare journey!
              </p>
              <LocalizedClientLink 
                href="/store"
                className="inline-block mt-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-500 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Organic Soaps
              </LocalizedClientLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
