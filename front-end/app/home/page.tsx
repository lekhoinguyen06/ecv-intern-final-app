"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, CheckCircle, AlertCircle } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    // Check if profile exists in localStorage
    const storedProfile = localStorage.getItem("userProfile")
    setHasProfile(!!storedProfile)
  }, [])

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">Manage your personal profile information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Status
            </CardTitle>
            <CardDescription>Check your profile completion status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              {hasProfile ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Profile Complete</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Profile Incomplete</p>
                    <p className="text-sm text-muted-foreground">
                      Add your personal information to complete your profile now.
                    </p>
                  </div>
                </>
              )}
            </div>
            <Button onClick={() => router.push("/profile")} className="w-full">
              {hasProfile ? "View Profile" : "Complete Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
