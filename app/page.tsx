import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation showAuthButtons={false} />

      {/* Hero Section */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Discover Sustainable Products for a Better Tomorrow
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Join EcoFinds, the marketplace where eco-conscious consumers meet sustainable sellers. Find everything you
              need while making a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Products
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <CardTitle>Eco-Friendly Products</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover products that are sustainably made, ethically sourced, and environmentally responsible.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <CardTitle>Support Local Sellers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect directly with eco-conscious sellers and small businesses committed to sustainability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <CardTitle>Make an Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every purchase contributes to a more sustainable future and supports environmental initiatives.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
