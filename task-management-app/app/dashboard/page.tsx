import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, Clock, AlertCircle, TrendingUp, Plus, BarChart3, Users, Calendar, Target } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Good morning! 👋
            </h1>
            <p className="text-muted-foreground mt-2">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/tasks">
                <CheckSquare className="h-4 w-4 mr-2" />
                View All Tasks
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Tasks</CardTitle>
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">24</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  +2
                </Badge>
                <p className="text-xs text-blue-700">from last week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">In Progress</CardTitle>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">8</div>
              <div className="flex items-center space-x-2 mt-2">
                <Progress value={65} className="flex-1 h-2" />
                <p className="text-xs text-orange-700">65% active</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-red-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-900">High Priority</CardTitle>
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900">3</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                  Urgent
                </Badge>
                <p className="text-xs text-red-700">needs attention</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Completed</CardTitle>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">13</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  87%
                </Badge>
                <p className="text-xs text-green-700">completion rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest task updates and changes</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-900">Task "API Integration" completed</p>
                    <p className="text-sm text-green-700 flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs bg-green-100">Development</Badge>
                      2 hours ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-900">New task "Database Migration" created</p>
                    <p className="text-sm text-blue-700 flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs bg-blue-100">Backend</Badge>
                      4 hours ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-orange-900">Task "UI Design" status changed to In Progress</p>
                    <p className="text-sm text-orange-700 flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs bg-orange-100">Design</Badge>
                      6 hours ago
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-purple-900">Team member Sarah joined "Mobile App" project</p>
                    <p className="text-sm text-purple-700 flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs bg-purple-100">Team</Badge>
                      1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Upcoming */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
                    <Link href="/tasks">
                      <div className="flex items-center w-full">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <CheckSquare className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">View All Tasks</div>
                          <div className="text-sm text-muted-foreground">See complete list</div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
                    <Link href="/profile">
                      <div className="flex items-center w-full">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Profile Settings</div>
                          <div className="text-sm text-muted-foreground">Manage your account</div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start h-auto p-4" asChild>
                    <Link href="/settings">
                      <div className="flex items-center w-full">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <Target className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">App Settings</div>
                          <div className="text-sm text-muted-foreground">Configure preferences</div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>Tasks due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900 text-sm">Website Redesign</p>
                        <p className="text-xs text-red-700">Due in 2 days</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-700 text-xs">High</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="font-medium text-orange-900 text-sm">Client Meeting</p>
                        <p className="text-xs text-orange-700">Due in 5 days</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 text-xs">Medium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
