/**
 * Currency formatting utilities
 */

// Currency symbol mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  TTD: "TT$", // Trinidad and Tobago Dollar
  JMD: "J$", // Jamaican Dollar
  BBD: "Bds$", // Barbadian Dollar
  XCD: "EC$", // Eastern Caribbean Dollar
  BZD: "BZ$", // Belize Dollar
  GYD: "G$", // Guyanese Dollar
  SRD: "Sr$", // Surinamese Dollar
  CNY: "¥",
  INR: "₹",
  KRW: "₩",
  BRL: "R$",
  MXN: "Mex$",
  CHF: "CHF",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
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
  IDR: "Rp",
  VND: "₫",
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_SYMBOLS[currencyCode.toUpperCase()] || currencyCode.toUpperCase()
}

/**
 * Format a price with proper currency symbol
 */
export function formatPrice(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode)
  
  // For some currencies, symbol goes after the amount
  const symbolAfter = ["SEK", "NOK", "DKK", "PLN", "CZK", "HUF"].includes(currencyCode.toUpperCase())
  
  // Format the number with appropriate decimal places
  // Divide by 100 as amount is assumed to be in cents
  const amountInMainUnit = amount / 100
  
  // Format the number with appropriate decimal places
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountInMainUnit)
  
  return symbolAfter ? `${formattedAmount} ${symbol}` : `${symbol}${formattedAmount}`
}

/**
 * Format a price string that already includes currency formatting
 * This extracts the numeric value and reformats with proper symbol
 */
export function reformatPriceString(priceString: string, currencyCode: string): string {
  if (!priceString || !currencyCode) {
    return priceString || ""
  }
  
  // Extract numeric value from price string
  const numericValue = parseFloat(priceString.replace(/[^0-9.-]+/g, ""))
  
  if (isNaN(numericValue)) {
    return priceString // Return original if we can't parse
  }
  
  const symbol = getCurrencySymbol(currencyCode)
  const symbolAfter = ["SEK", "NOK", "DKK", "PLN", "CZK", "HUF"].includes(currencyCode.toUpperCase())
  
  // Format with proper decimal places - ensure we don't get a leading 0.
  // If the value is a whole number, don't show decimal places
  const isWholeNumber = numericValue % 1 === 0
  
  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numericValue)
  
  return symbolAfter ? `${formattedAmount} ${symbol}` : `${symbol}${formattedAmount}`
}

/**
 * Get locale-specific currency formatting
 */
export function formatCurrencyLocale(amount: number, currencyCode: string, locale: string = "en-US"): string {
  try {
    // Determine if the amount is a whole number
    const amountInMainUnit = amount / 100 // Convert from cents to main unit
    const isWholeNumber = amountInMainUnit % 1 === 0
    
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: isWholeNumber ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amountInMainUnit)
  } catch (error) {
    // Fallback to manual formatting if Intl doesn't support the currency
    return formatPrice(amount, currencyCode)
  }
}