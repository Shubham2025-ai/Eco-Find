"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Package, Truck, CheckCircle, Clock } from "lucide-react"

// Mock purchase data
const mockPurchases = [
  {
    id: "ORD-001",
    date: "2024-01-20",
    status: "delivered",
    total: 57.98,
    items: [
      {
        id: 1,
        name: "Bamboo Water Bottle",
        price: 24.99,
        quantity: 2,
        image: "/bamboo-water-bottle.jpg",
      },
      {
        id: 2,
        name: "Beeswax Food Wraps",
        price: 18.5,
        quantity: 1,
        image: "/beeswax-food-wraps.png",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-15",
    status: "shipped",
    total: 89.99,
    items: [
      {
        id: 3,
        name: "Hemp Backpack",
        price: 89.99,
        quantity: 1,
        image: "/hemp-backpack.png",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-01-10",
    status: "processing",
    total: 77.99,
    items: [
      {
        id: 4,
        name: "Solar Phone Charger",
        price: 45.99,
        quantity: 1,
        image: "/solar-phone-charger.jpg",
      },
      {
        id: 5,
        name: "Organic Cotton T-Shirt",
        price: 32.0,
        quantity: 1,
        image: "/organic-cotton-tshirt.png",
      },
    ],
  },
  {
    id: "ORD-004",
    date: "2024-01-05",
    status: "delivered",
    total: 68.0,
    items: [
      {
        id: 6,
        name: "Recycled Yoga Mat",
        price: 68.0,
        quantity: 1,
        image: "/recycled-yoga-mat.png",
      },
    ],
  },
]

export default function PurchasesPage() {
  const [purchases] = useState(mockPurchases)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Previous Purchases</h1>
            <p className="text-muted-foreground">Track your sustainable shopping journey</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "processing", "shipped", "delivered"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Purchase History */}
          {filteredPurchases.length > 0 ? (
            <div className="space-y-6">
              {filteredPurchases.map((purchase) => (
                <Card key={purchase.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg">Order {purchase.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Placed on{" "}
                          {new Date(purchase.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-lg">${purchase.total.toFixed(2)}</p>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(purchase.status)}
                            <Badge className={getStatusColor(purchase.status)}>{purchase.status}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      {purchase.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-md border border-border"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">${item.price} each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t border-border">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {purchase.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Leave Review
                        </Button>
                      )}
                      {purchase.status === "shipped" && (
                        <Button variant="outline" size="sm">
                          Track Package
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Reorder Items
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No purchases found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start shopping for eco-friendly products"}
              </p>
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
