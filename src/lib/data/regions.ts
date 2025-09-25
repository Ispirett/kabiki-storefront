"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  }

  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ regions }) => regions)
    .catch(medusaError)
}

export const retrieveRegion = async (id: string) => {
  try {
    const next = {
      ...(await getCacheOptions(["regions", id].join("-"))),
    }

    return sdk.client
      .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
        method: "GET",
        next,
        cache: "force-cache",
      })
      .then(({ region }) => region)
      .catch((error) => {
        console.warn(`Failed to retrieve region ${id}:`, error)
        return null
      })
  } catch (error) {
    console.warn(`Error retrieving region ${id}:`, error)
    return null
  }
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions || regions.length === 0) {
      console.warn("No regions available")
      return null
    }

    // Clear the map to avoid stale data
    regionMap.clear()

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        if (c?.iso_2) {
          regionMap.set(c.iso_2, region)
        }
      })
    })

    // Try to get the specific region for the country code
    let region = countryCode ? regionMap.get(countryCode.toLowerCase()) : null
    
    // Fallback to US region if available
    if (!region) {
      region = regionMap.get("us") || regionMap.get("US")
    }
    
    // If still no region, use the first available region as fallback
    if (!region && regions.length > 0) {
      console.warn(`No region found for country code ${countryCode}, using first available region`)
      region = regions[0]
    }

    return region
  } catch (e: any) {
    console.warn("Error getting region:", e)
    return null
  }
}
