"use client"

import { useState, useEffect } from "react"
import { PostService, type Post, type PostFilters } from "@/lib/posts"
import { useDebounce } from "./use-debounce"

export function usePosts(initialFilters: PostFilters = {}) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PostFilters>(initialFilters)

  const debouncedFilters = useDebounce(filters, 300)

  const fetchPosts = async (currentFilters: PostFilters = debouncedFilters) => {
    setLoading(true)
    setError(null)
    try {
      const fetchedPosts = await PostService.getPosts(currentFilters)
      setPosts(fetchedPosts)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch posts"
      // Don't set error for authentication issues - let the layout handle redirect
      if (!errorMessage.includes("Session expired") && !errorMessage.includes("401")) {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [debouncedFilters])

  const updateFilters = (newFilters: PostFilters) => {
    setFilters(newFilters)
  }

  const refreshPosts = () => {
    fetchPosts()
  }

  return {
    posts,
    loading,
    error,
    filters,
    updateFilters,
    refreshPosts,
  }
}