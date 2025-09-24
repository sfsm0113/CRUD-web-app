"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X, Star, Folder } from "lucide-react"
import type { NoteFilters } from "@/lib/notes"

interface NoteFiltersProps {
  filters: NoteFilters
  onFiltersChange: (filters: NoteFilters) => void
}

const categories = [
  "general",
  "work",
  "personal",
  "ideas",
  "research",
  "recipes",
  "travel",
  "finance",
  "health",
  "education"
]

export function NoteFilters({ filters, onFiltersChange }: NoteFiltersProps) {
  const updateFilter = (key: keyof NoteFilters, value: string | boolean | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filter Notes
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search notes..."
                value={filters.search || ""}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Category
            </label>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) => updateFilter("category", value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Favorites Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </label>
            <Select
              value={filters.is_favorite === undefined ? "all" : filters.is_favorite.toString()}
              onValueChange={(value) => 
                updateFilter("is_favorite", value === "all" ? undefined : value === "true")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All notes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All notes</SelectItem>
                <SelectItem value="true">Favorites only</SelectItem>
                <SelectItem value="false">Non-favorites only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {filters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {filters.search}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilter("search", "")}
                />
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilter("category", undefined)}
                />
              </Badge>
            )}
            {filters.is_favorite !== undefined && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.is_favorite ? "Favorites only" : "Non-favorites only"}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilter("is_favorite", undefined)}
                />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}