"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  selectedVariant?: HttpTypes.StoreProductVariant | null
}

const ImageGallery = ({ images, selectedVariant }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // Filter images based on selected variant if available
  const displayImages = selectedVariant?.images?.length 
    ? selectedVariant.images 
    : images

  // Fallback to product images if variant has no images
  const finalImages = displayImages.length > 0 ? displayImages : images

  if (!finalImages || finalImages.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No image available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main Image Display */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white">
        {finalImages[selectedImageIndex]?.url && (
          <Image
            src={finalImages[selectedImageIndex].url}
            alt={`Product image ${selectedImageIndex + 1}`}
            fill
            priority
            className="object-cover transition-all duration-500"
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 600px"
          />
        )}
        
        {/* Image Navigation Arrows */}
        {finalImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex(prev => 
                prev === 0 ? finalImages.length - 1 : prev - 1
              )}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImageIndex(prev => 
                prev === finalImages.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {finalImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            {selectedImageIndex + 1} / {finalImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {finalImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {finalImages.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedImageIndex(index)}
              className={clx(
                "relative aspect-square overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105",
                {
                  "ring-2 ring-orange-500 ring-offset-1 scale-105": index === selectedImageIndex,
                  "hover:ring-2 hover:ring-gray-300": index !== selectedImageIndex,
                }
              )}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 bg-orange-500/20" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Variant Change Indicator */}
      {selectedVariant && selectedVariant.images?.length > 0 && (
        <div className="flex items-center justify-center space-x-2 p-2 bg-green-50 border border-green-200 rounded-lg">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium text-green-800">
            Showing variant images
          </span>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
