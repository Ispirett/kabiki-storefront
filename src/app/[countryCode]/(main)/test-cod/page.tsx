import { listCartPaymentMethods } from "@lib/data/payment"
import { getRegion } from "@lib/data/regions"

export default async function TestCOD(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  try {
    const region = await getRegion(countryCode)
    
    if (!region) {
      return (
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6 text-red-600">No Region Found</h1>
          <p>Could not find region for country code: {countryCode}</p>
        </div>
      )
    }

    const paymentMethods = await listCartPaymentMethods(region.id)

    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">COD Payment Methods Test</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Region Info:</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Region ID:</strong> {region.id}</p>
            <p><strong>Region Name:</strong> {region.name}</p>
            <p><strong>Currency:</strong> {region.currency_code}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Available Payment Methods:</h2>
          {paymentMethods && paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-gray-100 p-4 rounded">
                  <p><strong>ID:</strong> {method.id}</p>
                  <p><strong>Is Enabled:</strong> {method.is_enabled ? 'Yes' : 'No'}</p>
                  {method.id === 'pp_system_default' && (
                    <div className="mt-2 p-2 bg-green-100 rounded">
                      <p className="text-green-800 font-medium">✅ COD Payment Method Found!</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-red-100 p-4 rounded">
              <p className="text-red-800">❌ No payment methods found. This means:</p>
              <ul className="mt-2 list-disc list-inside text-red-700">
                <li>Your Medusa backend might not be running</li>
                <li>Payment providers are not configured</li>
                <li>The region doesn't have payment providers assigned</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-medium mb-2">To Enable COD:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Ensure your Medusa backend is running at <code>http://localhost:9000</code></li>
            <li>The system payment provider should be automatically available</li>
            <li>If not visible, check your medusa-config.js payment configuration</li>
            <li>Restart your Medusa backend after configuration changes</li>
          </ol>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Quick Backend Check:</h3>
          <p className="text-sm text-gray-600">
            Visit <a href="http://localhost:9000/store/payment-providers" target="_blank" className="text-blue-600 underline">
              http://localhost:9000/store/payment-providers
            </a> to see raw payment provider data.
          </p>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Error</h1>
        <p>Failed to load payment methods: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="text-yellow-800">Make sure your Medusa backend is running at http://localhost:9000</p>
        </div>
      </div>
    )
  }
}