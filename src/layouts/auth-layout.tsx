import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-[hsl(var(--primary-hsl)_/_0.1)] via-[var(--background)] to-[hsl(var(--secondary-hsl)_/_0.1)] dark:from-[hsl(var(--primary-hsl)_/_0.2)] dark:via-[var(--background)] dark:to-[hsl(var(--secondary-hsl)_/_0.2)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[var(--primary)] text-[var(--primary-foreground)] p-4 rounded-2xl shadow-lg"
          >
            <MessageCircle size={32} />
          </motion.div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Messengerr
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--muted-foreground)]">
          Connect with friends and the world around you
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="card-modern px-6 py-8 sm:px-10">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
