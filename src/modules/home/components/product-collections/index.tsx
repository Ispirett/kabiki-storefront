import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

interface ProductCollectionsProps {
  collections: HttpTypes.StoreCollection[]
}

const ProductCollections = ({ collections }: ProductCollectionsProps) => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Luxurious Organic Soap Collection */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Luxurious organic soap collection with natural ingredients"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-xs uppercase tracking-wider text-orange-200 mb-3">
                  Nourish Your Skin
                </p>
                <Heading level="h3" className="text-2xl font-serif font-light mb-6">
                  {collections[0] ? collections[0].title : "Luxurious Organic Soap Collection"}
                </Heading>
                <LocalizedClientLink href={collections[0] ? `/collections/${collections[0].handle}` : "/store"}>
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

          {/* Pure and Natural Cleansing */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Pure and natural cleansing soaps with organic ingredients"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
                <p className="text-xs uppercase tracking-wider text-orange-200 mb-3">
                  The Magic of Organic Soap
                </p>
                <Heading level="h3" className="text-2xl font-serif font-light mb-6">
                  {collections[1] ? collections[1].title : "Pure and Natural Cleansing"}
                </Heading>
                <LocalizedClientLink href={collections[1] ? `/collections/${collections[1].handle}` : "/store"}>
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

          {/* Our Natural Cleansing Solutions */}
          <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Natural cleansing solutions with organic soap bars"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-xs uppercase tracking-wider text-orange-200 mb-3">
                  Purity of Organic Soaps
                </p>
                <Heading level="h3" className="text-2xl font-serif font-light mb-6">
                  {collections[2] ? collections[2].title : "Our Natural Cleansing Solutions"}
                </Heading>
                <LocalizedClientLink href={collections[2] ? `/collections/${collections[2].handle}` : "/store"}>
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

        </div>
      </div>
    </div>
  )
}

export default ProductCollections