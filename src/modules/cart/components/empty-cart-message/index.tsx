import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2" data-testid="empty-cart-message">
      <div className="flex flex-col justify-center items-start" data-testid="empty-cart-message">
        <Heading
          level="h1"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
        >
          Cart
        </Heading>
        <Text className="text-large-regular text-ui-fg-base max-w-[32rem] mb-6">
          You don&apos;t have anything in your cart. Let&apos;s change that, use the link below to start browsing our products.
        </Text>
        <div>
          <LocalizedClientLink href="/store">
            <>Explore products</>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default EmptyCartMessage
