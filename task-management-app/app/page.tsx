import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Clock, Users, BarChart3, Shield, Zap, Star, ArrowUp, Menu } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TaskFlow Pro</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </Link>
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Star className="w-3 h-3 mr-1" />
              Trusted by 10,000+ teams worldwide
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              The Ultimate
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Task Management </span>
              Platform
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Streamline your workflow, boost productivity, and collaborate seamlessly with your team. 
              TaskFlow Pro makes project management effortless and efficient.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative mx-auto max-w-5xl">
              <div className="relative rounded-xl bg-white shadow-2xl ring-1 ring-gray-900/10 p-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">
                      Beautiful Dashboard Preview
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to manage tasks effectively
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you stay organized, productive, and in control of your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Time Tracking</CardTitle>
                <CardDescription>
                  Track time spent on tasks with built-in timers and detailed reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Automatic time tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Detailed time reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Productivity insights
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Work together seamlessly with real-time updates and communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Real-time collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Team chat & comments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Role-based permissions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Get insights into your productivity with comprehensive analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Performance metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom dashboards
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Export capabilities
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Automation</CardTitle>
                <CardDescription>
                  Automate repetitive tasks and workflows to save time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom workflows
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Smart notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Auto-assignment
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Enterprise-grade security with advanced compliance features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    SOC 2 compliance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    SSO integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <ArrowUp className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect with your favorite tools and platforms seamlessly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    50+ integrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    API access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Webhook support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your team. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription className="text-sm">Perfect for individuals and small teams</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Up to 5 team members
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    10 projects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Basic time tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Mobile app access
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <CardDescription className="text-sm">Best for growing teams and businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Up to 25 team members
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Custom workflows
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-sm">For large organizations with advanced needs</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Unlimited team members
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Advanced security
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    SLA guarantee
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/signup">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about TaskFlow Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "TaskFlow Pro has completely transformed how our team manages projects. The intuitive interface and powerful features have increased our productivity by 40%."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    SM
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Miller</p>
                    <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The best task management tool we've ever used. The automation features save us hours every week, and the analytics help us make better decisions."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    DJ
                  </div>
                  <div>
                    <p className="font-semibold">David Johnson</p>
                    <p className="text-sm text-muted-foreground">CEO, StartupXYZ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "TaskFlow Pro's collaboration features are outstanding. Our remote team stays perfectly synchronized, and nothing falls through the cracks anymore."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    EW
                  </div>
                  <div>
                    <p className="font-semibold">Emily Wong</p>
                    <p className="text-sm text-muted-foreground">Team Lead, DesignStudio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams who have already made the switch to TaskFlow Pro. 
              Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TaskFlow Pro</span>
              </div>
              <p className="text-muted-foreground">
                The ultimate task management platform for modern teams.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-foreground transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 TaskFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
