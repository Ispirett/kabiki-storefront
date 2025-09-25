"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"


type ProductTabsProps = {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
}

const ProductTabs = ({ product, region }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} region={region} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product, region }: ProductTabsProps) => {
  return (
    <div className="py-6 space-y-6">
      {/* Ingredients Section */}
      <div className="bg-white rounded-2xl p-6 border border-orange-200">
        <h3 className="text-lg font-serif font-light text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Natural Ingredients
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Our organic soaps are crafted with premium natural ingredients including organic oils, 
          botanical extracts, and essential oils. Each bar is carefully formulated to nourish and 
          protect your skin while providing a luxurious cleansing experience.
        </p>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
            <span className="font-semibold text-gray-900 block mb-1">Soap Type</span>
            <p className="text-gray-700">{product.type ? product.type.value : "Handcrafted Organic Soap"}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <span className="font-semibold text-gray-900 block mb-1">Origin</span>
            <p className="text-gray-700">{product.origin_country ? product.origin_country : "Handcrafted with Love"}</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <span className="font-semibold text-gray-900 block mb-1">Materials</span>
            <p className="text-gray-700">{product.material ? product.material : "100% Natural & Organic"}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <span className="font-semibold text-gray-900 block mb-1">Weight</span>
            <p className="text-gray-700">{product.weight ? `${product.weight} g` : "Standard Size"}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
            <span className="font-semibold text-gray-900 block mb-1">Dimensions</span>
            <p className="text-gray-700">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "Perfect for daily use"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
            <span className="font-semibold text-gray-900 block mb-1">Skin Type</span>
            <p className="text-gray-700">Suitable for all skin types</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
        <h3 className="text-lg font-serif font-light text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Skin Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Deeply moisturizing</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Gentle cleansing</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Natural aromatherapy</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Eco-friendly formula</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-6 space-y-6">
      {/* Shipping Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FastDelivery className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your organic soaps will arrive in 3-5 business days, carefully packaged 
            to preserve their natural qualities.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Refresh className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Simple Exchanges</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Not satisfied with your soap? We'll exchange it for another variety 
            from our organic collection.
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Back className="text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            30-day money-back guarantee. Return your soap for a full refund, 
            no questions asked.
          </p>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-serif font-light text-gray-900 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Domestic Shipping</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Standard: 3-5 business days</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Express: 1-2 business days</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Free shipping on orders over $50</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Packaging</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Eco-friendly packaging materials</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Protective wrapping for soap bars</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Recyclable shipping materials</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Care Instructions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="text-lg font-serif font-light text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Care Instructions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <span className="font-medium text-gray-900 block">Storage</span>
              <span className="text-sm text-gray-600">Keep in a dry, well-ventilated area</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <span className="font-medium text-gray-900 block">Usage</span>
              <span className="text-sm text-gray-600">Use with warm water for best results</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <span className="font-medium text-gray-900 block">Longevity</span>
              <span className="text-sm text-gray-600">Allow to dry between uses</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <span className="font-medium text-gray-900 block">Shelf Life</span>
              <span className="text-sm text-gray-600">Best used within 12 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
