import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type User from "@/models/User"

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Calendar, Mail, User as UserIcon } from "lucide-react"

import useAuth from "@/auth/store"

export default function UserProfile() {

  const userAuth = useAuth((state) => state.user);

  const [formData, setFormData] = useState<User | null>(null);

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

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background px-6 py-16">

      <div className="max-w-6xl mx-auto space-y-12">

        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Account{" "}
            <span className="bg-linear-to-r from-indigo-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Center
            </span>
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor your account details and security status
          </p>
        </motion.div>

        {/* PROFILE SUMMARY CARD */}
        <Card className="rounded-3xl shadow-xl border border-border/40 overflow-hidden">

          <div className="bg-linear-to-r from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 p-10 border-b">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-500 to-cyan-500 blur-md opacity-40" />
                <Avatar className="h-28 w-28 relative ring-4 ring-background shadow-lg">
                  <AvatarImage src={formData.image} />
                  <AvatarFallback className="text-xl font-semibold">
                    {formData.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-3 text-center md:text-left">
                <h2 className="text-2xl font-semibold">
                  {formData.name || "Unnamed User"}
                </h2>

                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  {formData.email}
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                  <Badge variant="secondary" className="px-4 py-1 rounded-full">
                    {formData.provider}
                  </Badge>

                  <Badge
                    className={`px-4 py-1 rounded-full ${formData.enabled
                        ? "bg-green-500/10 text-green-600 border border-green-500/30"
                        : "bg-red-500/10 text-red-500 border border-red-500/30"
                      }`}
                  >
                    {formData.enabled ? "Account Active" : "Account Disabled"}
                  </Badge>
                </div>
              </div>

            </div>
          </div>

          <CardContent className="p-10 space-y-10">

            {/* GRID SECTION */}
            <div className="grid md:grid-cols-2 gap-10">

              {/* Account Metadata */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Account Information</h3>

                {formData.createdAt && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10">
                      <Calendar className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Member Since
                      </p>
                      <p className="font-medium">
                        {new Date(formData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {formData.updatedAt && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Last Updated
                      </p>
                      <p className="font-medium">
                        {new Date(formData.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Security Overview */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Security Overview</h3>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Account Status
                    </p>
                    <p className="font-medium">
                      {formData.enabled ? "Verified & Secure" : "Access Restricted"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10">
                    <UserIcon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Authentication Provider
                    </p>
                    <p className="font-medium capitalize">
                      {formData.provider}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* SESSION INFO */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Session Information</h3>

              <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">

                <div>
                  <p className="uppercase tracking-wide text-xs">Login Method</p>
                  <p className="font-medium mt-1 capitalize">
                    {formData.provider}
                  </p>
                </div>

                <div>
                  <p className="uppercase tracking-wide text-xs">Account Type</p>
                  <p className="font-medium mt-1">
                    Standard User
                  </p>
                </div>

                <div>
                  <p className="uppercase tracking-wide text-xs">Security Level</p>
                  <p className="font-medium mt-1 text-green-600">
                    High
                  </p>
                </div>

              </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}