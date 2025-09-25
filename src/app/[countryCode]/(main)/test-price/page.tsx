import { convertToLocale } from "@lib/util/money"

export default function TestPrice() {
  // Test different price scenarios
  const testCases = [
    { amount: 50, currency: 'USD', description: 'Amount: 50 (could be $0.50 or $50.00)' },
    { amount: 5000, currency: 'USD', description: 'Amount: 5000 (likely $50.00 in cents)' },
    { amount: 0.5, currency: 'USD', description: 'Amount: 0.5 (likely $0.50)' },
    { amount: 25.99, currency: 'USD', description: 'Amount: 25.99 (likely $25.99)' },
  ]

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Price Formatting Test</h1>
      
      <div className="space-y-4">
        {testCases.map((testCase, index) => {
          let formattedPrice = 'Error'
          let error = null
          
          try {
            formattedPrice = convertToLocale({
              amount: testCase.amount,
              currency_code: testCase.currency
            })
          } catch (e) {
            error = e instanceof Error ? e.message : 'Unknown error'
          }
          
          return (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <h3 className="font-medium mb-2">{testCase.description}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Input:</strong> {testCase.amount} {testCase.currency}</p>
                  <p><strong>Formatted:</strong> {formattedPrice}</p>
                  {error && <p className="text-red-600"><strong>Error:</strong> {error}</p>}
                </div>
                <div>
                  <p><strong>As cents (÷100):</strong> ${(testCase.amount / 100).toFixed(2)}</p>
                  <p><strong>As main unit:</strong> ${testCase.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-medium mb-2">Test Results Analysis</h3>
        <p className="text-sm text-gray-700">
          Check the console for any errors and compare the formatted results with the expected values.
          This will help us understand how the convertToLocale function is handling different amount formats.
        </p>
      </div>
    </div>
  )
}