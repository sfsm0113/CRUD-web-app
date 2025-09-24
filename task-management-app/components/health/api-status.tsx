"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface HealthStatus {
  status: string
  database?: string
  error?: string
}

export function ApiStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      setHealth(data)
      setLastChecked(new Date())
    } catch (error) {
      setHealth({
        status: "error",
        error: "Failed to connect to health endpoint",
      })
      setLastChecked(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  const getStatusIcon = () => {
    if (loading) return <RefreshCw className="h-4 w-4 animate-spin" />
    if (!health) return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    if (health.status === "healthy") return <CheckCircle className="h-4 w-4 text-green-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const getStatusBadge = () => {
    if (loading) return <Badge variant="secondary">Checking...</Badge>
    if (!health) return <Badge variant="secondary">Unknown</Badge>
    if (health.status === "healthy")
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Healthy</Badge>
    return <Badge variant="destructive">Unhealthy</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          API Status
        </CardTitle>
        <CardDescription>Backend API connection status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          {getStatusBadge()}
        </div>

        {health?.database && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Database:</span>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {health.database}
            </Badge>
          </div>
        )}

        {health?.error && (
          <div className="text-sm text-destructive">
            <strong>Error:</strong> {health.error}
          </div>
        )}

        {lastChecked && (
          <div className="text-xs text-muted-foreground">Last checked: {lastChecked.toLocaleTimeString()}</div>
        )}

        <Button onClick={checkHealth} disabled={loading} size="sm" variant="outline" className="w-full bg-transparent">
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Check Status
        </Button>
      </CardContent>
    </Card>
  )
}
