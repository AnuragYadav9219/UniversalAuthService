import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAuth from "@/auth/store";
import { useEffect, useState } from "react";
import { refreshToken } from "@/services/AuthService";
import toast from "react-hot-toast";

function OAuthSuccess() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const changeLocalLoginData = useAuth(
        (state) => state.changeLocalLoginData
    );

    useEffect(() => {
        let mounted = true;

        async function handleOAuth() {
            try {
                const res = await refreshToken();

                if (!mounted) return;

                changeLocalLoginData(
                    res.accessToken,
                    res.user,
                    true,
                    false
                )

                toast.success("Welcome back 👋");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1800)

            } catch (error) {
                toast.error("Authentication failed");
                setTimeout(() => navigate("/login"), 1800);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        handleOAuth();
        return () => { mounted = false }
    }, [])

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

            {/* 🌌 Animated Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-black to-emerald-950 animate-pulse opacity-90" />

            {/* 💫 Floating Glow Orbs */}
            <motion.div
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full -top-32 -left-32"
            />
            <motion.div
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full -bottom-32 -right-32"
            />

            {/* 🧊 Glass Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 w-105 p-12 rounded-3xl
                bg-white/5 backdrop-blur-2xl border border-white/10
                shadow-[0_0_60px_rgba(16,185,129,0.15)] text-center"
            >

                {loading ? (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear"
                            }}
                            className="flex justify-center mb-8"
                        >
                            <Loader2 size={72} className="text-emerald-400" />
                        </motion.div>

                        <h2 className="text-2xl font-semibold text-white tracking-wide">
                            Finalizing Authentication
                        </h2>

                        <p className="text-gray-400 mt-3 text-sm">
                            Establishing secure session...
                        </p>
                    </>
                ) : (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }}
                            className="flex justify-center mb-8"
                        >
                            <CheckCircle2
                                size={80}
                                className="text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]"
                            />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold text-white tracking-tight"
                        >
                            Authentication Successful
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-400 mt-4 text-sm"
                        >
                            Redirecting to your dashboard...
                        </motion.p>
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default OAuthSuccess;