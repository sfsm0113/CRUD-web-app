import { ApiClient } from "./api-client"
import type { User } from "./auth"

export interface UserUpdateData {
  email?: string
  full_name?: string
}

export class UserService {
  static async updateProfile(data: UserUpdateData): Promise<User> {
    const response = await ApiClient.put<User>("/user/profile", data)

    if (response.error) {
      throw new Error(response.error)
    }

    if (response.data) {
      return response.data
    }

    throw new Error("Failed to update profile")
  }
}
