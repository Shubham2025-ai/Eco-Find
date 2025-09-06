import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <h3 className="text-xl font-bold text-primary">EcoFinds</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover sustainable products for a better tomorrow. Join our community of eco-conscious consumers and
              sellers.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Follow Us
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Shop</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link
                href="/products?category=Kitchen"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Kitchen & Home
              </Link>
              <Link
                href="/products?category=Clothing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sustainable Fashion
              </Link>
              <Link
                href="/products?category=Electronics"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Eco Electronics
              </Link>
            </nav>
          </div>

          {/* Account Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Account</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                My Dashboard
              </Link>
              <Link href="/listings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                My Listings
              </Link>
              <Link href="/purchases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Order History
              </Link>
              <Link
                href="/products/add"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sell Products
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest eco-friendly products and sustainability tips.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">© 2024 EcoFinds. All rights reserved.</p>
          <nav className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
