import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ApiStatus } from "@/components/health/api-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Database, Globe, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and API configuration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApiStatus />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                API Configuration
              </CardTitle>
              <CardDescription>Current API endpoint configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Base URL:</div>
                <div className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                  {process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Environment:</div>
                <Badge variant="outline">{process.env.NODE_ENV === "production" ? "Production" : "Development"}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Authentication
              </CardTitle>
              <CardDescription>JWT token and session management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Token Storage:</div>
                <div className="text-sm text-muted-foreground">Local Storage (Browser)</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Auto-logout:</div>
                <div className="text-sm text-muted-foreground">On 401 Unauthorized</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Token Type:</div>
                <Badge variant="outline">Bearer JWT</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Management
              </CardTitle>
              <CardDescription>Task and user data handling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Real-time Updates:</div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Enabled</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Search Debounce:</div>
                <div className="text-sm text-muted-foreground">300ms</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Auto-refresh:</div>
                <div className="text-sm text-muted-foreground">On CRUD operations</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Environment Variables
            </CardTitle>
            <CardDescription>Required environment variables for the application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">NEXT_PUBLIC_API_BASE_URL</div>
                  <div className="text-xs text-muted-foreground">Base URL for your FastAPI backend</div>
                  <div className="text-xs font-mono bg-muted p-2 rounded">
                    {process.env.NEXT_PUBLIC_API_BASE_URL || "Not set (using default)"}
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Note:</strong> Make sure your FastAPI backend is running and accessible at the configured URL.
                The backend should handle CORS properly to allow requests from this frontend.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
