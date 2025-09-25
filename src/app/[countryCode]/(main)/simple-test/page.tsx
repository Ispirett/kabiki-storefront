import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export default async function SimpleTest(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  try {
    const region = await getRegion(countryCode)
    
    const { response: productsResponse } = await listProducts({
      queryParams: {
        limit: 3,
        fields: "*variants.calculated_price",
      },
      countryCode,
    })

    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Simple Price Test</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Region Info:</h2>
          <p><strong>Country Code:</strong> {countryCode}</p>
          <p><strong>Region Currency:</strong> {region?.currency_code || 'Not found'}</p>
          <p><strong>Region Name:</strong> {region?.name || 'Not found'}</p>
        </div>

        <div className="space-y-6">
          {productsResponse.products.map((product) => {
            const variant = product.variants?.[0]
            const amount = variant?.calculated_price?.calculated_amount
            const currency = variant?.calculated_price?.currency_code
            
            // Test both interpretations
            const asCents = amount ? `$${(amount / 100).toFixed(2)}` : 'N/A'
            const asMainUnit = amount ? `$${amount.toFixed(2)}` : 'N/A'
            
            return (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="font-medium mb-2">{product.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Raw Amount:</strong> {amount}</p>
                    <p><strong>Currency:</strong> {currency}</p>
                  </div>
                  <div>
                    <p><strong>As Cents:</strong> {asCents}</p>
                    <p><strong>As Main Unit:</strong> {asMainUnit}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {productsResponse.products.length === 0 && (
          <p className="text-red-600">No products found. Check your backend connection.</p>
        )}
      </div>
    )
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Error</h1>
        <p>Failed to load products: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <p className="mt-4 text-sm text-gray-600">
          Make sure your Medusa backend is running at http://localhost:9000
        </p>
      </div>
    )
  }
}