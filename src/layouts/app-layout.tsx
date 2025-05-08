import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { motion } from "framer-motion";
import MobileNavigationBar from "../components/layout/mobile-navigation-bar";

const AppLayout = () => {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chats/");

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`hidden md:flex md:w-72 md:flex-col lg:w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 ${
          isChatRoute ? "md:block" : "md:block"
        }`}
      >
        <Sidebar />
      </motion.div>
      {/* Main content area */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-1 flex-col overflow-hidden pb-16 md:pb-0"
      >
        <Outlet />
      </motion.div>
      <MobileNavigationBar /> {/* Added MobileNavigationBar */}
    </div>
  );
};

export default AppLayout;
