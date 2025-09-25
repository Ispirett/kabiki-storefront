import { Metadata } from "next"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Collections | Kabiki - Organic Soaps",
  description: "Explore our curated collections of handcrafted organic soaps, each made with love and natural ingredients.",
}

export default async function CollectionsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  
  const { collections } = await listCollections({
    fields: "id, handle, title, metadata",
    limit: "100",
  })

  console.log("Collections page - collections:", collections)
  console.log("Collections page - collections length:", collections?.length)

  console.log("Collections page - region:", region)
  console.log("Collections page - countryCode:", countryCode)

  if (!region) {
    return <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-red-600">Region Error</h2>
      <p className="text-gray-600">Unable to load region for country: {countryCode}</p>
    </div>
  }

  if (!collections) {
    return <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-red-600">Collections Error</h2>
      <p className="text-gray-600">Unable to load collections</p>
    </div>
  }

  const collectionImages = [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider">
                Handcrafted Excellence
              </span>
            </div>
            <Heading level="h1" className="text-5xl lg:text-7xl font-serif font-light text-gray-900 mb-8 leading-tight">
              Our Luxury
              <br />
              <span className="text-orange-600">Collections</span>
            </Heading>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Discover our curated collections of handcrafted organic soaps, each thoughtfully created with premium natural ingredients to transform your daily ritual into a luxurious spa experience.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Collections Showcase */}
      <div className="relative max-w-7xl mx-auto px-4 pb-24">
        


        {collections && collections.length > 0 ? (
          <>
            {/* Collections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {collections.map((collection, index) => {
                const collectionDescription = collection.metadata?.description || 
                  `Discover our ${collection.title.toLowerCase()} collection featuring handcrafted organic soaps made with premium natural ingredients.`
                
                const isEven = index % 2 === 0
                
                return (
                  <LocalizedClientLink
                    key={collection.id}
                    href={`/collections/${collection.handle}`}
                    className="group"
                  >
                    <div className={`relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 ${isEven ? 'lg:mt-12' : 'lg:mb-12'}`}>
                      {/* Premium Badge */}
                      <div className="absolute top-6 left-6 z-20">
                        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-full shadow-lg">
                          <span className="text-xs font-bold uppercase tracking-wider">Premium Collection</span>
                        </div>
                      </div>
                      
                      {/* Collection Image */}
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <Image
                          src={collectionImages[index % collectionImages.length]}
                          alt={collection.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Floating Elements */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Collection Content */}
                      <div className="p-8 lg:p-10">
                        <div className="mb-6">
                          <Heading level="h2" className="text-3xl lg:text-4xl font-serif font-light text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                            {collection.title}
                          </Heading>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {collectionDescription}
                          </p>
                        </div>
                        
                        {/* Collection Features */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">100% Organic</span>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Handcrafted</span>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Premium</span>
                          </div>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-orange-600 font-semibold text-lg">Explore Collection</span>
                            <svg className="w-6 h-6 text-orange-600 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-full text-sm font-medium">
                              Shop Now
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </LocalizedClientLink>
                )
              })}
            </div>
            
            {/* Call to Action Section */}
            <div className="text-center bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
              <Heading level="h2" className="text-3xl lg:text-4xl font-serif font-light mb-6">
                Experience Luxury in Every Lather
              </Heading>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Each collection represents our commitment to sustainable luxury and natural beauty. Discover the perfect soap for your unique skincare needs.
              </p>
              <LocalizedClientLink href="/store">
                <div className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-colors duration-300 shadow-lg">
                  Browse All Products
                </div>
              </LocalizedClientLink>
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <Heading level="h2" className="text-4xl font-serif font-light text-gray-800 mb-6">
                Collections Coming Soon
              </Heading>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We're carefully curating our luxury collections of handcrafted organic soaps. Each collection will tell a unique story of natural beauty and sustainable luxury.
              </p>
              <LocalizedClientLink href="/store">
                <div className="inline-block bg-gradient-to-r from-orange-600 to-amber-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Explore Our Products
                </div>
              </LocalizedClientLink>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}