"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Home, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    // Clear all client-side state
      localStorage.clear()
      sessionStorage.clear()
    // Redirect to signin page
    window.location.href = "/signin"
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar - Static positioning, part of flex layout */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white md:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-6">
            <h1 className="text-xl font-semibold">User Profile App</h1>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-border p-4">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay - Fixed positioning */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-white md:hidden">
            <div className="flex h-full flex-col">
              <div className="border-b border-border p-6">
                <h1 className="text-xl font-semibold">User Profile App</h1>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="border-t border-border p-4">
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Column */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-white px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
