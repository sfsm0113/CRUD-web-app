"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { TaskFilters } from "@/lib/tasks"
import { Search, X, Filter } from "lucide-react"

interface TaskFiltersProps {
  filters: TaskFilters
  onFiltersChange: (filters: TaskFilters) => void
  taskCount?: number
}

export function TaskFiltersComponent({ filters, onFiltersChange, taskCount }: TaskFiltersProps) {
  const updateFilter = (key: keyof TaskFilters, value: string) => {
    const newValue = value === "all" ? undefined : value
    onFiltersChange({
      ...filters,
      [key]: newValue,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const activeFilters = Object.entries(filters).filter(([_, value]) => value && value !== "all")
  const hasActiveFilters = activeFilters.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks by title or description..."
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={filters.status || "all"} onValueChange={(value) => updateFilter("status", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.priority || "all"} onValueChange={(value) => updateFilter("priority", value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" size="icon" onClick={clearFilters} title="Clear all filters">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {(hasActiveFilters || taskCount !== undefined) && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <>
                <Filter className="h-4 w-4" />
                <span>Active filters:</span>
                <div className="flex gap-1">
                  {activeFilters.map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key}: {value}
                      <button
                        onClick={() => updateFilter(key as keyof TaskFilters, "")}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
          {taskCount !== undefined && (
            <div>
              {taskCount} {taskCount === 1 ? "task" : "tasks"} found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
