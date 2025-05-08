import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Loading...
        </h2>
      </div>
    </motion.div>
  );
}
