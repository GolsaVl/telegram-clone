import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Moon, Sun, Globe, Shield, LogOut } from "lucide-react";
import { useTheme } from "../context/theme-context";
import { useAuth } from "../hooks/use-auth";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    updates: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-2xl mx-auto p-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Settings
          </h1>

          <div className="space-y-6">
            {/* Appearance */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Appearance
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      Theme
                    </span>
                  </div>
                  <select
                    value={theme}
                    onChange={(e) =>
                      setTheme(e.target.value as "light" | "dark" | "system")
                    }
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      New Messages
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.messages}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          messages: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Mentions
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.mentions}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          mentions: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      App Updates
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.updates}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          updates: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Privacy & Security */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Privacy & Security
              </h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Online Status
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Visible</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Two-Factor Authentication
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Off</span>
                </button>
              </div>
            </section>

            {/* Account Actions */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account
              </h2>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
