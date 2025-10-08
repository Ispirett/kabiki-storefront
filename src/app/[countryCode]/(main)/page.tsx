import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import ProductCollections from "@modules/home/components/product-collections"
import SoapShowcase from "@modules/home/components/soap-showcase"
import BrandStory from "@modules/home/components/brand-story"
import FeaturedCollections from "@modules/home/components/featured-collections"

import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Kabiki - Luxurious Organic Soaps",
  description:
    "Experience the purity of nature with our organic soaps, handcrafted with love to nourish your skin and protect the planet.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  try {
    const region = await getRegion(countryCode)

    const { collections } = await listCollections({
      fields: "id, handle, title, metadata",
      limit: "100",
    }).catch(() => ({ collections: [] }))

    // Fetch products for the showcase (will filter for published on client side)
    const { response: productsResponse } = await listProducts({
      queryParams: {
        limit: 20, // Fetch more to account for filtering
        fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags,+type,+images",
      },
      countryCode,
    })

    // Filter for published products only (defensive filtering)
    const publishedProducts = productsResponse.products.filter(product => {
      // In Medusa v2, products are published by default if they're returned by the store API
      // But we can check for status field if it exists
      return !product.status || product.status === "published"
    })

    // Create a fallback region if none found
    const fallbackRegion = region || {
      id: 'fallback',
      name: 'Default Region',
      currency_code: 'USD',
      countries: []
    }

    return (
      <>
        <Hero />
        <SoapShowcase products={publishedProducts} region={fallbackRegion} />
        <FeaturedCollections collections={collections || []} />
        <ProductCollections collections={collections || []} />
        <BrandStory />
      </>
    )
  } catch (error) {
    console.error("Error loading home page:", error)
    
    // Fallback content when there are errors
    return (
      <>
        <Hero />
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-4">
              Loading Products...
            </h2>
            <p className="text-gray-600">
              We're currently updating our product catalog. Please check back soon!
            </p>
          </div>
        </div>
        <BrandStory />
      </>
    )
  }
}
