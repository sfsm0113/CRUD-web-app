import { ApiClient } from "./api-client"

export interface Post {
  id: number
  title: string
  content: string
  status: "draft" | "published" | "archived"
  tags: string[]
  view_count: number
  created_at: string
  updated_at: string
}

export interface PostCreateData {
  title: string
  content: string
  status?: "draft" | "published" | "archived"
  tags?: string[]
}

export interface PostUpdateData {
  title?: string
  content?: string
  status?: "draft" | "published" | "archived"
  tags?: string[]
}

export interface PostFilters {
  status?: string
  search?: string
}

export class PostService {
  static async getPosts(filters: PostFilters = {}): Promise<Post[]> {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    const endpoint = `/posts${params.toString() ? `?${params}` : ""}`
    const response = await ApiClient.get<Post[]>(endpoint)

    if (response.error) {
      throw new Error(response.error)
    }

    return response.data || []
  }

  static async getPost(id: number): Promise<Post> {
    const response = await ApiClient.get<Post>(`/posts/${id}`)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Post not found")
  }

  static async createPost(data: PostCreateData): Promise<Post> {
    const response = await ApiClient.post<Post>("/posts", data)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to create post")
  }

  static async updatePost(id: number, data: PostUpdateData): Promise<Post> {
    const response = await ApiClient.put<Post>(`/posts/${id}`, data)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to update post")
  }

  static async deletePost(id: number): Promise<void> {
    const response = await ApiClient.delete(`/posts/${id}`)

    if (response.error) {
      throw new Error(response.error)
    }
  }
}