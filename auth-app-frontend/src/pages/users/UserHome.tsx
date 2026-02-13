import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

import { getCurrentUser } from "@/services/AuthService"
import useAuth from "@/auth/store"
import toast from "react-hot-toast"

export default function UserHome() {
  const user = useAuth((state) => state.user)
  const updateUser = useAuth((state) => state.updateUser);

  const getUserData = async () => {
    if (!user?.email) return;

    try {
      const response = await getCurrentUser(user.email);
      updateUser(response);
      toast.success("You are able to access secured APIs");

    } catch (error) {
      console.log(error);
      toast.error("Error getting user data")
    }
  }

  const testSecuredApi = async () => {
    try {
      const response = await getCurrentUser(user!.email);
      console.log("API Response:", response);
      toast.success("Secured API working");

    } catch (error: any) {
      console.log("Status:", error?.response?.status);
      toast.error(`Error ${error?.response?.status}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background px-6 py-16">

      <div className="max-w-6xl mx-auto space-y-12">

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                {user.name || "User"}
              </span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Here’s an overview of your account activity and status.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={getUserData}
              className="rounded-xl cursor-pointer px-6 shadow-md"
            >
              Refresh Profile
            </Button>

            <Button
              onClick={testSecuredApi}
              variant="secondary"
              className="rounded-xl cursor-pointer px-6"
            >
              Test Secured API
            </Button>
          </div>
        </motion.div>

        {/* DASHBOARD GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Account Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-3xl shadow-xl border border-border/40">
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>
                  Your authentication details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 text-sm">

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="capitalize font-medium">
                    {user.provider}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={`flex items-center gap-2 font-medium ${user.enabled
                        ? "text-green-600"
                        : "text-red-500"
                      }`}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {user.enabled ? "Active" : "Disabled"}
                  </span>
                </div>

                {user.createdAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Joined
                    </span>
                    <span>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {user.updatedAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Last Updated
                    </span>
                    <span>
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

              </CardContent>
            </Card>
          </motion.div>

          {/* Security Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-3xl shadow-xl border border-border/40">
              <CardHeader>
                <CardTitle>Security & Access</CardTitle>
                <CardDescription>
                  Your account security posture
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5 text-sm">

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Authentication Method
                  </span>
                  <span className="capitalize font-medium">
                    {user.provider}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Account Type
                  </span>
                  <span className="font-medium">
                    Standard User
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Security Level
                  </span>
                  <span className="text-green-600 font-medium">
                    High
                  </span>
                </div>

                <div className="border-t pt-4 text-muted-foreground text-xs">
                  All secured API endpoints are protected with JWT authentication.
                </div>

              </CardContent>
            </Card>
          </motion.div>

        </div>

      </div>
    </div>
  )
}