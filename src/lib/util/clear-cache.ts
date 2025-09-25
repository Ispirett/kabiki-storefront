"use server"

import { revalidateTag } from "next/cache"

/**
 * Clear cached data for regions and products
 */
export async function clearRegionCache() {
  try {
    // Clear region-related cache tags
    revalidateTag("regions")
    revalidateTag("products")
    
    // Clear any specific region cache tags
    const regionTags = [
      "regions-us",
      "regions-ca", 
      "regions-gb",
      "regions-eu",
      "regions-au"
    ]
    
    regionTags.forEach(tag => {
      revalidateTag(tag)
    })
    
    console.log("Cache cleared successfully")
  } catch (error) {
    console.error("Error clearing cache:", error)
  }
}

/**
 * Clear all product-related cache
 */
export async function clearProductCache() {
  try {
    revalidateTag("products")
    console.log("Product cache cleared successfully")
  } catch (error) {
    console.error("Error clearing product cache:", error)
  }
}