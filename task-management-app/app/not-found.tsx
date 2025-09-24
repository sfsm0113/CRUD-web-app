import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProtectedDashboardLink } from "@/components/protected-dashboard-link"
import { CheckCircle, ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold ml-3">TaskFlow Pro</span>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-muted-foreground/20 mb-4">404</div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ProtectedDashboardLink>
            <Home className="w-4 h-4 mr-2" />
            Go to Dashboard
          </ProtectedDashboardLink>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Need help?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/support" className="text-primary hover:underline">
              Contact Support
            </Link>
            <Link href="/docs" className="text-primary hover:underline">
              Documentation
            </Link>
            <Link href="/status" className="text-primary hover:underline">
              Service Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}