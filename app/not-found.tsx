import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-balance">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <Home className="h-4 w-4 mr-2" aria-hidden="true" />
                  Go Home
                </Button>
              </Link>
              <Link href="/products" className="flex-1">
                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" aria-hidden="true" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
