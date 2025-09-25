import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) => {
  // Handle null, undefined, or NaN amounts
  if (amount === null || amount === undefined || isNaN(amount)) {
    return currency_code && !isEmpty(currency_code) 
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currency_code,
          minimumFractionDigits,
          maximumFractionDigits,
        }).format(0)
      : "0"
  }

  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString()
}