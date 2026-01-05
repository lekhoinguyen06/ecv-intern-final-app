"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertCircle, X } from "lucide-react" 
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js" // Dùng thư viện cũ
import { userPool } from "@/utils/cognito" // Lấy userPool từ file utils của bạn

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

function parseJwt(token: string) {
  try { return JSON.parse(atob(token.split('.')[1])); } catch (e) { return null; }
}

export default function SettingsPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" })

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ show: true, message, type })
    setTimeout(() => { setNotification((prev) => ({ ...prev, show: false })) }, 3000)
  }

  useEffect(() => {
    loadUserData()
  }, [])
  
  const loadUserData = async () => {
    try {
      setIsLoading(true)
      const accessToken = localStorage.getItem("accessToken")
      const idToken = localStorage.getItem("idToken")

      if (!accessToken || !idToken) {
         throw new Error("No session")
      }

      const userData = parseJwt(idToken)
      setUsername(userData["cognito:username"] || userData.sub)
      setEmail(userData.email)
      
    } catch (error) {
      router.push("/signin") 
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    // 1. Lấy user hiện tại để signout từ SDK
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    // 2. Xóa sạch Local Storage tự quản lý
    localStorage.clear()
    router.push("/signin")
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    setIsSaving(true)

    // Quy trình đổi pass với amazon-cognito-identity-js
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    // Cần authenticate lại để đổi pass (hoặc dùng session cũ nếu còn hạn)
    // Cách an toàn nhất là xác thực lại bằng mật khẩu cũ
    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: currentPassword,
    });

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: () => {
            // Sau khi xác thực pass cũ thành công -> Đổi sang pass mới
            cognitoUser.changePassword(currentPassword, newPassword, (err, result) => {
                setIsSaving(false)
                if (err) {
                    setPasswordError(err.message || JSON.stringify(err))
                    showToast("Failed to change password", "error")
                    return
                }
                showToast("Password changed successfully!", "success")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
            });
        },
        onFailure: (err) => {
            setIsSaving(false)
            setPasswordError("Current password is incorrect")
            showToast("Current password is incorrect", "error")
        }
    });
  }

  if (isLoading) {
    return <AppLayout><div className="flex h-[50vh] items-center justify-center">Loading settings...</div></AppLayout>
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6 relative">

        {notification.show && (
          <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 rounded-xl border p-4 shadow-xl transition-all duration-300 animate-in slide-in-from-right-10 bg-white ${
            notification.type === 'success' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'
          }`}>
             {notification.type === 'success' ? (
                <div className="rounded-full bg-green-100 p-1"><CheckCircle className="h-5 w-5 text-green-600" /></div>
             ) : (
                <div className="rounded-full bg-red-100 p-1"><AlertCircle className="h-5 w-5 text-red-600" /></div>
             )}
            <div>
                <p className={`font-semibold ${notification.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {notification.type === 'success' ? 'Success' : 'Error'}
                </p>
                <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(prev => ({...prev, show: false}))} className="ml-2 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account information and security</p>
          </div>
          <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} disabled className="bg-muted"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" value={username} disabled className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Updating..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}