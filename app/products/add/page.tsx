"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X } from "lucide-react"

const categories = [
  "Kitchen",
  "Clothing",
  "Electronics",
  "Fitness",
  "Accessories",
  "Beauty",
  "Home & Garden",
  "Books & Media",
]

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
  })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required"
    } else if (formData.title.length < 3) {
      newErrors.title = "Product title must be at least 3 characters"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required"
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }

    if (!formData.price) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Product submitted:", {
        ...formData,
        image: selectedImage,
      })

      // Reset form
      setFormData({ title: "", category: "", description: "", price: "" })
      setSelectedImage(null)
      setIsSubmitting(false)

      // In a real app, redirect to success page or listings
      alert("Product added successfully!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/products">
              <Button variant="ghost" className="flex items-center gap-2">
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Add New Product</h1>
            <p className="text-muted-foreground">Share your eco-friendly products with the EcoFinds community</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Product Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter product name"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product, its eco-friendly features, and benefits..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={`min-h-32 ${errors.description ? "border-destructive" : ""}`}
                    />
                    <p className="text-xs text-muted-foreground">{formData.description.length}/500 characters</p>
                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price (USD) <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className={`pl-8 ${errors.price ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Adding Product..." : "Submit Listing"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedImage ? (
                    <div className="relative">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Product preview"
                        className="w-full aspect-square object-cover rounded-lg border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Upload a high-quality image of your product</p>
                      <Label htmlFor="image-upload">
                        <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                          Choose Image
                        </Button>
                      </Label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Recommended size: 800x800px or larger</p>
                    <p>• Supported formats: JPG, PNG, WebP</p>
                    <p>• Maximum file size: 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
