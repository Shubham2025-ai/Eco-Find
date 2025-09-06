"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authState = localStorage.getItem("isLoggedIn") === "true"
    setIsAuthenticated(authState)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
          <div className="relative container mx-auto px-4 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-8">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
                  Discover{" "}
                  <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Sustainable
                  </span>{" "}
                  Products
                </h2>
                <p className="text-xl lg:text-2xl text-muted-foreground text-pretty max-w-2xl">
                  Join EcoFinds, the marketplace where eco-conscious consumers meet sustainable sellers. Make a positive
                  impact on our planet with every purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/products">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Browse Products
                      </span>
                    </Button>
                  </Link>
                  {!isAuthenticated && (
                    <Link href="/signup">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5"
                      >
                        Start Selling
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="relative lg:block hidden">
                <div className="relative w-full h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl -mt-8">
                  <Image
                    src="/hero-banner-clean.jpg"
                    alt="Sustainable eco-friendly products showcase"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-125">🌱</span>
                </div>
                <CardTitle className="transition-colors duration-300 group-hover:text-primary">
                  Eco-Friendly Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="transition-colors duration-300 group-hover:text-foreground/80">
                  Discover products that are sustainably made, ethically sourced, and environmentally responsible.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-125">🤝</span>
                </div>
                <CardTitle className="transition-colors duration-300 group-hover:text-primary">
                  Support Local Sellers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="transition-colors duration-300 group-hover:text-foreground/80">
                  Connect directly with eco-conscious sellers and small businesses committed to sustainability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-125">🌍</span>
                </div>
                <CardTitle className="transition-colors duration-300 group-hover:text-primary">
                  Make an Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="transition-colors duration-300 group-hover:text-foreground/80">
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
