import { ApiClient } from "./api-client"

export interface Note {
  id: number
  title: string
  content: string | null
  category: string
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export interface NoteCreateData {
  title: string
  content?: string
  category?: string
}

export interface NoteUpdateData {
  title?: string
  content?: string
  category?: string
  is_favorite?: boolean
}

export interface NoteFilters {
  category?: string
  is_favorite?: boolean
  search?: string
}

export class NoteService {
  static async getNotes(filters: NoteFilters = {}): Promise<Note[]> {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })

    const endpoint = `/notes${params.toString() ? `?${params}` : ""}`
    const response = await ApiClient.get<Note[]>(endpoint)

    if (response.error) {
      throw new Error(response.error)
    }

    return response.data || []
  }

  static async getNote(id: number): Promise<Note> {
    const response = await ApiClient.get<Note>(`/notes/${id}`)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Note not found")
  }

  static async createNote(data: NoteCreateData): Promise<Note> {
    const response = await ApiClient.post<Note>("/notes", data)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to create note")
  }

  static async updateNote(id: number, data: NoteUpdateData): Promise<Note> {
    const response = await ApiClient.put<Note>(`/notes/${id}`, data)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to update note")
  }

  static async deleteNote(id: number): Promise<void> {
    const response = await ApiClient.delete(`/notes/${id}`)

    if (response.error) {
      throw new Error(response.error)
    }
  }
}