import { AuthService } from "./auth"

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

export class ApiClient {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (response.status === 401) {
        AuthService.removeToken()
        // Only redirect if we're not already on the login/signup page
        if (typeof window !== "undefined" && 
            !window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/signup') &&
            !window.location.pathname.includes('/')) {
          window.location.href = "/login"
        }
        return {
          error: "Session expired. Please log in again.",
          status: response.status,
        }
      }

      if (response.status === 204) {
        return { status: response.status }
      }

      const data = await response.json()

      if (!response.ok) {
        return {
          error: data.detail || `HTTP ${response.status}`,
          status: response.status,
        }
      }

      return {
        data,
        status: response.status,
      }
    } catch (error) {
      if (error instanceof Error && error.message === "Unauthorized") {
        throw error
      }

      return {
        error: error instanceof Error ? error.message : "Network error",
        status: 0,
      }
    }
  }

  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  static async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  static async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}
