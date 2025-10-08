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

    // Fetch collections with products included
    const { collections } = await listCollections({
      fields: "*products,+products.images",
      limit: "100",
    }).catch(() => ({ collections: [] }))

    // Fetch products for the showcase
    const { response: productsResponse } = await listProducts({
      queryParams: {
        limit: 20,
        fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags,+type,+images",
      },
      countryCode,
    })

    const publishedProducts = productsResponse.products.filter(product => {
      return !product.status || product.status === "published"
    })

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
