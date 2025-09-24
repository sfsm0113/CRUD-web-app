import { ApiClient } from "./api-client"

export interface User {
  id: number
  email: string
  full_name: string
  created_at: string
}

export interface AuthToken {
  access_token: string
  token_type: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  full_name: string
}

export class AuthService {
  private static readonly TOKEN_KEY = "taskflow_token"

  static getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static removeToken(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.TOKEN_KEY)
  }

  static getAuthHeaders(): HeadersInit {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  static async login(credentials: LoginCredentials): Promise<AuthToken> {
    const response = await ApiClient.post<AuthToken>("/auth/login", credentials)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      this.setToken(response.data.access_token)
      return response.data
    }

    throw new Error("Login failed")
  }

  static async signup(credentials: SignupCredentials): Promise<User> {
    const response = await ApiClient.post<User>("/auth/signup", credentials)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Signup failed")
  }

  static async getCurrentUser(): Promise<User> {
    const token = this.getToken()
    if (!token) {
      throw new Error("No authentication token found")
    }

    const response = await ApiClient.get<User>("/user/profile")

    if (response.error) {
      // If it's an auth error, clean up the token
      if (response.status === 401) {
        this.removeToken()
      }
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to fetch user")
  }

  static logout(): void {
    this.removeToken()
    // Don't redirect here - let the calling component handle the redirect
    // This prevents issues with Next.js routing
  }
}
