"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react"

// Mock product data - in a real app, this would come from an API
const mockProduct = {
  id: 1,
  name: "Bamboo Water Bottle",
  price: 1999.99, // converted USD to INR
  category: "Kitchen",
  description:
    "Stay hydrated sustainably with our premium bamboo water bottle. Made from 100% natural bamboo fiber, this eco-friendly bottle is completely biodegradable and features a leak-proof design. Perfect for daily use, hiking, or gym sessions. The natural bamboo material keeps your drinks at the perfect temperature while reducing plastic waste.",
  features: [
    "100% natural bamboo fiber construction",
    "Leak-proof and spill-resistant design",
    "BPA-free and non-toxic materials",
    "Lightweight and durable",
    "Easy to clean and maintain",
    "Biodegradable and compostable",
  ],
  image: "/bamboo-water-bottle-product.jpg",
  inStock: true,
  rating: 4.8,
  reviews: 127,
}

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log(`Added ${quantity} ${mockProduct.name} to cart`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Button>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">EcoFinds</h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-border">
              <img
                src={mockProduct.image || "/placeholder.svg"}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {mockProduct.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{mockProduct.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-bold text-primary">₹{mockProduct.price}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(mockProduct.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({mockProduct.reviews} reviews)</span>
                </div>
              </div>
              {mockProduct.inStock ? (
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">{mockProduct.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Section */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!mockProduct.inStock}
                    className="flex-1 flex items-center gap-2"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? "text-red-500 border-red-200" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
