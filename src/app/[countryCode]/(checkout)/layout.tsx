import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative min-h-screen">
      <div className="h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-gray-700 hover:text-orange-600 flex items-center gap-x-2 transition-colors duration-300 flex-1 basis-0 group"
            data-testid="back-to-cart-link"
          >
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-orange-100 transition-colors duration-300">
              <ChevronDown className="rotate-90" size={16} />
            </div>
            <span className="hidden small:block font-medium">
              Back to Cart
            </span>
            <span className="block small:hidden font-medium">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-serif text-3xl font-light text-gray-900 hover:text-orange-600 transition-colors duration-300"
            data-testid="store-link"
          >
            Kabiki
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-8 w-full flex items-center justify-center bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <MedusaCTA />
      </div>
    </div>
  )
}
