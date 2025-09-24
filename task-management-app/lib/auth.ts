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
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

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

  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (response.status === 401) {
      this.removeToken()
      if (typeof window !== "undefined" && 
          !window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/signup') &&
          !window.location.pathname.includes('/')) {
        window.location.href = "/login"
      }
      throw new Error("Session expired. Please log in again.")
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  static async login(credentials: LoginCredentials): Promise<AuthToken> {
    const response = await this.request<AuthToken>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    this.setToken(response.access_token)
    return response
  }

  static async signup(credentials: SignupCredentials): Promise<User> {
    const response = await this.request<User>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    return response
  }

  static async getCurrentUser(): Promise<User> {
    const token = this.getToken()
    if (!token) {
      throw new Error("No authentication token found")
    }

    const response = await this.request<User>("/user/profile", {
      method: "GET",
    })

    return response
  }

  static logout(): void {
    this.removeToken()
    // Don't redirect here - let the calling component handle the redirect
    // This prevents issues with Next.js routing
  }
}
