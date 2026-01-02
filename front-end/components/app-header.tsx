"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, getCurrentUser } from "aws-amplify/auth"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"

type CognitoUser = {
  username: string
  email?: string
}

export function AppHeader() {
  const router = useRouter()
  const [user, setUser] = useState<CognitoUser | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser()

        setUser({
          username: currentUser.username,
          email: currentUser.signInDetails?.loginId,
        })
      } catch {
        // Chưa login → đá về signin
        router.push("/signin")
      }
    }

    loadUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/signin")
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  if (!user) return null

  const initials = user.username
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 md:pl-72">
      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 rounded-lg hover:bg-muted p-2 transition-colors">
            <div className="text-right">
              <p className="text-sm font-medium">{user.username}</p>
              {user.email && (
                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>

            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
