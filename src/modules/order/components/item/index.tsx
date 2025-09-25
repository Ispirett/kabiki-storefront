import { HttpTypes } from "@medusajs/types"
import { Table, Text } from "@medusajs/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100" data-testid="product-row">
      <div className="flex-shrink-0 w-16 h-16">
        <Thumbnail thumbnail={item.thumbnail} size="square" />
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className="font-medium text-gray-900 truncate"
          data-testid="product-name"
        >
          {item.product_title}
        </h4>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </div>

      <div className="flex flex-col items-end text-right">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span data-testid="product-quantity">{item.quantity}</span>
          <span>×</span>
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>

        <div className="font-semibold text-gray-900">
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      </div>
    </div>
  )
}

export default Item
