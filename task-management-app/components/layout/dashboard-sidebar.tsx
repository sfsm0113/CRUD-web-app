"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CheckSquare, User, Settings, BarChart3 } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="text-xl font-bold text-sidebar-primary">
          TaskFlow
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
