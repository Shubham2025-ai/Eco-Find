import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img src="/ecofinds-logo.png" alt="EcoFinds" className="w-8 h-8" />
              <h3 className="text-xl font-bold text-primary">EcoFinds</h3>
            </div>
            <p className="text-sm text-muted-foreground">Discover sustainable products for a better tomorrow.</p>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
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
            </nav>
          </div>

          {/* Account Links */}
          <div className="space-y-3">
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
            </nav>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">© 2025 EcoFinds. All rights reserved.</p>
          <nav className="flex space-x-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
