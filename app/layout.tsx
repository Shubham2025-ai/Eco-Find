import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EcoFinds - Sustainable Marketplace for Eco-Friendly Products",
  description:
    "Discover sustainable products for a better tomorrow. Join EcoFinds, the marketplace where eco-conscious consumers meet sustainable sellers.",
  keywords: "sustainable, eco-friendly, marketplace, green products, environmental, organic",
  authors: [{ name: "EcoFinds Team" }],
  creator: "EcoFinds",
  publisher: "EcoFinds",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ecofinds.vercel.app"),
  openGraph: {
    title: "EcoFinds - Sustainable Marketplace",
    description: "Discover sustainable products for a better tomorrow",
    url: "https://ecofinds.vercel.app",
    siteName: "EcoFinds",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoFinds - Sustainable Marketplace",
    description: "Discover sustainable products for a better tomorrow",
    creator: "@ecofinds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
