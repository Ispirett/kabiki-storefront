import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full px-6">
          
          {/* Left Section - Mobile Menu */}
          <div className="flex items-center lg:flex-1">
            <div className="lg:hidden">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="flex items-center justify-center lg:justify-start lg:flex-1">
            <LocalizedClientLink
              href="/"
              className="font-serif text-3xl font-light text-gray-900 hover:text-orange-600 transition-colors duration-300"
              data-testid="nav-store-link"
            >
              Kabiki
            </LocalizedClientLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8 flex-1">
            <LocalizedClientLink
              className="text-gray-700 hover:text-orange-600 font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative group"
              href="/"
              data-testid="nav-home-link"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-gray-700 hover:text-orange-600 font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative group"
              href="/store"
              data-testid="nav-shop-link"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="text-gray-700 hover:text-orange-600 font-medium text-sm uppercase tracking-wider transition-colors duration-300 relative group"
              href="/collections"
              data-testid="nav-collections-link"
            >
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
            </LocalizedClientLink>
          </div>

          {/* Right Section - Contact, Account & Cart */}
          <div className="flex items-center justify-end space-x-4 lg:space-x-6 lg:flex-1">
            
            {/* Phone Number - Hidden on mobile */}
            <a href="tel:+18683680893" className="hidden lg:flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 whitespace-nowrap">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">(868) 368-0893</span>
            </a>

            {/* Account Link - Desktop */}
            <LocalizedClientLink
              className="hidden xl:flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium text-sm uppercase tracking-wider transition-colors duration-300 whitespace-nowrap"
              href="/account"
              data-testid="nav-account-link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Account</span>
            </LocalizedClientLink>

            {/* Cart Button */}
            <div className="flex items-center">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-300"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span className="hidden sm:inline text-sm font-medium">Cart (0)</span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
