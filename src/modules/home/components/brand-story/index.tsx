import { Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getImageUrl } from "@lib/util/image-loader"

interface BrandStoryProps {
  collections?: HttpTypes.StoreCollection[]
}

const BrandStory = ({ collections = [] }: BrandStoryProps) => {
  // Fallback images from local collections folder
  const fallbackImages = [
    "/images/collections/Lemon Soap.jpg",
    "/images/collections/Coconut Milk Soap.jpg",
    "/images/collections/cinamon soap.jpg",
  ]
  
  const subtitles = [
    "Nourish Your Skin",
    "The Magic of Organic Soap",
    "Purity of Organic Soaps"
  ]
  
  // Use actual collections if available (minimum 3)
  const displayCollections = collections.slice(0, 3)
  const hasCollections = displayCollections.length >= 3
  
  // Get image for a collection - from product or fallback
  const getCollectionImage = (collection: HttpTypes.StoreCollection | undefined, index: number) => {
    if (collection?.products && collection.products.length > 0) {
      const firstProduct = collection.products[0]
      if (firstProduct.images && firstProduct.images.length > 0) {
        return getImageUrl(firstProduct.images[0].url)
      }
    }
    return fallbackImages[index % fallbackImages.length]
  }
  
  const collectionData = hasCollections
    ? displayCollections.map((col, idx) => ({
        title: col.title,
        subtitle: subtitles[idx],
        image: getCollectionImage(col, idx),
        handle: col.handle
      }))
    : [
        {
          title: "Explore Our\nCollections",
          subtitle: subtitles[0],
          image: fallbackImages[0],
          handle: "store"
        },
        {
          title: "Handcrafted\nWith Love",
          subtitle: subtitles[1],
          image: fallbackImages[1],
          handle: "store"
        },
        {
          title: "Natural\nIngredients",
          subtitle: subtitles[2],
          image: fallbackImages[2],
          handle: "store"
        }
      ]
  return (
    <div className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left Section */}
          <div className="relative">
            <LocalizedClientLink href={hasCollections ? `/collections/${collectionData[0].handle}` : "/store"}>
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-square relative mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={collectionData[0].image}
                    alt={collectionData[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs uppercase tracking-wider text-orange-600 mb-3">
                  {collectionData[0].subtitle}
                </p>
                <Heading level="h3" className="text-2xl font-serif font-light text-gray-800 mb-4">
                  {collectionData[0].title.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </Heading>
                <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors border-b border-gray-300 hover:border-orange-600 pb-1">
                  SHOP NOW
                </button>
              </div>
            </LocalizedClientLink>
          </div>

          {/* Center Section */}
          <div className="relative">
            <LocalizedClientLink href={hasCollections ? `/collections/${collectionData[1].handle}` : "/store"}>
              <div className="text-center">
                <div className="aspect-square relative mb-8 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                  <Image
                    src={collectionData[1].image}
                    alt={collectionData[1].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-xs uppercase tracking-wider text-orange-200 mb-2">
                      {collectionData[1].subtitle}
                    </p>
                    <Heading level="h3" className="text-2xl font-serif font-light">
                      {collectionData[1].title.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </Heading>
                  </div>
                </div>
                <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors border-b border-gray-300 hover:border-orange-600 pb-1">
                  SHOP NOW
                </button>
              </div>
            </LocalizedClientLink>
          </div>

          {/* Right Section */}
          <div className="relative">
            <LocalizedClientLink href={hasCollections ? `/collections/${collectionData[2].handle}` : "/store"}>
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-square relative mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={collectionData[2].image}
                    alt={collectionData[2].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs uppercase tracking-wider text-orange-600 mb-3">
                  {collectionData[2].subtitle}
                </p>
                <Heading level="h3" className="text-2xl font-serif font-light text-gray-800 mb-4">
                  {collectionData[2].title.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </Heading>
                <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors border-b border-gray-300 hover:border-orange-600 pb-1">
                  SHOP NOW
                </button>
              </div>
            </LocalizedClientLink>
          </div>

        </div>

        {/* Brand Quote Section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Heading level="h2" className="text-3xl lg:text-4xl font-serif font-light text-gray-800 mb-8 leading-relaxed">
              "Experience The Purity Of Nature With Our Organic Soaps, Handcrafted With Love To Nourish Your Skin And Protect The Planet."
            </Heading>
            
            {/* Brand Values Icons */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mt-12">
              {[
                { label: "Native", color: "bg-pink-100 text-pink-700" },
                { label: "Natural", color: "bg-orange-100 text-orange-700" },
                { label: "Vegan", color: "bg-blue-100 text-blue-700" },
                { label: "Herbs", color: "bg-purple-100 text-purple-700" },
                { label: "Aroma", color: "bg-pink-100 text-pink-700" },
                { label: "Raw", color: "bg-blue-100 text-blue-700" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandStory