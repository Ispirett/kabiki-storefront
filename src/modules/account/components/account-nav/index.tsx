"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      {/* Mobile Navigation */}
      <div className="lg:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-3 text-gray-700 hover:text-orange-600 py-3 px-6 transition-colors duration-300"
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90 text-orange-600" />
            <span className="font-medium">Back to Account</span>
          </LocalizedClientLink>
        ) : (
          <div className="p-6">
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 mb-6 text-white">
              <h2 className="text-xl font-serif font-light mb-1">
                Welcome back,
              </h2>
              <p className="text-2xl font-semibold text-orange-100">
                {customer?.first_name}
              </p>
            </div>
            <nav>
              <ul className="space-y-2">
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-orange-50 transition-colors duration-300 group"
                    data-testid="profile-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                        <User size={20} className="text-orange-600" />
                      </div>
                      <span className="font-medium text-gray-900">Profile</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400 group-hover:text-orange-600 transition-colors duration-300" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-orange-50 transition-colors duration-300 group"
                    data-testid="addresses-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                        <MapPin size={20} className="text-orange-600" />
                      </div>
                      <span className="font-medium text-gray-900">Addresses</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400 group-hover:text-orange-600 transition-colors duration-300" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-orange-50 transition-colors duration-300 group"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                        <Package size={20} className="text-orange-600" />
                      </div>
                      <span className="font-medium text-gray-900">Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400 group-hover:text-orange-600 transition-colors duration-300" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-red-50 transition-colors duration-300 group w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                        <ArrowRightOnRectangle size={20} className="text-red-600" />
                      </div>
                      <span className="font-medium text-gray-900">Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-gray-400 group-hover:text-red-600 transition-colors duration-300" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block" data-testid="account-nav">
        <div className="p-6">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-6 mb-6 text-white">
            <h2 className="text-lg font-serif font-light mb-1">
              Welcome back,
            </h2>
            <p className="text-xl font-semibold text-orange-100">
              {customer?.first_name}
            </p>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className="space-y-2">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                  icon={<User size={20} />}
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                  icon={<User size={20} />}
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                  icon={<MapPin size={20} />}
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                  icon={<Package size={20} />}
                >
                  Orders
                </AccountNavLink>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-x-3 py-3 px-4 rounded-xl hover:bg-red-50 transition-colors duration-300 group w-full text-left"
                  data-testid="logout-button"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                    <ArrowRightOnRectangle size={20} className="text-red-600" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                    Log out
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  icon: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  icon,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "flex items-center gap-x-3 py-3 px-4 rounded-xl transition-colors duration-300 group",
        {
          "bg-orange-100 text-orange-700": active,
          "text-gray-700 hover:bg-orange-50 hover:text-orange-600": !active,
        }
      )}
      data-testid={dataTestId}
    >
      <div className={clx(
        "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
        {
          "bg-orange-200": active,
          "bg-orange-100 group-hover:bg-orange-200": !active,
        }
      )}>
        <div className={clx("transition-colors duration-300", {
          "text-orange-700": active,
          "text-orange-600": !active,
        })}>
          {icon}
        </div>
      </div>
      <span className={clx("font-medium transition-colors duration-300", {
        "text-orange-700": active,
        "text-gray-700 group-hover:text-orange-600": !active,
      })}>
        {children}
      </span>
    </LocalizedClientLink>
  )
}

export default AccountNav
