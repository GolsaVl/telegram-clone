import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { motion } from "framer-motion";
import MobileNavigationBar from "../components/layout/mobile-navigation-bar";

const AppLayout = () => {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chats/");

  return (
    <div className="flex h-full overflow-hidden bg-[var(--background)] bg-gradient-to-br from-[var(--background)] via-[hsl(var(--primary-hsl)_/_0.03)] to-[var(--background)] dark:from-[var(--background)] dark:via-[hsl(var(--primary-hsl)_/_0.05)] dark:to-[var(--background)]">
      <motion.div
        className={`glass-effect hidden md:flex md:w-72 md:flex-col lg:w-80 ${
          isChatRoute ? "md:block" : "md:block"
        } border-r border-[var(--border-glass-light)] dark:border-[var(--border-glass-dark)]`}
      >
        <Sidebar />
      </motion.div>

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
      <MobileNavigationBar />
    </div>
  );
};

export default AppLayout;
