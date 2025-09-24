"use client"

import { useState, useEffect } from "react"
import { AuthService, type User } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      const token = AuthService.getToken()
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const currentUser = await AuthService.getCurrentUser()
        setUser(currentUser)
        setError(null) // Clear any previous errors
      } catch (err) {
        console.log("Auth check failed:", err instanceof Error ? err.message : "Authentication failed")
        // Only set error if it's not a simple "no token" case
        if (token) {
          setError(err instanceof Error ? err.message : "Authentication failed")
        }
        AuthService.removeToken()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const tokenResponse = await AuthService.login({ email, password })
      const currentUser = await AuthService.getCurrentUser()
      setUser(currentUser)
      setError(null) // Clear any previous errors
      return currentUser
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
      setUser(null) // Ensure user is cleared on login failure
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, full_name: string) => {
    setLoading(true)
    setError(null)
    try {
      const newUser = await AuthService.signup({ email, password, full_name })
      // Auto-login after signup
      await AuthService.login({ email, password })
      const currentUser = await AuthService.getCurrentUser()
      setUser(currentUser)
      return newUser
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
    setError(null)
    // The component using this hook should handle the redirect
  }

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }
}
