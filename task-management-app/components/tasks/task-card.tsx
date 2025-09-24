"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "@/lib/tasks"
import { MoreHorizontal, Edit, Trash2, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onStatusChange: (task: Task, status: Task["status"]) => void
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  in_progress: {
    label: "In Progress",
    icon: AlertCircle,
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
}

const priorityConfig = {
  low: {
    label: "Low",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
  medium: {
    label: "Medium",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  high: {
    label: "High",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const StatusIcon = statusConfig[task.status].icon

  const handleStatusChange = async (newStatus: Task["status"]) => {
    setIsUpdating(true)
    try {
      await onStatusChange(task, newStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight">{task.title}</h3>
            {task.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={cn("text-xs", statusConfig[task.status].className)}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {statusConfig[task.status].label}
            </Badge>
            <Badge variant="outline" className={cn("text-xs", priorityConfig[task.priority].className)}>
              {priorityConfig[task.priority].label}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">{new Date(task.updated_at).toLocaleDateString()}</div>
        </div>

        <div className="flex gap-1 mt-3">
          {task.status !== "pending" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("pending")}
              disabled={isUpdating}
              className="text-xs"
            >
              Pending
            </Button>
          )}
          {task.status !== "in_progress" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("in_progress")}
              disabled={isUpdating}
              className="text-xs"
            >
              In Progress
            </Button>
          )}
          {task.status !== "completed" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("completed")}
              disabled={isUpdating}
              className="text-xs"
            >
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
