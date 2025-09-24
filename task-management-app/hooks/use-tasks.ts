"use client"

import { useState, useEffect } from "react"
import { TaskService, type Task, type TaskFilters } from "@/lib/tasks"
import { useDebounce } from "./use-debounce"

export function useTasks(initialFilters: TaskFilters = {}) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<TaskFilters>(initialFilters)

  const debouncedFilters = useDebounce(filters, 300)

  const fetchTasks = async (currentFilters: TaskFilters = debouncedFilters) => {
    setLoading(true)
    setError(null)
    try {
      const fetchedTasks = await TaskService.getTasks(currentFilters)
      setTasks(fetchedTasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [debouncedFilters])

  const updateFilters = (newFilters: TaskFilters) => {
    setFilters(newFilters)
  }

  const refreshTasks = () => {
    fetchTasks()
  }

  return {
    tasks,
    loading,
    error,
    filters,
    updateFilters,
    refreshTasks,
  }
}
