export default function CurrencyTest(props: {
  params: Promise<{ countryCode: string }>
}) {
  const getCurrencySymbol = (currencyCode: string): string => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€", 
      GBP: "£",
      CAD: "C$",
      AUD: "A$",
      JPY: "¥",
      CNY: "¥",
      INR: "₹",
      KRW: "₩",
      BRL: "R$",
      MXN: "Mex$",
      CHF: "CHF",
      SEK: "kr",
      NOK: "kr",
      DKD: "kr",
      PLN: "zł",
      CZK: "Kč",
      HUF: "Ft",
      RUB: "₽",
      TRY: "₺",
      ZAR: "R",
      SGD: "S$",
      HKD: "HK$",
      NZD: "NZ$",
      THB: "฿",
      MYR: "RM",
      PHP: "₱",
    }
    return symbols[currencyCode.toUpperCase()] || currencyCode.toUpperCase()
  }

  const formatPrice = (amount: number, currency: string): string => {
    const symbol = getCurrencySymbol(currency)
    const formattedAmount = amount.toFixed(2)
    const symbolAfter = ["SEK", "NOK", "DKK", "PLN", "CZK", "HUF"].includes(currency.toUpperCase())
    
    return symbolAfter ? `${formattedAmount} ${symbol}` : `${symbol}${formattedAmount}`
  }

  const testCurrencies = [
    { code: 'USD', name: 'US Dollar', amount: 50.00 },
    { code: 'EUR', name: 'Euro', amount: 45.50 },
    { code: 'GBP', name: 'British Pound', amount: 39.99 },
    { code: 'CAD', name: 'Canadian Dollar', amount: 65.00 },
    { code: 'AUD', name: 'Australian Dollar', amount: 72.50 },
    { code: 'JPY', name: 'Japanese Yen', amount: 5500 },
    { code: 'SEK', name: 'Swedish Krona', amount: 520.00 },
    { code: 'NOK', name: 'Norwegian Krone', amount: 485.00 },
    { code: 'CHF', name: 'Swiss Franc', amount: 48.75 },
    { code: 'INR', name: 'Indian Rupee', amount: 4150.00 },
  ]

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Currency Display Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testCurrencies.map((currency) => (
          <div key={currency.code} className="border p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">{currency.name} ({currency.code})</h3>
            <div className="space-y-2">
              <p><strong>Raw Amount:</strong> {currency.amount}</p>
              <p><strong>Formatted:</strong> <span className="text-xl font-semibold text-green-600">{formatPrice(currency.amount, currency.code)}</span></p>
              <p><strong>Symbol:</strong> {getCurrencySymbol(currency.code)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-2">Currency Rules</h3>
        <ul className="text-sm space-y-1">
          <li>• Most currencies: Symbol before amount (e.g., $50.00, €45.50)</li>
          <li>• Nordic currencies: Symbol after amount (e.g., 520.00 kr)</li>
          <li>• Eastern European: Symbol after amount (e.g., 100.00 zł)</li>
          <li>• Fallback: Show currency code if symbol not found</li>
        </ul>
      </div>
    </div>
  )
}