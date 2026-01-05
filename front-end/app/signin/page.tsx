"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import { userPool } from "@/utils/cognito"
import {  useEffect } from "react"

export default function SignInPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

 

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       await getCurrentUser()
  //       router.replace("/home")
  //     } catch (err) {
  //       setCheckingAuth(false)
  //     }
  //   }

  //   checkAuthStatus()
  // }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = new CognitoUser({ Username: identifier, Pool: userPool })
    const authDetails = new AuthenticationDetails({ Username: identifier, Password: password })

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken()
        const accessToken = result.getAccessToken().getJwtToken()
        const refreshToken = result.getRefreshToken().getToken()

        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("idToken", idToken)

        router.push("/home")
      },
      onFailure: (err) => {
        setError(err.message || JSON.stringify(err))
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Username or Email</Label>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">Sign In</Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
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