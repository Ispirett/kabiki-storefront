import { getBaseURL } from "@lib/util/env"
import LandbotChat from "../components/landbot-chat"
import { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Kabiki - Luxurious Organic Soaps",
    template: "%s | Kabiki",
  },
  description:
    "Experience the purity of nature with our organic soaps, handcrafted with love to nourish your skin and protect the planet.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <main className="relative">{props.children}</main>
        <LandbotChat />
      </body>
    </html>
  )
}
