"use client"

import { useState } from "react"
import { NoteService, type NoteCreateData, type NoteUpdateData, type Note } from "@/lib/notes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NoteFormProps {
  note?: Note
  onSubmit: () => void
  onCancel: () => void
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

export function NoteForm({ note, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(note?.title ?? "")
  const [content, setContent] = useState(note?.content ?? "")
  const [category, setCategory] = useState(note?.category ?? "general")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    
    try {
      if (note) {
        const updateData: NoteUpdateData = {
          title: title.trim(),
          content: content.trim() || undefined,
          category: category,
        }
        await NoteService.updateNote(note.id, updateData)
        toast({
          title: "Success",
          description: "Note updated successfully",
        })
      } else {
        const createData: NoteCreateData = {
          title: title.trim(),
          content: content.trim() || undefined,
          category: category,
        }
        await NoteService.createNote(createData)
        toast({
          title: "Success",
          description: "Note created successfully",
        })
      }
      onSubmit()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save note",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background border border-border focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your note content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] bg-background border border-border focus:ring-2 focus:ring-primary/20 resize-none"
          rows={6}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {note ? "Update Note" : "Create Note"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  )
}