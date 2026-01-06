"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Edit, Loader2, CheckCircle, AlertCircle, X, Save } from "lucide-react"

interface ProfileFormData {
  fullName: string
  age: string
  gender: string
  occupation: string
  education: string
  hobbies: string
  description: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export default function ProfilePage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [hasExistingProfile, setHasExistingProfile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "", age: "", gender: "", occupation: "", education: "", hobbies: "", description: "",
  })

  const [originalData, setOriginalData] = useState<ProfileFormData>({
    fullName: "", age: "", gender: "", occupation: "", education: "", hobbies: "", description: "",
  })

  const [notification, setNotification] = useState({ show: false, message: "", type: "success" })

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 3000)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const attributes = await fetchUserAttributes()
        const email = attributes.email
        setUserEmail(email || "")

        const session = await fetchAuthSession()
        const token = session.tokens?.accessToken?.toString()

        if (!token) throw new Error("No session token")

        const params = new URLSearchParams({ email: email || "" })
        const res = await fetch(`${API_URL}/api/user?${params.toString()}`, {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (res.status === 404) {
          setHasExistingProfile(false)
          setIsEditing(true)
        } else if (res.ok) {
          const json = await res.json()
          const data = json.data || json 

          if (!data.name) {
             setHasExistingProfile(false)
             setIsEditing(true)
          } else {
             setHasExistingProfile(true)
             setIsEditing(false) 
          }

          const mappedData = {
            fullName: data.name || "",
            age: data.age ? String(data.age) : "",
            gender: data.sex ? (data.sex === "Male" ? "male" : data.sex === "Female" ? "female" : "other") : "",
            occupation: data.jobTitle || "",
            education: Array.isArray(data.studies) ? data.studies.join(", ") : "",
            hobbies: Array.isArray(data.interests) ? data.interests.join(", ") : "",
            description: data.description || "",
          }

          setFormData(mappedData)
          setOriginalData(mappedData) 
        }
      } catch (error: any) {
        console.error("Load failed:", error)
        if (String(error).includes("User not signed in")) {
          router.push("/signin")
        }
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const session = await fetchAuthSession()
      const token = session.tokens?.accessToken?.toString()
      if (!token) throw new Error("No session")

      const payload = {
        email: userEmail,
        name: formData.fullName,
        age: Number(formData.age),
        sex: formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Other",
        description: formData.description,
        jobTitle: formData.occupation,
        studies: formData.education.split(",").map(s => s.trim()).filter(s => s !== ""),
        interests: formData.hobbies.split(",").map(h => h.trim()).filter(h => h !== ""),
        notes: "Interested in leadership roles"
      }

      const method = hasExistingProfile ? "PUT" : "POST"

      const res = await fetch(`${API_URL}/api/user`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to save")

      setHasExistingProfile(true)
      setIsEditing(false)
      
      setOriginalData(formData) 
      
      showToast("Profile saved successfully!", "success")

    } catch (error) {
      console.error(error)
      showToast("Error saving profile. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData(originalData)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your profile?")) return
    setLoading(true)

    try {
      const session = await fetchAuthSession()
      const token = session.tokens?.accessToken?.toString()
      
      const res = await fetch(`${API_URL}/api/user?email=${userEmail}`, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
        }
      })

      if (res.ok) {
        setHasExistingProfile(false)
        setIsEditing(true)
        const emptyData = { fullName: "", age: "", gender: "", occupation: "", education: "", hobbies: "", description: "" }
        setFormData(emptyData)
        setOriginalData(emptyData) 
        showToast("Profile deleted successfully.", "success")
      } else {
        showToast("Failed to delete profile.", "error")
      }
    } catch (error) {
      console.error(error)
      showToast("Error deleting profile.", "error")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  const isFormEnabled = isEditing || !hasExistingProfile

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl relative">
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

        <div className="mb-6"><h1 className="text-3xl font-bold">Personal Profile</h1></div>
        <Card>
          <CardHeader><CardTitle>Profile Info</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">

              <div className="grid gap-6 md:grid-cols-2">
                <div><Label>Name</Label><Input value={formData.fullName} onChange={e=>setFormData({...formData, fullName:e.target.value})} disabled={!isFormEnabled} required/></div>
                <div><Label>Age</Label><Input type="number" value={formData.age} onChange={e=>setFormData({...formData, age:e.target.value})} disabled={!isFormEnabled} required/></div>
                <div>
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={v=>setFormData({...formData, gender:v})} disabled={!isFormEnabled}>
                    <SelectTrigger><SelectValue placeholder="Gender"/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Occupation</Label><Input value={formData.occupation} onChange={e=>setFormData({...formData, occupation:e.target.value})} disabled={!isFormEnabled}/></div>
                <div className="md:col-span-2"><Label>Education</Label><Input value={formData.education} onChange={e=>setFormData({...formData, education:e.target.value})} disabled={!isFormEnabled}/></div>
                <div className="md:col-span-2"><Label>Interests</Label><Input value={formData.hobbies} onChange={e=>setFormData({...formData, hobbies:e.target.value})} disabled={!isFormEnabled}/></div>
                <div className="md:col-span-2"><Label>Description</Label><Textarea value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})} disabled={!isFormEnabled}/></div>
              </div>
              
              <div className="flex gap-3">
                {isFormEnabled ? (
                  <>
                    <Button type="submit" className="flex-1">
                      <Save className="mr-2 h-4 w-4"/> Save
                    </Button>
                    
                    {hasExistingProfile && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        // SỬ DỤNG HÀM HANDLE CANCEL MỚI
                        onClick={(e) => {
                            e.preventDefault();
                            handleCancel(); 
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(true); 
                      }} 
                      className="flex-1"
                    >
                      <Edit className="mr-2 h-4 w-4"/> Edit
                    </Button>

                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4"/> Delete
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