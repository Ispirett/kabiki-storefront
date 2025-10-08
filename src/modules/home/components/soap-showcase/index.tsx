"use client"

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { useState, useMemo } from "react"
import { getImageUrl } from "@lib/util/image-loader"

interface SoapShowcaseProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

type ProductTab = "NEW_PRODUCTS" | "TOP_SELLING" | "FEATURED"

const SoapShowcase = ({ products, region }: SoapShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<ProductTab>("NEW_PRODUCTS")
  // Fallback images for products without images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556228578-dd6f8c2e0c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  ]

  // Currency symbol mapping for proper display
  const getCurrencySymbol = (currencyCode: string): string => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€", 
      GBP: "£",
      CAD: "C$",
      AUD: "A$",
      JPY: "¥",
      CNY: "¥",
      INR: "₹",
      KRW: "₩",
      BRL: "R$",
      MXN: "Mex$",
      CHF: "CHF",
      SEK: "kr",
      NOK: "kr",
      DKK: "kr",
      PLN: "zł",
      CZK: "Kč",
      HUF: "Ft",
      RUB: "₽",
      TRY: "₺",
      ZAR: "R",
      SGD: "S$",
      HKD: "HK$",
      NZD: "NZ$",
      THB: "฿",
      MYR: "RM",
      PHP: "₱",
    }
    return symbols[currencyCode.toUpperCase()] || currencyCode.toUpperCase()
  }

  const formatProductPrice = (product: HttpTypes.StoreProduct): string => {
    const variant = product.variants?.[0]
    if (!variant?.calculated_price?.calculated_amount) return ""
    
    const amount = variant.calculated_price.calculated_amount
    // Use region currency first, then variant currency, then fallback to USD
    const currency = region?.currency_code || variant.calculated_price.currency_code || 'USD'
    const symbol = getCurrencySymbol(currency)
    
    // Smart amount detection
    let finalAmount: number
    if (amount >= 1000) {
      // Likely in cents (e.g., 5000 = $50.00)
      finalAmount = amount / 100
    } else {
      // Likely in main currency unit (e.g., 50.00 = $50.00)
      finalAmount = amount
    }
    
    // Format with proper currency symbol
    const formattedAmount = finalAmount.toFixed(2)
    
    // Some currencies have symbol after the amount
    const symbolAfter = ["SEK", "NOK", "DKK", "PLN", "CZK", "HUF"].includes(currency.toUpperCase())
    
    return symbolAfter ? `${formattedAmount} ${symbol}` : `${symbol}${formattedAmount}`
  }

  const getProductCategory = (product: HttpTypes.StoreProduct) => {
    if (product.tags && product.tags.length > 0) {
      return product.tags[0].value.toUpperCase()
    }
    if (product.type) {
      return product.type.value.toUpperCase()
    }
    return "ORGANIC SOAP"
  }

  const getProductImage = (product: HttpTypes.StoreProduct, index: number) => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url
    }
    return fallbackImages[index % fallbackImages.length]
  }

  // Filter and sort products based on active tab (products are already filtered for published)
  const showcaseProducts = useMemo(() => {
    let filteredProducts = [...products]
    
    switch (activeTab) {
      case "NEW_PRODUCTS":
        // Sort by creation date (newest first)
        filteredProducts = filteredProducts.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
          return dateB - dateA
        })
        break
        
      case "TOP_SELLING":
        // Sort by inventory quantity (assuming lower inventory = more sold)
        // Or you could use metadata.sales_count if you track that
        filteredProducts = filteredProducts.sort((a, b) => {
          const aInventory = a.variants?.[0]?.inventory_quantity || 0
          const bInventory = b.variants?.[0]?.inventory_quantity || 0
          return aInventory - bInventory // Lower inventory first (more sold)
        })
        break
        
      case "FEATURED":
        // Filter products with "featured" tag or metadata
        filteredProducts = filteredProducts.filter(product => 
          product.tags?.some(tag => tag.value.toLowerCase().includes('featured')) ||
          product.metadata?.featured === 'true' ||
          product.metadata?.featured === true
        )
        // If no featured products, show products with highest price (premium products)
        if (filteredProducts.length === 0) {
          filteredProducts = [...products].sort((a, b) => {
            const aPrice = a.variants?.[0]?.calculated_price?.calculated_amount || 0
            const bPrice = b.variants?.[0]?.calculated_price?.calculated_amount || 0
            return bPrice - aPrice
          })
        }
        break
    }
    
    return filteredProducts.slice(0, 8)
  }, [products, activeTab])

  // Get product counts for each tab
  const getProductCount = (tabId: ProductTab) => {
    let count = 0
    switch (tabId) {
      case "NEW_PRODUCTS":
        count = products.length
        break
      case "TOP_SELLING":
        count = products.filter(p => p.variants?.[0]?.inventory_quantity !== undefined).length
        break
      case "FEATURED":
        count = products.filter(product => 
          product.tags?.some(tag => tag.value.toLowerCase().includes('featured')) ||
          product.metadata?.featured === 'true' ||
          product.metadata?.featured === true
        ).length
        if (count === 0) count = products.length // Fallback to all products
        break
    }
    return Math.min(count, 8) // Max 8 products shown
  }

  const tabs = [
    { id: "NEW_PRODUCTS" as ProductTab, label: "NEW PRODUCTS", count: getProductCount("NEW_PRODUCTS") },
    { id: "TOP_SELLING" as ProductTab, label: "TOP SELLING", count: getProductCount("TOP_SELLING") },
    { id: "FEATURED" as ProductTab, label: "FEATURED", count: getProductCount("FEATURED") },
  ]

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <Heading level="h2" className="text-4xl font-serif font-light text-gray-800 mb-6">
            Trending Products
          </Heading>
          <div className="flex justify-center space-x-8 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {showcaseProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
            {showcaseProducts.map((product, index) => {
              const price = formatProductPrice(product)
              const category = getProductCategory(product)
              const imageUrl = getProductImage(product, index)
              
              // Determine badge based on active tab
              const getBadge = () => {
                if (activeTab === "NEW_PRODUCTS" && index < 3) {
                  return { text: "NEW", color: "bg-green-500" }
                }
                if (activeTab === "TOP_SELLING" && index < 3) {
                  return { text: "BESTSELLER", color: "bg-red-500" }
                }
                if (activeTab === "FEATURED") {
                  return { text: "FEATURED", color: "bg-purple-500" }
                }
                return null
              }
              
              const badge = getBadge()

              return (
                <div key={`${product.id}-${activeTab}`} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {badge && (
                    <div className={`absolute top-4 left-4 z-10 ${badge.color} text-white text-xs font-bold px-2 py-1 rounded`}>
                      {badge.text}
                    </div>
                  )}
                  
                  <div className="aspect-square relative overflow-hidden">
                    {(() => {
                      const fullImageUrl = getImageUrl(imageUrl)
                      return (
                        <Image
                          src={fullImageUrl}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          unoptimized={fullImageUrl.includes('localhost')}
                        />
                      )
                    })()}
                  </div>
                  
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      {category}
                    </p>
                    <h3 className="text-lg font-medium text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {product.title}
                    </h3>
                    {price && (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">
                          {price}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <LocalizedClientLink href={`/products/${product.handle}`}>
                      <Button 
                        variant="secondary" 
                        className="bg-white text-gray-800 hover:bg-orange-600 hover:text-white px-6 py-2 rounded-full border-none transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Quick View
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Heading level="h3" className="text-xl font-serif font-light text-gray-800 mb-4">
                {activeTab === "FEATURED" 
                  ? "No Featured Products" 
                  : activeTab === "TOP_SELLING" 
                  ? "No Top Selling Products" 
                  : "No New Products"
                }
              </Heading>
              <p className="text-gray-500 text-lg mb-6">
                {activeTab === "FEATURED" 
                  ? "We're currently updating our featured collection. Check back soon!" 
                  : activeTab === "TOP_SELLING" 
                  ? "Sales data is being updated. Please check back later." 
                  : "New products are coming soon. Stay tuned!"
                }
              </p>
              <LocalizedClientLink href="/store">
                <Button 
                  variant="secondary" 
                  className="bg-orange-600 text-white hover:bg-orange-700 px-6 py-2 rounded-full border-none"
                >
                  Browse All Products
                </Button>
              </LocalizedClientLink>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <LocalizedClientLink href="/store">
            <Button 
              variant="secondary" 
              className="bg-orange-600 text-white hover:bg-orange-700 px-8 py-3 rounded-full border-none"
            >
              View All Products
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default SoapShowcase