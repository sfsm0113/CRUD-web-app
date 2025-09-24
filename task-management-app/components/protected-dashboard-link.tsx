"use client"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"

interface ProtectedDashboardLinkProps {
  children: React.ReactNode
  className?: string
}

export function ProtectedDashboardLink({ children, className }: ProtectedDashboardLinkProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [canNavigate, setCanNavigate] = useState(false)

  useEffect(() => {
    if (!loading) {
      setCanNavigate(!!user)
    }
  }, [user, loading])

  const handleClick = () => {
    if (loading) return
    
    if (user) {
      router.push("/dashboard")
    } else {
      // If not authenticated, go to home page instead of forcing login
      router.push("/")
    }
  }

  return (
    <Button onClick={handleClick} className={className}>
      {children}
    </Button>
  )
}