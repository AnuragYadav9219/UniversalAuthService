import { ShieldCheck, Lock, Zap, Fingerprint, ArrowRight, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

export default function AuthLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* HERO / CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Secure Authentication
            <span className="block bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Re-imagined
            </span>
          </motion.h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern authentication platform with enterprise-grade security,
            seamless UX, and first-class developer experience.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-2xl px-8 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 text-lg"
            >
              View Docs
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Built for the Next-Gen Web
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
          Everything you need to secure users, scale globally, and ship faster.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="rounded-2xl backdrop-blur bg-card/70"
            >
              <CardContent className="p-6">
                <feature.icon className="h-10 w-10 text-indigo-500" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 sm:grid-cols-3 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="mt-2 text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24 grid gap-16 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Authentication without friction
          </h2>
          <p className="mt-4 text-muted-foreground">
            Plug-and-play auth with OAuth2, JWT, MFA, and passwordless login.
            Designed for modern React and API-driven systems.
          </p>
          <Button className="mt-8 rounded-xl">Explore Security</Button>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-indigo-500/20 to-cyan-500/20 blur-2xl" />
          <div className="relative rounded-3xl border bg-background p-6 text-sm">
            <pre className="whitespace-pre-wrap text-muted-foreground">
              {`POST /auth/login
{
  "email": "user@example.com",
  "password": "••••••••"
}

→ 200 OK
{
  "accessToken": "jwt-token",
  "expiresIn": 3600
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Loved by developers</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-6">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <p className="mt-4 text-sm text-muted-foreground">{t.quote}</p>
                  <p className="mt-4 font-semibold">{t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(34,197,94,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold">
            Ready to secure your application?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Start building with a production-ready authentication system today.
          </p>
          <Button size="lg" className="mt-8 rounded-2xl px-10 text-lg">
            Launch Now
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AuthX. Built for light & dark mode.
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Zero-Trust Security",
    desc: "JWT, OAuth2, RBAC, and industry-standard encryption by default.",
    icon: ShieldCheck,
  },
  {
    title: "Passwordless Auth",
    desc: "Magic links, OTPs, and biometric-ready authentication flows.",
    icon: Fingerprint,
  },
  {
    title: "High Performance",
    desc: "Edge-ready, stateless, and optimized for scale.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    desc: "Minimal data retention and compliance-ready design.",
    icon: Lock,
  },
]

const stats = [
  { value: "99.99%", label: "Uptime" },
  { value: "10M+", label: "Auth Requests / Day" },
  { value: "50k+", label: "Developers" },
]

const testimonials = [
  {
    name: "Senior Frontend Engineer",
    quote: "The cleanest authentication UX I’ve integrated. Fast, secure, and elegant.",
  },
  {
    name: "Startup Founder",
    quote: "Saved us weeks of work while meeting enterprise security standards.",
  },
  {
    name: "Full-Stack Developer",
    quote: "Perfect balance between developer experience and user security.",
  },
]
