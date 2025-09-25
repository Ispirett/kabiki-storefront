"use client"

import { HttpTypes } from "@medusajs/types"
import { useState, useEffect } from "react"
import ImageGallery from "../image-gallery"

type ProductGalleryWrapperProps = {
  product: HttpTypes.StoreProduct
}

const ProductGalleryWrapper = ({ product }: ProductGalleryWrapperProps) => {
  const [selectedVariant, setSelectedVariant] = useState<HttpTypes.StoreProductVariant | null>(null)

  // Listen for variant changes from the product actions
  useEffect(() => {
    const handleVariantChange = (event: any) => {
      if (event.detail && event.detail.variant !== undefined) {
        setSelectedVariant(event.detail.variant)
      }
    }

    window.addEventListener('variantChanged', handleVariantChange)
    
    return () => {
      window.removeEventListener('variantChanged', handleVariantChange)
    }
  }, [])

  // Set initial variant if there's only one
  useEffect(() => {
    if (product.variants?.length === 1) {
      setSelectedVariant(product.variants[0])
    }
  }, [product.variants])

  return (
    <ImageGallery 
      images={product?.images || []} 
      selectedVariant={selectedVariant}
    />
  )
}

export default ProductGalleryWrapper