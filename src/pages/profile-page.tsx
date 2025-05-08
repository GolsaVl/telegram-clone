import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Camera,
  Save,
  Loader2,
  AtSign,
  Wifi,
  Moon,
  XCircle,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { cn } from "../lib/utils";

const getStatusDisplay = (
  status: "online" | "offline" | "away" | undefined,
) => {
  switch (status) {
    case "online":
      return {
        text: "Online",
        color: "text-green-500",
        icon: <Wifi size={16} />,
      };
    case "away":
      return {
        text: "Away",
        color: "text-yellow-500",
        icon: <Moon size={16} />,
      };
    case "offline":
      return {
        text: "Offline",
        color: "text-gray-500",
        icon: <XCircle size={16} />,
      };
    default:
      return {
        text: "Unknown",
        color: "text-gray-400",
        icon: <User size={16} />,
      };
  }
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const userStatusDisplay = getStatusDisplay(user?.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-2xl mx-auto p-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-primary-600 to-primary-400">
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-200 border-4 border-white dark:border-gray-800">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={40} />
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-1 bg-gray-100 dark:bg-gray-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                <Camera size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 pb-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.displayName || "Your Profile"}
              </h1>
              {user?.username && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <AtSign size={14} className="mr-1" />
                  {user.username}
                </p>
              )}
              <div
                className={cn(
                  "text-sm flex items-center gap-1.5 mt-1",
                  userStatusDisplay.color,
                )}
              >
                {userStatusDisplay.icon}
                <span>{userStatusDisplay.text}</span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}
