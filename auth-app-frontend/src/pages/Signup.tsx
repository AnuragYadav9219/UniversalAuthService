import { Mail, Lock, User } from "lucide-react"
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
import React, { useState } from "react"
import toast from "react-hot-toast"
import type RegisterData from "@/models/RegisterData"
import { registerUser } from "@/services/AuthService";
import { useNavigate } from "react-router"
import { isValidEmail, isValidPassword } from "@/utils/validators"
import OAuth2Buttons from "@/components/OAuth2Buttons"

const Signup = () => {
  const [data, setData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    image: '',
    enable: true
  });

  // text, input, email, password, number, textarea 
  // Handling form change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value
    }))
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle form submit
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data);

    // Validations
    const emailError = isValidEmail(data.email);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    if (!data.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const passwordError = isValidPassword(data.password);

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // Form submit for registrations
    try {
      setLoading(true);
      await registerUser(data);
      toast.success("User Registered Successfully");

      setData({
        name: '',
        email: '',
        password: '',
        image: '',
        enable: true
      });

      navigate("/login");

    } catch (error: any) {
      console.log("Full Error : ", error.response?.data);

      toast.error(
        error.response?.data?.message || error.response?.data?.error || "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  }

  const handleClick = () => {
    navigate('/login');
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background Glow */}
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
          className="rounded-2xl border border-border bg-card shadow-sm dark:bg-card/80 dark:backdrop-blur"
        >
          {/* Header */}
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              Create your account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Get started with{" "}
              <span className="font-semibold text-foreground">AuthApp</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Form Fields */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email */}
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
                    value={data.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
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
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                disabled={loading}
                className="cursor-pointer w-full rounded-xl text-lg bg-primary text-primary-foreground hover:opacity-90"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative text-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              <span className="relative z-10 bg-background px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <OAuth2Buttons />
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={handleClick} className="font-semibold cursor-pointer hover:underline">
                Login
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Signup;