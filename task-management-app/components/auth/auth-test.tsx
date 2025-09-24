"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export function AuthTest() {
  const { user, loading, error, isAuthenticated } = useAuth()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
        <CardDescription>Debug authentication state</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Loading:</span>
          <Badge variant={loading ? "default" : "secondary"}>
            {loading ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Loading
              </>
            ) : (
              "Ready"
            )}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Authenticated:</span>
          <Badge variant={isAuthenticated ? "default" : "destructive"}>
            {isAuthenticated ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Yes
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                No
              </>
            )}
          </Badge>
        </div>

        {error && (
          <div className="p-2 bg-red-50 rounded text-sm text-red-700">
            Error: {error}
          </div>
        )}

        {user && (
          <div className="space-y-2">
            <div className="text-sm font-medium">User Info:</div>
            <div className="text-xs space-y-1 p-2 bg-gray-50 rounded">
              <div>ID: {user.id}</div>
              <div>Email: {user.email}</div>
              <div>Name: {user.full_name}</div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Token: {typeof window !== 'undefined' && localStorage.getItem('taskflow_token') ? 'Present' : 'Missing'}
        </div>
      </CardContent>
    </Card>
  )
}