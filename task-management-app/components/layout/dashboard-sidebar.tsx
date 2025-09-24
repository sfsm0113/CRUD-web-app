"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LayoutDashboard, CheckSquare, User, Settings, BarChart3, Users, Calendar, FolderOpen, Zap } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    badge: "24",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
    badge: "5",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
    badge: null,
  },
  {
    name: "Team", 
    href: "/team",
    icon: Users,
    badge: null,
  },
]

const secondaryNavigation = [
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Automation",
    href: "/automation",
    icon: Zap,
    badge: "New",
  },
]

const userNavigation = [
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    badge: null,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  const renderNavItem = (item: any) => {
    const isActive = pathname === item.href
    return (
      <Button
        key={item.name}
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start group relative",
          isActive
            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
        )}
      >
        <Link href={item.href} className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <item.icon className={cn(
              "mr-3 h-4 w-4",
              isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"
            )} />
            <span className="font-medium">{item.name}</span>
          </div>
          {item.badge && (
            <Badge 
              variant="secondary" 
              className={cn(
                "ml-auto text-xs",
                item.badge === "New" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              )}
            >
              {item.badge}
            </Badge>
          )}
        </Link>
      </Button>
    )
  }

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        {/* Primary Navigation */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
            Main
          </p>
          {navigation.map(renderNavItem)}
        </div>

        <Separator />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
            Tools
          </p>
          {secondaryNavigation.map(renderNavItem)}
        </div>

        <Separator />

        {/* User Navigation */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
            Account
          </p>
          {userNavigation.map(renderNavItem)}
        </div>
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4 m-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-sm text-gray-900">Upgrade to Pro</h3>
          <p className="text-xs text-gray-600">Unlock advanced features and unlimited tasks</p>
          <Button size="sm" className="w-full text-xs">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )
}
