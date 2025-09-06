"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Search, Plus, Filter, Heart, Star } from "lucide-react"

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Bamboo Water Bottle",
    price: 24.99,
    category: "Kitchen",
    image: "/bamboo-water-bottle.jpg",
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 32.0,
    category: "Clothing",
    image: "/organic-cotton-tshirt.png",
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 3,
    name: "Solar Phone Charger",
    price: 45.99,
    category: "Electronics",
    image: "/solar-phone-charger.jpg",
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: 4,
    name: "Recycled Yoga Mat",
    price: 68.0,
    category: "Fitness",
    image: "/recycled-yoga-mat.png",
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 5,
    name: "Beeswax Food Wraps",
    price: 18.5,
    category: "Kitchen",
    image: "/beeswax-food-wraps.png",
    rating: 4.5,
    reviewCount: 94,
  },
  {
    id: 6,
    name: "Hemp Backpack",
    price: 89.99,
    category: "Accessories",
    image: "/hemp-backpack.png",
    rating: 4.9,
    reviewCount: 178,
  },
  {
    id: 7,
    name: "Biodegradable Phone Case",
    price: 29.99,
    category: "Electronics",
    image: "/biodegradable-phone-case.jpg",
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: 8,
    name: "Organic Skincare Set",
    price: 54.99,
    category: "Beauty",
    image: "/organic-skincare-set.png",
    rating: 4.8,
    reviewCount: 142,
  },
]

const categories = ["All", "Kitchen", "Clothing", "Electronics", "Fitness", "Accessories", "Beauty"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 300)
    }
  }

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist((prev) => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Sustainable Products</h1>
          <p className="text-muted-foreground">
            Discover {mockProducts.length} eco-friendly products from conscious sellers
          </p>
        </div>

        {/* Filters Section */}
        <div className="space-y-4 mb-8">
          {/* Category Filters */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Categories:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
                aria-pressed={selectedCategory === category}
              >
                {category}
                {category !== "All" && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {mockProducts.filter((p) => p.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Search for eco-friendly products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover:shadow-md"
              aria-label="Search products"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <LoadingSpinner size="sm" />
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                Showing {filteredProducts.length} of {mockProducts.length} products
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {filteredProducts.map((product, index) => (
            <div key={product.id}>
              <Link href={`/products/${product.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/30 hover:-translate-y-1 relative overflow-hidden">
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110"
                    aria-label={`${wishlist.has(product.id) ? "Remove from" : "Add to"} wishlist`}
                  >
                    <Heart
                      className={`h-4 w-4 transition-all duration-300 ${
                        wishlist.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
                      }`}
                    />
                  </button>

                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg bg-muted relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        loading={index < 8 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-card-foreground mb-2 text-balance group-hover:text-primary transition-all duration-300 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : i < product.rating
                                    ? "fill-yellow-400/50 text-yellow-400"
                                    : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-primary transition-all duration-300 group-hover:scale-105">
                          ₹{(product.price * 80).toFixed(0)}
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10"
                        >
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {/* No results message */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 hover:scale-110">
              <Search className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground text-balance mb-6">
              We couldn't find any products matching your criteria. Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </main>

      {/* Floating Add Product Button */}
      <Link href="/products/add">
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-40 group"
          aria-label="Add new product"
        >
          <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
        </Button>
      </Link>

      <Footer />
    </div>
  )
}
