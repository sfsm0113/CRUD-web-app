"use client"

import { useState } from "react"
import { NoteService, type Note } from "@/lib/notes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NoteForm } from "./note-form"
import { MoreHorizontal, Star, StarOff, Edit, Trash2, Calendar, Folder } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface NoteCardProps {
  note: Note
  onUpdate: () => void
  onDelete: () => void
}

export function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      await NoteService.updateNote(note.id, {
        is_favorite: !note.is_favorite
      })
      toast({
        title: "Success",
        description: note.is_favorite ? "Removed from favorites" : "Added to favorites",
      })
      onUpdate()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await NoteService.deleteNote(note.id)
      toast({
        title: "Success",
        description: "Note deleted successfully",
      })
      onDelete()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work: "bg-blue-100 text-blue-800 border-blue-200",
      personal: "bg-green-100 text-green-800 border-green-200",
      ideas: "bg-purple-100 text-purple-800 border-purple-200",
      research: "bg-orange-100 text-orange-800 border-orange-200",
      recipes: "bg-red-100 text-red-800 border-red-200",
      travel: "bg-cyan-100 text-cyan-800 border-cyan-200",
      finance: "bg-yellow-100 text-yellow-800 border-yellow-200",
      health: "bg-pink-100 text-pink-800 border-pink-200",
      education: "bg-indigo-100 text-indigo-800 border-indigo-200",
      general: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[category] || colors.general
  }

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-2 mb-2">{note.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Folder className="h-3 w-3" />
              <Badge variant="outline" className={getCategoryColor(note.category)}>
                {note.category.charAt(0).toUpperCase() + note.category.slice(1)}
              </Badge>
              {note.is_favorite && (
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleFavorite} disabled={loading}>
                {note.is_favorite ? (
                  <>
                    <StarOff className="mr-2 h-4 w-4" />
                    Remove from favorites
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-4 w-4" />
                    Add to favorites
                  </>
                )}
              </DropdownMenuItem>
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                  </DialogHeader>
                  <NoteForm
                    note={note}
                    onSubmit={() => {
                      setShowEditDialog(false)
                      onUpdate()
                    }}
                    onCancel={() => setShowEditDialog(false)}
                  />
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{note.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={loading}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {note.content && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {note.content}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>
            {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
          </span>
          {note.updated_at !== note.created_at && (
            <span>• Updated {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}