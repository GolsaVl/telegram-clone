import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="bg-primary-600 text-white p-3 rounded-xl"
          >
            <MessageCircle size={28} />
          </motion.div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Messengerr
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Connect with friends and the world around you
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow-md sm:rounded-lg sm:px-10 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
