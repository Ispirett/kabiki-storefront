import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

interface FeaturedCollectionsProps {
  collections: HttpTypes.StoreCollection[]
}

const FeaturedCollections = ({ collections }: FeaturedCollectionsProps) => {
  const collectionImages = [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  ]

  // Sample collections if none exist in backend
  const sampleCollections = [
    {
      id: "sample-1",
      title: "Luxury Spa Collection",
      handle: "luxury-spa",
      metadata: {
        description: "Indulge in our premium spa-quality organic soaps, crafted with the finest natural ingredients for the ultimate luxury experience."
      }
    },
    {
      id: "sample-2", 
      title: "Essential Daily Care",
      handle: "daily-care",
      metadata: {
        description: "Perfect for everyday use, these gentle organic soaps cleanse and nourish your skin with natural botanicals."
      }
    },
    {
      id: "sample-3",
      title: "Aromatherapy Blends",
      handle: "aromatherapy",
      metadata: {
        description: "Transform your daily routine with our therapeutic essential oil blends that soothe both body and mind."
      }
    }
  ]

  // Use real collections if available, otherwise show samples
  const displayCollections = collections.length > 0 ? collections.slice(0, 3) : sampleCollections
  const isUsingSamples = collections.length === 0
  


  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading level="h2" className="text-4xl lg:text-5xl font-serif font-light text-gray-800 mb-6">
            Featured Collections
          </Heading>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our carefully curated collections, each telling a unique story of natural beauty and sustainable luxury.
          </p>
          <LocalizedClientLink href="/collections">
            <Button 
              variant="secondary" 
              className="bg-transparent text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-full border-2 border-orange-600 transition-all duration-300"
            >
              View All Collections
            </Button>
          </LocalizedClientLink>
        </div>



        {/* Featured Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayCollections.map((collection, index) => {
            const isMainFeature = index === 0
            const collectionDescription = collection.metadata?.description || 
              `Discover our ${collection.title.toLowerCase()} collection featuring handcrafted organic soaps.`

            return (
              <div
                key={collection.id}
                className={`${
                  isMainFeature ? 'lg:col-span-2 lg:row-span-2' : ''
                } group relative`}
              >
                <LocalizedClientLink href={isUsingSamples ? "/store" : `/collections/${collection.handle}`}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                    <div className={`${isMainFeature ? 'aspect-[16/10]' : 'aspect-square'} relative overflow-hidden`}>
                      <Image
                        src={collectionImages[index % collectionImages.length]}
                        alt={collection.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Featured Badge */}
                      {isMainFeature && (
                        <div className="absolute top-6 left-6">
                          <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                            ✨ Featured
                          </span>
                        </div>
                      )}
                      
                      {/* Collection Content */}
                      <div className={`absolute bottom-0 left-0 right-0 ${isMainFeature ? 'p-8' : 'p-6'} text-white`}>
                        <Heading 
                          level="h3" 
                          className={`${isMainFeature ? 'text-3xl lg:text-4xl mb-4' : 'text-xl mb-3'} font-serif font-light group-hover:text-orange-200 transition-colors`}
                        >
                          {collection.title}
                        </Heading>
                        
                        {isMainFeature && (
                          <p className="text-gray-200 mb-6 text-lg leading-relaxed max-w-2xl">
                            {collectionDescription}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className={`${isMainFeature ? 'text-base' : 'text-sm'} text-orange-200 uppercase tracking-wider font-medium`}>
                            Explore Collection
                          </span>
                          <svg className="w-6 h-6 text-orange-200 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Collection Features */}
                    {!isMainFeature && (
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50">
                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Organic
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Handcrafted
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </LocalizedClientLink>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 lg:p-12 text-white">
            <Heading level="h3" className="text-2xl lg:text-3xl font-serif font-light mb-4">
              Can't Find What You're Looking For?
            </Heading>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Browse our complete product catalog or contact us for custom soap creations tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedClientLink href="/store">
                <Button 
                  variant="secondary" 
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full border-none font-medium"
                >
                  Browse All Products
                </Button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/account">
                <Button 
                  variant="secondary" 
                  className="bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-full border-2 border-white font-medium"
                >
                  Contact Us
                </Button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCollections