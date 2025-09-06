"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, User, Menu, Package, Plus, Home, Search } from "lucide-react"

interface NavigationProps {
  cartItemCount?: number
  showAuthButtons?: boolean
}

export function Navigation({ cartItemCount = 3, showAuthButtons = true }: NavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Search },
    { href: "/listings", label: "My Listings", icon: Package },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
            aria-label="EcoFinds Home"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm" aria-hidden="true">
                E
              </span>
            </div>
            <h1 className="text-xl font-bold text-primary">EcoFinds</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2 transition-all duration-200"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Add Product Button - Desktop */}
            <Link href="/products/add" className="hidden sm:block">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105 bg-transparent"
                aria-label="Add new product"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span className="hidden lg:inline">Add Product</span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative transition-all duration-200 hover:scale-105"
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
                    aria-label={`${cartItemCount} items in cart`}
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {showAuthButtons ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105"
                    aria-label="User dashboard"
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="transition-all duration-200">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="transition-all duration-200 hover:scale-105">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden transition-all duration-200"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-4 mt-8" role="navigation" aria-label="Mobile navigation">
                  {/* Mobile Navigation Links */}
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                          isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        {item.label}
                      </Link>
                    )
                  })}

                  <div className="border-t border-border pt-4 space-y-2">
                    <Link
                      href="/products/add"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-all duration-200"
                    >
                      <Plus className="h-5 w-5" aria-hidden="true" />
                      Add Product
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-all duration-200"
                    >
                      <User className="h-5 w-5" aria-hidden="true" />
                      Dashboard
                    </Link>
                  </div>

                  {!showAuthButtons && (
                    <div className="border-t border-border pt-4 space-y-2">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full transition-all duration-200 bg-transparent">
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full transition-all duration-200">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
