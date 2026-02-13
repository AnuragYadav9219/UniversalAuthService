import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"

function OAuthFailure() {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

            {/* 🌌 Animated Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-red-950 via-black to-indigo-950 opacity-90" />

            {/* 🔴 Floating Glow Orbs */}
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute w-96 h-96 bg-red-500/20 blur-3xl rounded-full -top-32 -right-32"
            />
            <motion.div
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full -bottom-32 -left-32"
            />

            {/* 🧊 Glass Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-110 p-12 rounded-3xl
                bg-white/5 backdrop-blur-2xl border border-white/10
                shadow-[0_0_60px_rgba(239,68,68,0.2)] text-center"
            >

                {/* ⚠️ Animated Warning Icon */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex justify-center mb-8"
                >
                    <AlertTriangle
                        size={80}
                        className="text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]"
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white tracking-tight"
                >
                    Authentication Failed
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 mt-4 text-sm leading-relaxed"
                >
                    We couldn't verify your identity through OAuth.
                    Please try again or return to login.
                </motion.p>

                {/* 🔘 Action Buttons */}
                <div className="flex justify-center gap-4 mt-8">

                    <button
                        onClick={() => navigate("/login")}
                        className="flex items-center cursor-pointer gap-2 px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center cursor-pointer gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <ArrowLeft size={16} />
                        Go Home
                    </button>

                </div>
            </motion.div>
        </div>
    )
}

export default OAuthFailure;