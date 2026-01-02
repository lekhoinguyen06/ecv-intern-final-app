"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signUp, confirmSignUp, resendSignUpCode } from "aws-amplify/auth"

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
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignUpPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState<"signup" | "verify">("signup")

  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const { nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            name: username,
          },
        },
      })
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setStep("verify")
        setSuccessMessage("Account created! Please check your email for the code.")
      } else {

        router.push("/signin")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  // 2. Xử lý Xác minh (Confirm Code)
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await confirmSignUp({
        username,
        confirmationCode: verificationCode
      })


      router.push("/signin")
    } catch (err: any) {
      setError(err.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }


  const handleResendCode = async () => {
    setError("")
    setSuccessMessage("")
    try {
      await resendSignUpCode({ username })
      setSuccessMessage("Code resent successfully. Please check your email.")
    } catch (err: any) {
      setError(err.message || "Failed to resend code")
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {step === "signup" ? "Sign Up" : "Verify Account"}
          </CardTitle>
          <CardDescription>
            {step === "signup" 
              ? "Create a new account to get started" 
              : `Enter the code sent to ${email}`}
          </CardDescription>
        </CardHeader>

        <CardContent>

          {error && (
            <div className="mb-4 text-sm text-destructive font-medium">{error}</div>
          )}
          {successMessage && (
            <div className="mb-4 text-sm text-green-600 font-medium">{successMessage}</div>
          )}

          {step === "signup" ? (

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-foreground underline hover:text-primary"
                >
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Confirm Account"}
              </Button>

              <div className="flex justify-between text-sm mt-4">
                 <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-primary hover:underline"
                >
                  Resend Code
                </button>
                <button
                  type="button"
                  onClick={() => setStep("signup")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Back to Sign Up
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}