"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  try {
    if (!countryCode && !regionId) {
      console.warn("Country code or region ID is required")
      return {
        response: { products: [], count: 0 },
        nextPage: null,
      }
    }

    const limit = queryParams?.limit || 12
    const _pageParam = Math.max(pageParam, 1)
    const offset = (_pageParam === 1) ? 0 : (_pageParam - 1) * limit;

    let region: HttpTypes.StoreRegion | undefined | null

    if (countryCode) {
      region = await getRegion(countryCode)
    } else if (regionId) {
      region = await retrieveRegion(regionId)
    }

    if (!region) {
      console.warn(`No region found for countryCode: ${countryCode}, regionId: ${regionId}`)
      return {
        response: { products: [], count: 0 },
        nextPage: null,
      }
    }

    const headers = {
      ...(await getAuthHeaders()),
    }

    const next = {
      ...(await getCacheOptions("products")),
    }

    const query = {
      limit,
      offset,
      region_id: region.id,
      fields:
        "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
      ...queryParams,
    }

    return sdk.client
      .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
        `/store/products`,
        {
          method: "GET",
          query,
          headers,
          next,
          cache: "force-cache",
        }
      )
      .then(({ products, count }) => {
        const nextPage = count > offset + limit ? pageParam + 1 : null

        return {
          response: {
            products: products || [],
            count: count || 0,
          },
          nextPage: nextPage,
          queryParams,
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
        return {
          response: { products: [], count: 0 },
          nextPage: null,
          queryParams,
        }
      })
  } catch (error) {
    console.error("Error in listProducts:", error)
    return {
      response: { products: [], count: 0 },
      nextPage: null,
      queryParams,
    }
  }
}

/**
 * This will fetch products and sort them based on the sortBy parameter.
 * For price sorting, it fetches all products to sort client-side.
 * For created_at sorting, it uses server-side sorting for better performance.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  // For created_at sorting, we can use server-side sorting
  if (sortBy === "created_at") {
    return await listProducts({
      pageParam: page,
      queryParams: {
        ...queryParams,
        limit,
        order: "-created_at", // Server-side sorting by creation date (newest first)
      },
      countryCode,
    })
  }

  // For price sorting, we need to fetch all products and sort client-side
  // since Medusa doesn't support server-side price sorting yet
  
  // First, get the total count
  const {
    response: { count: totalCount },
  } = await listProducts({
    pageParam: 1,
    queryParams: {
      ...queryParams,
      limit: 1,
    },
    countryCode,
  })

  // Fetch all products for sorting (with a reasonable upper limit for performance)
  const fetchLimit = Math.min(totalCount, 2000) // Increased limit to handle more products
  
  const {
    response: { products },
  } = await listProducts({
    pageParam: 1,
    queryParams: {
      ...queryParams,
      limit: fetchLimit,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit
  const nextPage = totalCount > pageParam + limit ? page + 1 : null
  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count: totalCount,
    },
    nextPage,
    queryParams,
  }
}
