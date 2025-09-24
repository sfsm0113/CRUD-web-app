"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Task, TaskCreateData, TaskUpdateData } from "@/lib/tasks"
import { Loader2 } from "lucide-react"

interface TaskFormProps {
  task?: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TaskCreateData | TaskUpdateData) => Promise<void>
}

export function TaskForm({ task, open, onOpenChange, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "")
  const [description, setDescription] = useState(task?.description || "")
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium")
  const [status, setStatus] = useState<"pending" | "in_progress" | "completed">(task?.status || "pending")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const data = task ? { title, description, priority, status } : { title, description, priority }

      await onSubmit(data)
      onOpenChange(false)

      // Reset form if creating new task
      if (!task) {
        setTitle("")
        setDescription("")
        setPriority("medium")
        setStatus("pending")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save task")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white border-2 shadow-2xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {task ? "Update the task details below." : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="title" className="text-base font-semibold text-gray-900">
                Task Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter a clear, descriptive title for your task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-base font-semibold text-gray-900">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Add more details about this task, requirements, or notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                rows={4}
                className="text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="priority" className="text-base font-semibold text-gray-900">
                  Priority Level
                </Label>
                <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                  <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 bg-white">
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    <SelectItem value="low" className="text-base py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        Low Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="medium" className="text-base py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        Medium Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="high" className="text-base py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        High Priority
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {task && (
                <div className="space-y-3">
                  <Label htmlFor="status" className="text-base font-semibold text-gray-900">
                    Task Status
                  </Label>
                  <Select
                    value={status}
                    onValueChange={(value: "pending" | "in_progress" | "completed") => setStatus(value)}
                  >
                    <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 bg-white">
                      <SelectValue placeholder="Select task status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200">
                      <SelectItem value="pending" className="text-base py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="in_progress" className="text-base py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          In Progress
                        </div>
                      </SelectItem>
                      <SelectItem value="completed" className="text-base py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          Completed
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="pt-6 border-t gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              disabled={isLoading}
              className="h-12 px-6 text-base border-2 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-6 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {task ? "Updating..." : "Creating..."}
                </>
              ) : task ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
