"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TaskCard } from "@/components/tasks/task-card"
import { TaskForm } from "@/components/tasks/task-form"
import { TaskFiltersComponent } from "@/components/tasks/task-filters"
import { TaskStats } from "@/components/tasks/task-stats"
import { DeleteTaskDialog } from "@/components/tasks/delete-task-dialog"
import { useTasks } from "@/hooks/use-tasks"
import { TaskService, type Task, type TaskCreateData, type TaskUpdateData } from "@/lib/tasks"
import { Plus, Loader2 } from "lucide-react"

export default function TasksPage() {
  const { tasks, loading, error, filters, updateFilters, refreshTasks } = useTasks()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleCreateTask = async (data: TaskCreateData) => {
    await TaskService.createTask(data)
    refreshTasks()
  }

  const handleUpdateTask = async (data: TaskUpdateData) => {
    if (!editingTask) return
    await TaskService.updateTask(editingTask.id, data)
    refreshTasks()
    setEditingTask(null)
  }

  const handleDeleteTask = async (task: Task) => {
    await TaskService.deleteTask(task.id)
    refreshTasks()
    setDeletingTask(null)
  }

  const handleStatusChange = async (task: Task, status: Task["status"]) => {
    await TaskService.updateTask(task.id, { status })
    refreshTasks()
  }

  const openEditForm = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const openDeleteDialog = (task: Task) => {
    setDeletingTask(task)
    setIsDeleteDialogOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  // Unified submit handler to satisfy TaskFormProps
  const handleSubmit = async (data: TaskCreateData | TaskUpdateData) => {
    if (editingTask) {
      // Type assertion is safe here because when editingTask exists, data is TaskUpdateData
      await handleUpdateTask(data as TaskUpdateData)
    } else {
      // When not editing, data is TaskCreateData
      await handleCreateTask(data as TaskCreateData)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tasks
            </h1>
            <p className="text-muted-foreground mt-2">Manage your tasks and track your progress efficiently</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button onClick={() => setIsFormOpen(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        {!loading && tasks.length > 0 && <TaskStats tasks={tasks} />}

        <TaskFiltersComponent
          filters={filters}
          onFiltersChange={updateFilters}
          taskCount={loading ? undefined : tasks.length}
        />

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading tasks...</span>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              {Object.values(filters).some((v) => v) ? "No tasks match your filters." : "No tasks yet."}
            </div>
            <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create your first task
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        <TaskForm
          task={editingTask || undefined}
          open={isFormOpen}
          onOpenChange={closeForm}
          onSubmit={handleSubmit}
        />

        <DeleteTaskDialog
          task={deletingTask}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteTask}
        />
      </div>
    </DashboardLayout>
  )
}
