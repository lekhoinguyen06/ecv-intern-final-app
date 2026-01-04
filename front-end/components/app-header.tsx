"use client"

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
import { useRouter } from "next/navigation"

export function AppHeader() {
  const router = useRouter()

const handleLogout = () => {
  try {
    const {
      CognitoUserPool,
    } = require("amazon-cognito-identity-js")

    const userPool = new CognitoUserPool({
      UserPoolId: "ap-southeast-1_4G7kcguGH",
      ClientId: "5kuv35ke2b3jvggf65rhu52t9e",
    })

    const user = userPool.getCurrentUser()

    // 🔴 QUAN TRỌNG NHẤT
    user?.signOut()
  } catch (e) {
    console.warn("Cognito signOut failed", e)
  }

  // 🔥 Clear SAU KHI signOut
  localStorage.clear()
  sessionStorage.clear()

  // 🔥 Redirect CỨNG
  window.location.href = "/signin"
}

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 md:pl-72">
      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 rounded-lg hover:bg-muted p-2 transition-colors">
            <div className="text-right">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@email.com</p>
            </div>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
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
