"use client"

import type React from "react"
import { signIn, getCurrentUser } from "aws-amplify/auth"
import { useState, useEffect } from "react" 
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react" 

export default function SignInPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getCurrentUser()
        router.replace("/home")
      } catch (err) {
        setCheckingAuth(false)
      }
    }

    checkAuthStatus()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await signIn({
        username: identifier,
        password,
      })

      router.push("/home")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Login failed")
    }
  }


  if (checkingAuth) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Username or Email</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Enter username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-foreground underline hover:text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}