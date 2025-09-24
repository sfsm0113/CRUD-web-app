import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">TaskFlow Pro</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex">
        {/* Left Side - Hero Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">
              Welcome back to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> TaskFlow Pro</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sign in to access your dashboard and continue managing your tasks with the most powerful productivity platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-muted-foreground">Trusted by 10,000+ teams worldwide</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-muted-foreground">99.9% uptime guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-muted-foreground">Enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Header */}
            <div className="text-center lg:hidden">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your TaskFlow Pro account</p>
            </div>

            {/* Desktop Header */}
            <div className="text-center hidden lg:block">
              <h2 className="text-3xl font-bold mb-2">Sign In</h2>
              <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <LoginForm />
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Create one now
                </Link>
              </p>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Forgot your password?
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Need help signing in?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
