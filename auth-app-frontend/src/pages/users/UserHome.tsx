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

function UserHome() {
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >
          <h1 className="text-3xl font-bold">
            Welcome,{" "}
            <span className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              {user.name || "User"}
            </span>
          </h1>

          <div className="flex gap-3">
            <Button onClick={getUserData} className="rounded-xl">
              Refresh Profile
            </Button>

            <Button
              onClick={testSecuredApi}
              variant="secondary"
              className="rounded-xl"
            >
              Test Secured API
            </Button>
          </div>
        </motion.div>

        {/* Account Card */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>
              Basic account information
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-muted-foreground">

            <div className="flex justify-between">
              <span>Email</span>
              <span>{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span>Provider</span>
              <span>{user.provider}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Status</span>
              <span className="flex items-center gap-2 text-green-600">
                <ShieldCheck className="h-4 w-4" />
                {user.enabled ? "Active" : "Disabled"}
              </span>
            </div>

            {user.createdAt && (
              <div className="flex justify-between">
                <span>Joined</span>
                <span>
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}

            {user.updatedAt && (
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </span>
              </div>
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default UserHome
