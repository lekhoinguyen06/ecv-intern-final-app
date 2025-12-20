"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Edit } from "lucide-react"

interface ProfileData {
  fullName: string
  age: string
  gender: string
  occupation: string
  education: string
  hobbies: string
  description: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    age: "",
    gender: "",
    occupation: "",
    education: "",
    hobbies: "",
    description: "",
  })
  const [mounted, setMounted] = useState(false)

  // Load profile from localStorage after component mounts
  useEffect(() => {
    setMounted(true)
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile(parsed)
      setFormData(parsed)
    }
  }, [])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(formData)
    setIsEditing(false)
    localStorage.setItem("userProfile", JSON.stringify(formData))
  }

  const handleUpdate = () => {
    console.log("handleUpdate called")
    console.log("Current profile:", profile)
    if (profile) {
      // Create new object to ensure state update
      const newFormData = {
        fullName: profile.fullName,
        age: profile.age,
        gender: profile.gender,
        occupation: profile.occupation,
        education: profile.education,
        hobbies: profile.hobbies,
        description: profile.description,
      }
      setFormData(newFormData)
      setIsEditing(prev => {
        console.log("Setting isEditing from", prev, "to true")
        return true
      })
    } else {
      console.log("Profile is null!")
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(formData)
    setIsEditing(false)
    localStorage.setItem("userProfile", JSON.stringify(formData))
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your profile?")) {
      setProfile(null)
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        occupation: "",
        education: "",
        hobbies: "",
        description: "",
      })
      setIsEditing(false)
      localStorage.removeItem("userProfile")
    }
  }

  const isFieldEditable = !profile || isEditing

  console.log("Render - profile:", profile)
  console.log("Render - isEditing:", isEditing)
  console.log("Render - isFieldEditable:", isFieldEditable)

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Personal Profile</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Personal Profile</h1>
          <p className="text-muted-foreground">
            {!profile ? "Create your personal profile" : isEditing ? "Edit your profile" : "View your profile"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{!profile ? "Create Profile" : isEditing ? "Edit Profile" : "Profile Information"}</CardTitle>
            <CardDescription>
              {!profile
                ? "Fill in your personal information to create your profile"
                : isEditing
                  ? "Update your profile information"
                  : "Your personal information"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={!profile ? handleCreate : handleSave} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter full name"
                    value={isFieldEditable ? formData.fullName : profile?.fullName || ""}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    disabled={!isFieldEditable}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={isFieldEditable ? formData.age : profile?.age || ""}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    disabled={!isFieldEditable}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={isFieldEditable ? formData.gender : profile?.gender || ""}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    disabled={!isFieldEditable}
                    required
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    type="text"
                    placeholder="Enter occupation"
                    value={isFieldEditable ? formData.occupation : profile?.occupation || ""}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    disabled={!isFieldEditable}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    type="text"
                    placeholder="Enter education background"
                    value={isFieldEditable ? formData.education : profile?.education || ""}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    disabled={!isFieldEditable}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hobbies">Hobbies</Label>
                  <Input
                    id="hobbies"
                    type="text"
                    placeholder="Enter hobbies (comma separated)"
                    value={isFieldEditable ? formData.hobbies : profile?.hobbies || ""}
                    onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
                    disabled={!isFieldEditable}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about yourself..."
                    value={isFieldEditable ? formData.description : profile?.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={!isFieldEditable}
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {!profile ? (
                  <Button type="submit" className="flex-1">
                    Create Profile
                  </Button>
                ) : isEditing ? (
                  <Button type="submit" className="flex-1">
                    Save
                  </Button>
                ) : (
                  <>
                    <Button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleUpdate()
                      }} 
                      className="flex-1"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Update
                    </Button>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete()
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}