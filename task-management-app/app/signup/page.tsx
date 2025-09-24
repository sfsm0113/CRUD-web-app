"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SignupForm } from "@/components/auth/signup-form"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowLeft, Star, Users, Shield, Zap, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function SignupPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect via useEffect
  }
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
            <Badge variant="secondary" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Join 10,000+ teams
            </Badge>
            
            <h1 className="text-4xl font-bold mb-6">
              Start your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> productivity journey</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Create your TaskFlow Pro account and transform how your team manages tasks and projects. Get started in less than 2 minutes.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Team Collaboration</h3>
                  <p className="text-sm text-muted-foreground">Work together seamlessly with real-time updates and team chat</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Enterprise Security</h3>
                  <p className="text-sm text-muted-foreground">Your data is protected with bank-level encryption and SOC 2 compliance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Smart Automation</h3>
                  <p className="text-sm text-muted-foreground">Automate repetitive tasks and focus on what matters most</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/50 rounded-xl border">
              <p className="text-sm text-muted-foreground mb-2">🎉 <strong>Limited Time Offer</strong></p>
              <p className="text-sm">Start with a <strong>14-day free trial</strong> - no credit card required!</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Header */}
            <div className="text-center lg:hidden">
              <Badge variant="secondary" className="mb-4">
                <Star className="w-3 h-3 mr-1" />
                14-day free trial
              </Badge>
              <h1 className="text-3xl font-bold mb-2">Get Started</h1>
              <p className="text-muted-foreground">Create your TaskFlow Pro account</p>
            </div>

            {/* Desktop Header */}
            <div className="text-center hidden lg:block">
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-muted-foreground">Start your free trial today</p>
            </div>

            {/* Signup Form Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <SignupForm />
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in instead
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="#" className="hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
