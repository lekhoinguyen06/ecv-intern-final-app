"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CognitoUser } from "amazon-cognito-identity-js"
import { userPool } from "@/utils/cognito"

function ConfirmSignUpContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [code, setCode] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const user = searchParams.get("username")
    if (user) setUsername(user)
  }, [searchParams])

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!username) {
      setError("Username is required")
      return
    }

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.confirmRegistration(code, true, (err) => {
      if (err) {
        setError(err.message || JSON.stringify(err))
        return
      }
      setSuccess("Confirmation successful! Redirecting to sign in page...")
      setTimeout(() => router.push("/signin"), 2000)
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Confirm Sign Up</CardTitle>
          <CardDescription>
            Enter the confirmation code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConfirm} className="space-y-4">
            <div className="space-y-2">
              <Label>Confirmation Code</Label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <Button type="submit" className="w-full">
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ConfirmSignUpPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <ConfirmSignUpContent />
    </Suspense>
  )
}
