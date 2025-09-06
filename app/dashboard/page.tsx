"use client"

import type React from "react"

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
import { Package, ShoppingBag, LogOut, Edit, Save, X, Camera, Mail, Calendar, MapPin, Upload } from "lucide-react"

// Mock user data
const mockUser = {
  id: 1,
  username: "eco_enthusiast",
  email: "sarah.green@email.com",
  fullName: "Sarah Green",
  avatar: "/placeholder.svg?height=120&width=120",
  joinDate: "2024-01-15",
  location: "San Francisco, CA",
  totalPurchases: 12,
  totalListings: 4,
  memberSince: "January 2024",
}

// Mock stats data
const mockStats = {
  totalSpent: 28742.87,
  itemsPurchased: 12,
  itemsSold: 8,
}

export default function DashboardPage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: user.username,
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form if canceling
      setEditForm({
        username: user.username,
      })
      setSelectedImage(null)
      setPreviewUrl(null)
    }
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      username: editForm.username,
    }))

    // Handle image upload (you'll implement database logic locally)
    if (selectedImage) {
      console.log("Image to upload:", selectedImage)
      // Here you would upload to your local database
    }

    setIsEditing(false)
    setSelectedImage(null)
    setPreviewUrl(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
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
                    <AvatarImage src={previewUrl || user.avatar || "/placeholder.svg"} alt={user.username} />
                    <AvatarFallback className="text-2xl">
                      {user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label htmlFor="avatar-upload">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full w-8 h-8 p-0 bg-background cursor-pointer"
                          asChild
                        >
                          <span>
                            <Camera className="h-3 w-3" />
                          </span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={editForm.username}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, username: e.target.value }))}
                          placeholder="Enter username"
                        />
                      </div>

                      {/* Read-only fields */}
                      <div className="space-y-3">
                        <div>
                          <Label>Full Name</Label>
                          <Input value={user.fullName} disabled className="bg-muted" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input value={user.email} disabled className="bg-muted" />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input value={user.location} disabled className="bg-muted" />
                        </div>
                      </div>

                      {selectedImage && (
                        <div className="text-sm text-muted-foreground">
                          <Upload className="h-4 w-4 inline mr-1" />
                          New profile photo selected: {selectedImage.name}
                        </div>
                      )}

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
                        <h2 className="text-2xl font-bold text-foreground">{user.fullName}</h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">₹{mockStats.totalSpent}</div>
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
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
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
