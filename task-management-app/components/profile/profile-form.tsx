"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import { UserService } from "@/lib/user"
import { Loader2, User, Mail, CheckCircle } from "lucide-react"

export function ProfileForm() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState(user?.full_name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      await UserService.updateProfile({
        full_name: fullName,
        email: email,
      })
      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Settings
        </CardTitle>
        <CardDescription>Update your personal information and account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Account ID:</strong> {user.id}
            </p>
            <p>
              <strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
