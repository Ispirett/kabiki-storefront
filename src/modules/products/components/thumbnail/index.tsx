import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"
import { getImageUrl } from "@lib/util/image-loader"

type ThumbnailProps = {
  thumbnail?: string | null
  // TODO: Fix image typings
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={clx(
        "relative w-full overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50",
        className,
        {
          "aspect-[4/5]": isFeatured,
          "aspect-[4/5]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  const imageUrl = getImageUrl(image)
  
  return imageUrl ? (
    <Image
      src={imageUrl}
      alt="Product Image"
      className="absolute inset-0 object-cover object-center transition-transform duration-300"
      draggable={false}
      quality={75}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
      unoptimized={imageUrl.includes('localhost')}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
      <div className="text-center">
        <PlaceholderImage size={size === "small" ? 16 : 24} />
        <p className="text-xs text-gray-500 mt-2">No Image</p>
      </div>
    </div>
  )
}

export default Thumbnail
