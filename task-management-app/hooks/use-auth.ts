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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication failed")
        AuthService.removeToken()
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
      await AuthService.login({ email, password })
      const currentUser = await AuthService.getCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
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
