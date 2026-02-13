import { Mail, Lock, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import React, { useState, type FormEvent } from "react"
import type LoginData from "@/models/LoginData"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { isValidEmail } from "@/utils/validators"
import { Alert, AlertTitle } from "@/components/ui/alert"
import getLoginErrorMessage from "@/utils/errors"
import { Spinner } from "@/components/ui/spinner"
import useAuth from "@/auth/store"
import OAuth2Buttons from "@/components/OAuth2Buttons"

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(event.target);

    // Validations
    const emailError = isValidEmail(loginData.email);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Login function : useAuth
      await login(loginData);

      // const result = await loginUser(loginData);
      // console.log(result);
      toast.success("Logged In Successfully");

      navigate("/dashboard")

    } catch (error: any) {
      console.error("Login Error:", error);

      setError(error);

      toast.error(
        "Error in logging!"
      );
    } finally {
      setLoading(false);
    }
  }

  const handleClick = () => {
    navigate("/signup")
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background Glow (Light + Dark optimized) */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_60%)]
          dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card
          className="
            rounded-2xl
            border border-border
            bg-card
            shadow-sm
            dark:bg-card/80
            dark:backdrop-blur
          "
        >
          {/* Header */}
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to continue to{" "}
              <span className="font-semibold text-foreground">AuthApp</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Error Section */}
            {error && (
              <div>
                <Alert variant={'destructive'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    {getLoginErrorMessage(error)}
                  </AlertTitle>
                </Alert>
              </div>
            )}

            {/* Email & Password */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                disabled={loading}
                className="
                w-full rounded-xl text-lg cursor-pointer
                bg-primary text-primary-foreground
                hover:opacity-90
              "
              >
                {loading ? (
                  <>
                    <Spinner />
                    Please wait...
                  </>
                ) : "Login"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative text-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              <span className="relative z-10 bg-background px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            {/* OAuth2 Buttons */}
            <div>
              <OAuth2Buttons />
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <button onClick={handleClick} className="font-semibold cursor-pointer hover:underline">
                Create one
              </button>

            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login;