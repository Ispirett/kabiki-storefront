import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full space-y-8" data-testid="addresses-page-wrapper">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">Shipping Addresses</h1>
        <p className="text-gray-600">
          Manage your delivery addresses for faster checkout. Save multiple addresses 
          to make ordering your favorite organic soaps even more convenient.
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-orange-100">
        <AddressBook customer={customer} region={region} />
      </div>
    </div>
  )
}
