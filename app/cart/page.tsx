"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Bamboo Water Bottle",
    price: 24.99,
    quantity: 2,
    image: "/bamboo-water-bottle.jpg",
    category: "Kitchen",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 32.0,
    quantity: 1,
    image: "/organic-cotton-tshirt.png",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Solar Phone Charger",
    price: 45.99,
    quantity: 1,
    image: "/solar-phone-charger.jpg",
    category: "Electronics",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const [removingItem, setRemovingItem] = useState<number | null>(null)

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(id)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    setIsUpdating(null)
  }

  const removeItem = async (id: number) => {
    setRemovingItem(id)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCartItems((prev) => prev.filter((item) => item.id !== id))
    setRemovingItem(null)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    // Handle checkout logic
    console.log("Proceeding to checkout with items:", cartItems)
    alert("Proceeding to checkout...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/products" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
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
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <ShoppingBag className="h-8 w-8" />
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`transition-all duration-300 ${
                      removingItem === item.id ? "opacity-50 scale-95" : "hover:shadow-md"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg border border-border"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{item.name}</h3>
                              <Badge variant="secondary" className="mt-1">
                                {item.category}
                              </Badge>
                            </div>
                            <p className="text-lg font-bold text-primary">${item.price}</p>
                          </div>

                          {/* Quantity Controls and Remove */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">Quantity:</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1 || isUpdating === item.id}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {isUpdating === item.id ? "..." : item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={isUpdating === item.id}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <p className="font-semibold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                disabled={removingItem === item.id}
                                className="text-destructive hover:text-destructive hover:border-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                {removingItem === item.id ? "Removing..." : "Remove"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span className={shipping === 0 ? "text-green-600" : ""}>
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      {shipping === 0 && <p className="text-xs text-green-600">Free shipping on orders over $50!</p>}
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleCheckout} className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>

                    <div className="mt-4 text-center">
                      <Link href="/products" className="text-sm text-primary hover:underline">
                        Continue Shopping
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Discover amazing eco-friendly products and add them to your cart
              </p>
              <Link href="/products">
                <Button size="lg">Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
