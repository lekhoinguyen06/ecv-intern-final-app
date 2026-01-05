"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth" 

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export default function HomePage() {
  const router = useRouter()
  const [hasProfile, setHasProfile] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) 

  useEffect(() => {
    checkUserAndProfile()
  }, [])

  const checkUserAndProfile = async () => {
    try {
      setIsLoading(true)

      const { username: cognitoUsername } = await getCurrentUser()
      const attributes = await fetchUserAttributes()
      setUsername(cognitoUsername)

      const session = await fetchAuthSession()
      const token = session.tokens?.accessToken?.toString()

      if (!token) throw new Error("No session token found")

      const params = new URLSearchParams({ email: attributes.email || "" })
      
      const res = await fetch(`${API_URL}/api/user?${params.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })

      if (res.ok) {
        const json = await res.json()
        const data = json.data || json

        // Chỉ tính là có profile nếu các trường quan trọng đều có dữ liệu
        const isComplete = 
            data.name && 
            data.age && 
            data.sex && 
            data.jobTitle && 
            data.description &&
            (Array.isArray(data.studies) ? data.studies.length > 0 : data.studies) &&
            (Array.isArray(data.interests) ? data.interests.length > 0 : data.interests)

        setHasProfile(Boolean(isComplete))
      } else if (res.status === 404) {
        setHasProfile(false)
      } else {
        console.warn("Unexpected API response:", res.status)
        setHasProfile(false)
      }
      
    } catch (error: any) {
      console.error("Error:", error)
      if (
        error.name === "UserUnAuthenticatedException" || 
        error.message?.includes("authenticated") ||
        String(error).includes("User not signed in")
      ) {
        router.push("/signin")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back, {username}!</h1>
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
                    <p className="text-sm text-muted-foreground">Your information is up to date.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Profile Incomplete</p>
                    <p className="text-sm text-muted-foreground">You need to fill in all information.</p>
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