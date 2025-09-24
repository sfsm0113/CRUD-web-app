"use client"

import { useState, useEffect } from "react"
import { NoteService, type Note, type NoteFilters } from "@/lib/notes"
import { useDebounce } from "./use-debounce"

export function useNotes(initialFilters: NoteFilters = {}) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<NoteFilters>(initialFilters)

  const debouncedFilters = useDebounce(filters, 300)

  const fetchNotes = async (currentFilters: NoteFilters = debouncedFilters) => {
    setLoading(true)
    setError(null)
    try {
      const fetchedNotes = await NoteService.getNotes(currentFilters)
      setNotes(fetchedNotes)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch notes"
      // Don't set error for authentication issues - let the layout handle redirect
      if (!errorMessage.includes("Session expired") && !errorMessage.includes("401")) {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [debouncedFilters])

  const updateFilters = (newFilters: NoteFilters) => {
    setFilters(newFilters)
  }

  const refreshNotes = () => {
    fetchNotes()
  }

  return {
    notes,
    loading,
    error,
    filters,
    updateFilters,
    refreshNotes,
  }
}