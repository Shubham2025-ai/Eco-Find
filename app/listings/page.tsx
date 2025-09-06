"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Plus, Search, Eye } from "lucide-react"

// Mock user listings data
const mockListings = [
  {
    id: 1,
    name: "Bamboo Water Bottle",
    price: 24.99,
    category: "Kitchen",
    status: "active",
    views: 127,
    image: "/bamboo-water-bottle.jpg",
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 32.0,
    category: "Clothing",
    status: "active",
    views: 89,
    image: "/organic-cotton-tshirt.png",
    dateAdded: "2024-01-10",
  },
  {
    id: 3,
    name: "Solar Phone Charger",
    price: 45.99,
    category: "Electronics",
    status: "draft",
    views: 0,
    image: "/solar-phone-charger.jpg",
    dateAdded: "2024-01-08",
  },
  {
    id: 4,
    name: "Recycled Yoga Mat",
    price: 68.0,
    category: "Fitness",
    status: "sold",
    views: 203,
    image: "/recycled-yoga-mat.png",
    dateAdded: "2024-01-05",
  },
]

export default function MyListingsPage() {
  const [listings, setListings] = useState(mockListings)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setListings((prev) => prev.filter((listing) => listing.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "sold":
        return "bg-blue-100 text-blue-800 border-blue-200"
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">EcoFinds</h1>
            </Link>
            <Link href="/products/add">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Listings</h1>
          <p className="text-muted-foreground">Manage your eco-friendly product listings</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "draft", "sold"].map((status) => (
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

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 flex-shrink-0">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.name}
                        className="w-full h-full object-cover rounded-lg border border-border"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{listing.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Added on {new Date(listing.dateAdded).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{listing.category}</Badge>
                          <Badge className={getStatusColor(listing.status)}>{listing.status}</Badge>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-2xl font-bold text-primary">${listing.price}</p>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            {listing.views} views
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <Link href={`/products/${listing.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Link href={`/listings/edit/${listing.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(listing.id)}
                            className="text-destructive hover:text-destructive hover:border-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start by adding your first eco-friendly product"}
            </p>
            <Link href="/products/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
