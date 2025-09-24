import { ApiClient } from "./api-client"

export interface Task {
  id: number
  title: string
  description: string | null
  status: "pending" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  created_at: string
  updated_at: string
}

export interface TaskCreateData {
  title: string
  description?: string
  priority?: "low" | "medium" | "high"
}

export interface TaskUpdateData {
  title?: string
  description?: string
  status?: "pending" | "in_progress" | "completed"
  priority?: "low" | "medium" | "high"
}

export interface TaskFilters {
  status?: string
  priority?: string
  search?: string
}

export class TaskService {
  static async getTasks(filters: TaskFilters = {}): Promise<Task[]> {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })

    const endpoint = `/tasks${params.toString() ? `?${params}` : ""}`
    const response = await ApiClient.get<Task[]>(endpoint)

    if (response.error) {
      throw new Error(response.error)
    }

    return response.data || []
  }

  static async getTask(id: number): Promise<Task> {
    const response = await ApiClient.get<Task>(`/tasks/${id}`)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Task not found")
  }

  static async createTask(data: TaskCreateData): Promise<Task> {
    const response = await ApiClient.post<Task>("/tasks", data)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to create task")
  }

  static async updateTask(id: number, data: TaskUpdateData): Promise<Task> {
    const response = await ApiClient.put<Task>(`/tasks/${id}`, data)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to update task")
  }

  static async deleteTask(id: number): Promise<void> {
    const response = await ApiClient.delete(`/tasks/${id}`)

    if (response.error) {
      throw new Error(response.error)
    }
  }
}
