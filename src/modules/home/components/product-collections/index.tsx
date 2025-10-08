import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { getImageUrl } from "@lib/util/image-loader"

interface ProductCollectionsProps {
  collections: HttpTypes.StoreCollection[]
}

const ProductCollections = ({ collections }: ProductCollectionsProps) => {
  // Fallback images only if product has no image
  const fallbackImages = [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  ]

  // Get image from collection's first product, or use fallback
  const getCollectionImage = (collection: HttpTypes.StoreCollection | undefined, index: number) => {
    if (collection?.products && collection.products.length > 0) {
      const firstProduct = collection.products[0]
      if (firstProduct.images && firstProduct.images.length > 0) {
        return firstProduct.images[0].url
      }
    }
    return fallbackImages[index % fallbackImages.length]
  }

  const displayCollections = collections.slice(0, 3)

  return (
    <div className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {displayCollections.map((collection, index) => {
            const subtitles = [
              "Nourish Your Skin",
              "The Magic of Organic Soap",
              "Purity of Organic Soaps"
            ]
            
            const imageUrl = getImageUrl(getCollectionImage(collection, index))
            
            return (
              <div key={collection.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-square relative">
                  <Image
                    src={imageUrl}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized={imageUrl.includes('localhost')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className={`absolute bottom-0 left-0 right-0 p-8 text-white ${index === 1 ? 'text-center' : ''}`}>
                    <p className="text-xs uppercase tracking-wider text-orange-200 mb-3">
                      {subtitles[index]}
                    </p>
                    <Heading level="h3" className="text-2xl font-serif font-light mb-6">
                      {collection.title}
                    </Heading>
                    <LocalizedClientLink href={`/collections/${collection.handle}`}>
                      <Button 
                        variant="secondary" 
                        className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white px-6 py-2 rounded-full text-sm border-none"
                      >
                        SHOP NOW
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default ProductCollections