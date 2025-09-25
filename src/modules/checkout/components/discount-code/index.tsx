"use client"

import { Badge, Heading, Input, Label, Text, Tooltip } from "@medusajs/ui"
import React, { useActionState } from "react";

import { applyPromotions, submitPromotionForm } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { InformationCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { items = [], promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code === undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code === undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    await applyPromotions(codes)

    if (input) {
      input.value = ""
    }
  }

  const [message, formAction] = useActionState(submitPromotionForm, null)

  return (
    <div className="w-full">
      <div>
        <form action={(a) => addPromotionCode(a)} className="w-full mb-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
              data-testid="add-discount-button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Have a discount code?</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex w-full gap-x-2">
                <Input
                  className="flex-1 h-10 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="Enter discount code"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <SubmitButton
                  variant="secondary"
                  className="h-10 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium"
                  data-testid="discount-apply-button"
                >
                  Apply
                </SubmitButton>
              </div>

              <ErrorMessage
                error={message}
                data-testid="discount-error-message"
              />
            </div>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-full">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Heading className="text-green-800 font-medium">
                  Discounts Applied
                </Heading>
              </div>

              <div className="space-y-2">
                {promotions.map((promotion) => {
                  return (
                    <div
                      key={promotion.id}
                      className="flex items-center justify-between bg-white rounded-lg p-3 border border-green-100"
                      data-testid="discount-row"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge
                          color={promotion.is_automatic ? "green" : "grey"}
                          size="small"
                          className="font-medium"
                        >
                          {promotion.code}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {promotion.application_method?.value !== undefined &&
                            promotion.application_method.currency_code !==
                              undefined && (
                              <>
                                {promotion.application_method.type ===
                                "percentage"
                                  ? `${promotion.application_method.value}% off`
                                  : `${convertToLocale({
                                      amount: promotion.application_method.value,
                                      currency_code:
                                        promotion.application_method
                                          .currency_code,
                                    })} off`}
                              </>
                            )}
                        </span>
                      </div>
                      {!promotion.is_automatic && (
                        <button
                          className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                          onClick={() => {
                            if (!promotion.code) {
                              return
                            }

                            removePromotionCode(promotion.code)
                          }}
                          data-testid="remove-discount-button"
                        >
                          <Trash size={14} />
                          <span className="sr-only">
                            Remove discount code from order
                          </span>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
