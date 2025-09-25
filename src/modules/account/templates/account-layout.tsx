import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" data-testid="account-page">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
              My Account
            </h1>
            <p className="text-lg text-gray-600">
              Manage your profile, orders, and preferences for your natural skincare journey
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {customer && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <AccountNav customer={customer} />
              </div>
            )}
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            {children}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-light text-white">Need Help?</h3>
                </div>
                <p className="text-orange-100 leading-relaxed mb-4 lg:mb-0">
                  Find answers to frequently asked questions about your organic soap orders,
                  shipping, skincare tips, and ingredient information on our customer service page.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/customer-service"
                  className="inline-flex items-center justify-center bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                  Customer Service
                </a>
                <a
                  href="tel:+18683680893"
                  className="inline-flex items-center justify-center bg-white/10 text-white hover:bg-white/20 px-6 py-3 rounded-full font-semibold transition-all duration-300 border border-white/30 text-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Help Links */}
          <div className="bg-white/10 px-8 py-6 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/shipping-info" className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-300 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Shipping Info
              </a>
              <a href="/returns" className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-300 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Returns
              </a>
              <a href="/skincare-guide" className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-300 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Skincare Guide
              </a>
              <a href="/ingredients" className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors duration-300 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Ingredients
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
