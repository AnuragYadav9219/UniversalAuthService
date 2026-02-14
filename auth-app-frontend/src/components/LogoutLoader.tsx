import { Loader2, LogOut } from "lucide-react"
import { motion } from "framer-motion"

interface LogoutLoaderProps {
  open: boolean
}

const LogoutLoader = ({ open }: LogoutLoaderProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center
                    bg-black/40 backdrop-blur-md">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background border border-border shadow-2xl
                   rounded-2xl px-10 py-8 flex flex-col items-center gap-6"
      >
        {/* Icon + Spinner */}
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <LogOut className="absolute h-4 w-4 text-primary" />
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <p className="text-base font-semibold">
            Logging you out
          </p>
          <p className="text-sm text-muted-foreground">
            Securing your session...
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LogoutLoader
