"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { User, Package, ShoppingBag, LogOut, Edit, Save, X, Camera, Mail, Calendar, MapPin } from "lucide-react"

// Mock user data
const mockUser = {
  id: 1,
  username: "eco_enthusiast",
  email: "sarah.green@email.com",
  firstName: "Sarah",
  lastName: "Green",
  avatar: "/placeholder.svg?height=120&width=120",
  joinDate: "2024-01-15",
  location: "San Francisco, CA",
  totalPurchases: 12,
  totalListings: 4,
  memberSince: "January 2024",
}

// Mock stats data
const mockStats = {
  totalSpent: 342.87,
  itemsPurchased: 12,
  itemsSold: 8,
  carbonSaved: 45.2, // kg of CO2
}

export default function DashboardPage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
  })

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form if canceling
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    // Update user data
    setUser((prev) => ({
      ...prev,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      email: editForm.email,
      location: editForm.location,
    }))
    setIsEditing(false)
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // Handle logout logic
      console.log("Logging out...")
      alert("Logged out successfully!")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                    <AvatarFallback className="text-2xl">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-transparent"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} size="sm">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={handleEditToggle} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-muted-foreground">@{user.username}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {user.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Member since {user.memberSince}
                        </div>
                      </div>

                      <Button onClick={handleEditToggle} variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">${mockStats.totalSpent}</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{mockStats.itemsPurchased}</div>
                <div className="text-sm text-muted-foreground">Items Purchased</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{mockStats.itemsSold}</div>
                <div className="text-sm text-muted-foreground">Items Sold</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{mockStats.carbonSaved}kg</div>
                <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <Link href="/listings">
                <CardContent className="p-6 text-center">
                  <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">My Listings</h3>
                  <p className="text-muted-foreground text-sm mb-4">Manage your eco-friendly product listings</p>
                  <Badge variant="secondary">{user.totalListings} active</Badge>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <Link href="/purchases">
                <CardContent className="p-6 text-center">
                  <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Previous Purchases</h3>
                  <p className="text-muted-foreground text-sm mb-4">View your order history and track deliveries</p>
                  <Badge variant="secondary">{user.totalPurchases} orders</Badge>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <User className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Account Settings</h3>
                <p className="text-muted-foreground text-sm mb-4">Update preferences and security settings</p>
                <Button variant="outline" size="sm">
                  Manage Account
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Logout Section */}
          <Card className="border-destructive/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Sign Out</h3>
                  <p className="text-sm text-muted-foreground">You'll need to sign in again to access your account</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
