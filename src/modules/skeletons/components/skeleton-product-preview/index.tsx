import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="aspect-[4/5] w-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
        
        {/* Content skeleton */}
        <div className="p-6 space-y-3">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          
          {/* Price and button skeleton */}
          <div className="flex items-center justify-between pt-2">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
          
          {/* Tags skeleton */}
          <div className="flex gap-2 pt-2">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
