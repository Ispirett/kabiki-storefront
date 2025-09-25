import { Heading } from "@medusajs/ui"
import Image from "next/image"

const BrandStory = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left Section - Luxurious Organic Soap Collection */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="aspect-square relative mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Luxurious organic soap collection"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-wider text-orange-600 mb-3">
                Nourish Your Skin
              </p>
              <Heading level="h3" className="text-2xl font-serif font-light text-gray-800 mb-4">
                Luxurious Organic
                <br />
                Soap Collection
              </Heading>
              <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors border-b border-gray-300 hover:border-orange-600 pb-1">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Center Section - Pure and Natural Cleansing */}
          <div className="relative">
            <div className="text-center">
              <div className="aspect-square relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Pure and natural cleansing products"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-xs uppercase tracking-wider text-orange-200 mb-2">
                    The Magic of Organic Soap
                  </p>
                  <Heading level="h3" className="text-2xl font-serif font-light">
                    Pure and Natural
                    <br />
                    Cleansing
                  </Heading>
                </div>
              </div>
              <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors border-b border-gray-300 hover:border-orange-600 pb-1">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Right Section - Our Natural Cleansing Solutions */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="aspect-square relative mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Natural cleansing solutions"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-wider text-orange-600 mb-3">
                Purity of Organic Soaps
              </p>
              <Heading level="h3" className="text-2xl font-serif font-light text-gray-800 mb-4">
                Our Natural
                <br />
                Cleansing Solutions
              </Heading>
              <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors border-b border-gray-300 hover:border-orange-600 pb-1">
                SHOP NOW
              </button>
            </div>
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