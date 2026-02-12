import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type User from "@/models/User"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Calendar, Mail, User as UserIcon } from "lucide-react"

import useAuth from "@/auth/store"

export default function UserProfile() {

  const userAuth = useAuth((state) => state.user) 

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<User | null>(null)

  // Sync Zustand user into local editable state
  useEffect(() => {
    if (userAuth) {
      setFormData(userAuth)
    }
  }, [userAuth])

  // Loading state
  if (!userAuth || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-16">
      <div className="max-w-5xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold mb-10"
        >
          My{" "}
          <span className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Profile
          </span>
        </motion.h1>

        <Card className="rounded-2xl">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                View and manage your information
              </CardDescription>
            </div>

            <Button
              variant={editMode ? "secondary" : "default"}
              onClick={() => setEditMode(!editMode)}
              className="rounded-xl"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </Button>
          </CardHeader>

          <CardContent className="space-y-8">

            {/* Avatar */}
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.image} />
                <AvatarFallback>
                  {formData.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              {editMode && (
                <Input
                  name="image"
                  placeholder="Image URL"
                  value={formData.image || ""}
                  onChange={handleChange}
                />
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label>Full Name</Label>
              {editMode ? (
                <Input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserIcon className="h-4 w-4 text-indigo-500" />
                  {formData.name || "Not provided"}
                </div>
              )}
            </div>

            {/* Email (readonly always) */}
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-indigo-500" />
                {formData.email}
              </div>
            </div>

            {/* Provider */}
            <div className="space-y-2">
              <Label>Auth Provider</Label>
              <Badge variant="secondary">
                {formData.provider}
              </Badge>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center gap-2 text-green-600">
                <ShieldCheck className="h-4 w-4" />
                {formData.enabled ? "Active" : "Disabled"}
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              {formData.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  Joined: {new Date(formData.createdAt).toLocaleDateString()}
                </div>
              )}

              {formData.updatedAt && (
                <div>
                  Updated: {new Date(formData.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Save */}
            {editMode && (
              <div className="pt-4">
                <Button onClick={handleSave} className="rounded-xl">
                  Save Changes
                </Button>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
