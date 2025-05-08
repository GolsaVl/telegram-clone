import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, User, Settings, LogOut, Search, X } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { useChatStore } from "../../store/chat-store";
import ChatList from "./chat-list";
import { hardcodedUsers, currentUserId } from "../../data/hardcoded-data";
import { Chat as ChatType } from "../../types/chat";
import { User as UserType } from "../../types/user";
import ThemeSwitcher from "../theme-switcher";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { chats, addChat, setCurrentChat } = useChatStore();

  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [isUserSearchFocused, setIsUserSearchFocused] = useState(false);

  const userSearchResults = useMemo(() => {
    if (!userSearchQuery.trim()) {
      return [];
    }
    return Object.values(hardcodedUsers).filter(
      (u) =>
        u.id !== currentUserId &&
        (u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
          u.displayName.toLowerCase().includes(userSearchQuery.toLowerCase())),
    );
  }, [userSearchQuery]);

  const handleStartChatWithUser = (
    targetUser: Omit<UserType, "email" | "lastSeen" | "bio" | "createdAt">,
  ) => {
    if (!user) return;

    const existingChat = chats.find(
      (c) =>
        c.type === "private" &&
        c.participants.length === 2 &&
        c.participants.some((p) => p.id === targetUser.id) &&
        c.participants.some((p) => p.id === user.id),
    );

    if (existingChat) {
      setCurrentChat(existingChat);
      navigate(`/chats/${existingChat.id}`);
    } else {
      const newChat: ChatType = {
        id: `chat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: targetUser.displayName,
        type: "private",
        avatar: targetUser.avatar,
        participants: [
          {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            status: user.status,
          },
          {
            id: targetUser.id,
            username: targetUser.username,
            avatar: targetUser.avatar,
            status: targetUser.status,
          },
        ],
        unreadCount: 0,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addChat(newChat);
      setCurrentChat(newChat);
      navigate(`/chats/${newChat.id}`);
    }
    setUserSearchQuery("");
    setIsUserSearchFocused(false);
  };

  const navItems = [
    { icon: MessageCircle, label: "Chats", path: "/chats" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const getIsActive = (path: string) => {
    if (path === "/chats") {
      return (
        location.pathname === "/chats" ||
        location.pathname.startsWith("/chats/")
      );
    }
    return location.pathname === path;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <div className="bg-primary-600 text-white p-2 rounded-lg">
            <MessageCircle size={20} />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Messengerr
          </h1>
        </motion.div>
        <ThemeSwitcher />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden relative">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input py-2 pl-10 w-full"
              placeholder="Search users..."
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              onFocus={() => setIsUserSearchFocused(true)}
            />
            {userSearchQuery && (
              <button
                onClick={() => {
                  setUserSearchQuery("");
                  setIsUserSearchFocused(false);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {isUserSearchFocused && userSearchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-0 left-0 right-0 z-10 mt-[73px]  max-h-[calc(100%-73px)] overflow-y-auto bg-white dark:bg-gray-900 shadow-lg rounded-b-md border border-gray-200 dark:border-gray-700"
          >
            {userSearchResults.length > 0 ? (
              userSearchResults.map((foundUser) => (
                <button
                  key={foundUser.id}
                  onClick={() => handleStartChatWithUser(foundUser)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {foundUser.avatar ? (
                    <img
                      src={foundUser.avatar}
                      alt={foundUser.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="avatar h-8 w-8 text-xs">
                      {foundUser.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {foundUser.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      @{foundUser.username}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                No users found.
              </p>
            )}
            <button
              onClick={() => {
                setUserSearchQuery("");
                setIsUserSearchFocused(false);
              }}
              className="sticky bottom-0 w-full p-2 text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-t dark:border-gray-700"
            >
              Close Search
            </button>
          </motion.div>
        )}

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {!isUserSearchFocused && (
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-4 pt-4 pb-2">
              Recent Chats
            </h2>
          )}
          <ChatList />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  getIsActive(item.path)
                    ? "bg-primary-50 text-primary-700 dark:bg-gray-800 dark:text-primary-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                )}
              >
                <item.icon size={18} className="mr-3 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <LogOut size={18} className="mr-3 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
