import { ShieldCheck, Lock, KeyRound } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"

export default function Security() {
    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* HERO */}
            <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Secure by Design
                </h1>
                <p className="mt-6 text-muted-foreground">
                    AuthX uses modern authentication standards like JWT and
                    role-based authorization to protect your application.
                </p>
            </section>

            {/* CORE SECURITY FEATURES */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid gap-8 md:grid-cols-3">

                    <Card className="rounded-2xl border bg-card/60">
                        <CardContent className="p-8">
                            <ShieldCheck className="h-10 w-10 text-indigo-500" />
                            <h3 className="mt-6 text-xl font-semibold">
                                JWT Authentication
                            </h3>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Stateless authentication using signed JSON Web Tokens
                                for secure API communication.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border bg-card/60">
                        <CardContent className="p-8">
                            <KeyRound className="h-10 w-10 text-indigo-500" />
                            <h3 className="mt-6 text-xl font-semibold">
                                Role-Based Access Control
                            </h3>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Fine-grained authorization to control access
                                based on user roles and permissions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border bg-card/60">
                        <CardContent className="p-8">
                            <Lock className="h-10 w-10 text-indigo-500" />
                            <h3 className="mt-6 text-xl font-semibold">
                                Secure Password Storage
                            </h3>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Passwords are securely hashed before storage
                                to prevent credential exposure.
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </section>

            {/* ARCHITECTURE SECTION */}
            <section className="border-t py-16 px-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold">
                    How Authentication Works
                </h2>

                <div className="mt-6 bg-muted p-6 rounded-2xl text-sm">
                    <pre className="whitespace-pre-wrap text-muted-foreground">
                        {`1. User logs in with email & password
2. Server validates credentials
3. JWT is generated and returned
4. Client sends JWT in Authorization header
5. Server validates token on each request`}
                    </pre>
                </div>

                <Button className="mt-8 rounded-xl">
                    View Implementation Guide
                </Button>
            </section>

        </div>
    )
}
