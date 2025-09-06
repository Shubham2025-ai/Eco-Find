"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, ImageIcon } from "lucide-react"

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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image size must be less than 5MB" }))
        return
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Please select a valid image file" }))
        return
      }

      setErrors((prev) => ({ ...prev, image: "" }))

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImageFile(null)
    setErrors((prev) => ({ ...prev, image: "" }))
    const fileInput = document.getElementById("image-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
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

    if (!selectedImage) {
      newErrors.image = "Product image is required"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setUploadProgress(0)

      try {
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        await new Promise((resolve) => setTimeout(resolve, 500))

        console.log("Product submitted:", {
          ...formData,
          image: imageFile?.name,
          imageSize: imageFile?.size,
          imageType: imageFile?.type,
        })

        setFormData({ title: "", category: "", description: "", price: "" })
        setSelectedImage(null)
        setImageFile(null)
        setUploadProgress(0)

        const fileInput = document.getElementById("image-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""

        alert("Product added successfully!")
      } catch (error) {
        console.error("Upload failed:", error)
        setErrors({ submit: "Failed to upload product. Please try again." })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/products">
              <Button variant="ghost" className="flex items-center gap-2 mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Button>
            </Link>
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
                      Price (INR) <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        ₹
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

                  {errors.submit && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <p className="text-sm text-destructive">{errors.submit}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : "Adding Product..."}
                      </div>
                    ) : (
                      "Submit Listing"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Product Image <span className="text-destructive">*</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedImage ? (
                    <div className="relative group">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Product preview"
                        className="w-full aspect-square object-cover rounded-lg border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {imageFile && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(1)}MB)
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        errors.image ? "border-destructive bg-destructive/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground mb-4 font-medium">Upload a high-quality image</p>
                        <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
                        <Label htmlFor="image-upload">
                          <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Image
                          </Button>
                        </Label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}

                  {errors.image && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.image}
                    </p>
                  )}

                  <div className="text-sm text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-md">
                    <p className="font-medium text-foreground mb-2">Image Guidelines:</p>
                    <p>• Recommended size: 800x800px or larger</p>
                    <p>• Supported formats: JPG, PNG, WebP</p>
                    <p>• Maximum file size: 5MB</p>
                    <p>• Use clear, well-lit photos with neutral backgrounds</p>
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
