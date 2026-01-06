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
  
  const isColorOption = title.toLowerCase().includes('color') || title.toLowerCase().includes('colour')
  
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
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-700">
        {title}: <span className="text-orange-600">{current || 'Select'}</span>
      </span>
      
      <div
        className={clx(
          "flex flex-wrap gap-2",
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
                "transition-all duration-200",
                { "opacity-50 cursor-not-allowed": disabled }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {isColorOption && colorValue ? (
                <div
                  className={clx(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    {
                      "border-orange-500 ring-2 ring-orange-200": isSelected,
                      "border-gray-300 hover:border-gray-400": !isSelected,
                    }
                  )}
                  style={{ backgroundColor: colorValue }}
                  title={v}
                />
              ) : (
                <div
                  className={clx(
                    "px-3 py-1.5 rounded-md border text-sm font-medium transition-all",
                    {
                      "bg-orange-500 text-white border-orange-500": isSelected,
                      "bg-white text-gray-700 border-gray-300 hover:border-orange-300": !isSelected,
                    }
                  )}
                >
                  {v}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
