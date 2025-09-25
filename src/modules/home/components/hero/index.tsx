import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Full-width Hero Background */}
      <div className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-yellow-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-amber-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-10 w-36 h-36 bg-orange-300 rounded-full blur-3xl"></div>
          </div>
          
          {/* Hero background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')`
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[90vh] px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="bg-white/95 backdrop-blur-md p-8 lg:p-12 rounded-3xl shadow-2xl">
                <p className="text-sm uppercase tracking-wider text-orange-600 mb-4 font-medium">
                  Luxurious Care • Natural Ingredients • Handcrafted
                </p>
                <Heading
                  level="h1"
                  className="text-4xl lg:text-6xl font-serif font-light text-gray-800 mb-6 leading-tight"
                >
                  Luxurious
                  <br />
                  <span className="text-orange-600">Organic Soaps</span>
                </Heading>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Experience the purity of nature with our handcrafted organic soaps, 
                  made with love to nourish your skin and protect the planet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <LocalizedClientLink href="/store">
                    <Button 
                      variant="secondary" 
                      className="bg-orange-600 text-white hover:bg-orange-700 px-8 py-4 rounded-full border-none text-lg font-medium w-full sm:w-auto"
                    >
                      Shop Now
                    </Button>
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/collections">
                    <Button 
                      variant="secondary" 
                      className="bg-transparent text-gray-800 hover:bg-white/20 px-8 py-4 rounded-full border-2 border-gray-800 hover:border-orange-600 hover:text-orange-600 text-lg font-medium w-full sm:w-auto transition-all duration-300"
                    >
                      View Collections
                    </Button>
                  </LocalizedClientLink>
                </div>
              </div>
            </div>

            {/* Right Content - Product Showcase */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                      alt="Handcrafted organic soap bars"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-serif text-lg text-gray-800 mb-2">Natural Ingredients</h3>
                    <p className="text-sm text-gray-600">Made with pure organic botanicals</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                      alt="Spa wellness setting"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-serif text-lg text-gray-800 mb-2">Wellness Experience</h3>
                    <p className="text-sm text-gray-600">Transform your daily routine</p>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                      alt="Artisan soap making"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-serif text-lg text-gray-800 mb-2">Handcrafted</h3>
                    <p className="text-sm text-gray-600">Each bar made with care and love</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                      alt="Eco-friendly packaging"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-serif text-lg text-gray-800 mb-2">Eco-Friendly</h3>
                    <p className="text-sm text-gray-600">Sustainable and planet-conscious</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Brand Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              "Experience The Purity Of Nature With Our Organic Soaps, Handcrafted With Love To Nourish Your Skin And Protect The Planet."
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
            {[
              { label: "Native", color: "bg-pink-100" },
              { label: "Natural", color: "bg-orange-100" },
              { label: "Vegan", color: "bg-blue-100" },
              { label: "Herbs", color: "bg-purple-100" },
              { label: "Aroma", color: "bg-pink-100" },
              { label: "Raw", color: "bg-blue-100" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-3`}>
                  <span className="text-xs font-medium text-gray-700">{item.label.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
