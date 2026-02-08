import { ShieldCheck, Lock, Zap, Users } from "lucide-react"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"

const About = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background Glow */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_60%)]
          dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]
        "
      />

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          About{" "}
          <span className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            AuthApp
          </span>
        </motion.h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
          AuthApp is a modern authentication platform designed to deliver
          enterprise-grade security with a seamless user and developer
          experience.
        </p>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid gap-12 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe authentication should be secure, scalable, and simple.
            Our mission is to remove friction from identity management while
            protecting user data with modern security standards.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            AuthApp is built for developers who want speed, flexibility, and
            production-ready security out of the box.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl border border-border bg-card shadow-sm dark:bg-card/80 dark:backdrop-blur">
            <CardHeader>
              <CardTitle>Why AuthApp?</CardTitle>
              <CardDescription>
                Built for modern applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Secure by default</p>
              <p>• Developer-first architecture</p>
              <p>• Scales from startups to enterprises</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold text-center">What We Offer</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl border border-border bg-card shadow-sm dark:bg-card/80 dark:backdrop-blur">
                <CardContent className="p-6 space-y-4">
                  <feature.icon className="h-10 w-10 text-indigo-500" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to secure your application?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Start building with AuthApp and deliver a secure authentication
          experience to your users.
        </p>
        <Button
          size="lg"
          className="mt-8 rounded-xl bg-primary text-primary-foreground hover:opacity-90"
        >
          Get Started
        </Button>
      </section>
    </div>
  )
}

export default About

const features = [
  {
    title: "Enterprise Security",
    description:
      "OAuth2, JWT, MFA, and modern encryption standards built in.",
    icon: ShieldCheck,
  },
  {
    title: "Privacy First",
    description:
      "Minimal data storage with strict access controls.",
    icon: Lock,
  },
  {
    title: "High Performance",
    description:
      "Optimized for scale with fast and reliable authentication flows.",
    icon: Zap,
  },
  {
    title: "User-Centric",
    description:
      "Designed for both developers and end users.",
    icon: Users,
  },
]
