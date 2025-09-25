import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

type CheckoutPageProps = {
  params: Promise<{
    countryCode: string
  }>
  searchParams: Promise<{
    step?: string
  }>
}

export default async function Checkout(props: CheckoutPageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { countryCode } = params
  
  try {
    const cart = await retrieveCart()

    if (!cart) {
      console.log("No cart found, redirecting to cart page")
      redirect(`/${countryCode}/cart`)
    }

    // Validate that the cart has a valid region
    if (!cart.region || !cart.region.id) {
      console.error("Cart has no valid region, redirecting to cart page")
      redirect(`/${countryCode}/cart`)
    }

    const customer = await retrieveCustomer()

    // If no step is specified, redirect to the appropriate step
    if (!searchParams.step) {
      const step = getCheckoutStep(cart)
      redirect(`/${countryCode}/checkout?step=${step}`)
    }



    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="content-container py-8 small:py-12">
          <div className="grid grid-cols-1 small:grid-cols-[1fr_420px] gap-8 small:gap-12">
            <PaymentWrapper cart={cart}>
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 small:p-8">
                <CheckoutForm cart={cart} customer={customer} />
              </div>
            </PaymentWrapper>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 small:p-8">
              <CheckoutSummary cart={cart} />
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in checkout page:", error)
    redirect(`/${countryCode}/cart`)
  }
}

function getCheckoutStep(cart: any) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}
