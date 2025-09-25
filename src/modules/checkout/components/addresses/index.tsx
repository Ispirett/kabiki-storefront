"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-orange-100 shadow-lg">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!isOpen ? 'bg-green-100 border-2 border-green-300' : 'bg-orange-100 border-2 border-orange-300'}`}>
            {!isOpen ? (
              <CheckCircleSolid className="w-5 h-5 text-green-600" />
            ) : (
              <span className="text-sm font-semibold text-orange-700">1</span>
            )}
          </div>
          <Heading
            level="h2"
            className="text-xl font-serif font-light text-gray-900"
          >
            Shipping Address
          </Heading>
        </div>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 bg-white hover:bg-orange-50 border border-orange-200 rounded-full transition-all duration-300"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-3xl-regular gap-x-4 pb-6 pt-8"
                >
                  Billing address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="mt-6 w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl" data-testid="submit-address-button">
              Continue to Delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 small:grid-cols-3 gap-6">
                <div
                  className="space-y-2"
                  data-testid="shipping-address-summary"
                >
                  <Text className="font-semibold text-gray-900 text-sm">
                    Shipping Address
                  </Text>
                  <div className="space-y-1 text-gray-600">
                    <Text className="text-sm">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-sm">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="text-sm">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="text-sm font-medium">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>
                </div>

                <div
                  className="space-y-2"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="font-semibold text-grey-90 text-sm">
                    Contact Information
                  </Text>
                  <div className="space-y-1 text-grey-70">
                    <Text className="text-sm">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-sm">
                      {cart.email}
                    </Text>
                  </div>
                </div>

                <div
                  className="space-y-2"
                  data-testid="billing-address-summary"
                >
                  <Text className="font-semibold text-grey-90 text-sm">
                    Billing Address
                  </Text>
                  <div className="space-y-1 text-grey-70">
                    {sameAsBilling ? (
                      <Text className="text-sm italic">
                        Same as shipping address
                      </Text>
                    ) : (
                      <>
                        <Text className="text-sm">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="text-sm">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="text-sm">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="text-sm font-medium">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Addresses
