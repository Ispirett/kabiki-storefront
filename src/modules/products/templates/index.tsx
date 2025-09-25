import React, { Suspense } from "react"

import ProductGalleryWrapper from "@modules/products/components/product-gallery-wrapper"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Product Hero Section */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-amber-600/5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Product Images */}
            <div className="order-2 lg:order-1">
              <div className="relative bg-white rounded-3xl shadow-xl p-6 lg:p-8">
                <ProductGalleryWrapper product={product} />
                
                {/* Quality Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-full shadow-lg z-10">
                  <span className="text-xs font-bold uppercase tracking-wider">Premium</span>
                </div>
              </div>
            </div>

            {/* Product Information & Actions */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Product Info Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl">
                <ProductInfo product={product} />
              </div>
              
              {/* Product Actions Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl">
                <Suspense
                  fallback={
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  }
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-serif font-light text-gray-900 mb-4 text-center">
                  Why Choose Kabiki?
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">100% Organic</span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Handcrafted</span>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Cruelty Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="bg-white py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-4xl font-serif font-light text-gray-800 mb-4">
              Product Details & Ingredients
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the natural ingredients and artisan craftsmanship behind this luxurious organic soap
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 lg:p-10 shadow-lg border border-orange-100">
            <ProductTabs product={product} region={region} />
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-gradient-to-br from-gray-50 to-orange-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-4xl font-serif font-light text-gray-800 mb-4">
              You Might Also Love
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover more handcrafted organic soaps from our collection
            </p>
          </div>
          
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
