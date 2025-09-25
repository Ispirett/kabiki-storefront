import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  
  // Check if this is a color option
  const isColorOption = title.toLowerCase().includes('color') || title.toLowerCase().includes('colour')
  
  // Color mapping for common color names
  const colorMap: Record<string, string> = {
    'white': '#FFFFFF',
    'black': '#000000',
    'red': '#EF4444',
    'blue': '#3B82F6',
    'green': '#10B981',
    'yellow': '#F59E0B',
    'purple': '#8B5CF6',
    'pink': '#EC4899',
    'orange': '#F97316',
    'brown': '#A16207',
    'gray': '#6B7280',
    'grey': '#6B7280',
    'beige': '#F5F5DC',
    'cream': '#FFFDD0',
    'lavender': '#E6E6FA',
    'mint': '#98FB98',
    'rose': '#FFE4E1',
    'sage': '#9CAF88',
    'charcoal': '#36454F',
    'ivory': '#FFFFF0',
    'navy': '#000080',
    'teal': '#008080',
    'coral': '#FF7F50',
    'gold': '#FFD700',
    'silver': '#C0C0C0',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-900">
          {title}: <span className="text-orange-600 font-semibold">{current || 'Please select'}</span>
        </span>
        {current && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Selected</span>
          </div>
        )}
      </div>
      
      <div
        className={clx(
          "grid gap-3",
          isColorOption ? "grid-cols-4 sm:grid-cols-6" : "grid-cols-2 sm:grid-cols-3"
        )}
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isSelected = v === current
          const colorValue = colorMap[v.toLowerCase()]
          
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "relative group transition-all duration-300 transform hover:scale-105",
                {
                  "scale-105 ring-2 ring-orange-500 ring-offset-2": isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {isColorOption && colorValue ? (
                // Color swatch for color options
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={clx(
                      "w-12 h-12 rounded-full border-2 shadow-lg transition-all duration-300",
                      {
                        "border-orange-500 shadow-orange-200": isSelected,
                        "border-gray-300 group-hover:border-gray-400": !isSelected,
                        "border-gray-400": v.toLowerCase() === 'white',
                      }
                    )}
                    style={{ backgroundColor: colorValue }}
                  >
                    {isSelected && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className={clx(
                    "text-xs font-medium capitalize transition-colors duration-300",
                    {
                      "text-orange-600": isSelected,
                      "text-gray-600 group-hover:text-gray-800": !isSelected,
                    }
                  )}>
                    {v}
                  </span>
                </div>
              ) : (
                // Regular button for non-color options
                <div
                  className={clx(
                    "px-4 py-3 rounded-xl border-2 text-center font-medium transition-all duration-300",
                    {
                      "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-lg": isSelected,
                      "bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50": !isSelected,
                      "opacity-50 cursor-not-allowed": disabled,
                    }
                  )}
                >
                  {v}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      {/* Selection indicator */}
      {current && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-green-800">
            {title} "{current}" selected
          </span>
        </div>
      )}
    </div>
  )
}

export default OptionSelect
