import React from "react"

const CashOnDelivery: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Delivery truck */}
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624L20.56 11.5a1 1 0 0 0-.78-.38H18" />
      <circle cx="16" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
      
      {/* Dollar sign */}
      <path d="M12 2v2" />
      <path d="M12 8v2" />
      <path d="M9 5h6" />
      <path d="M9 9h6" />
    </svg>
  )
}

export default CashOnDelivery