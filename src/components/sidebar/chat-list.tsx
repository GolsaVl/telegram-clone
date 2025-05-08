import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, Archive, Inbox } from "lucide-react";
import { motion } from "framer-motion"; 
import { useChatStore } from "../../store/chat-store";
import ChatListItem from "./chat-list-item";
import { cn } from "../../lib/utils";
import { useSocket } from "../../context/socket-context";
import { Chat } from "../../types/chat";
import { hardcodedChats } from "../../data/hardcoded-data";

const ChatList = () => {
  const { chatId } = useParams();
  const { socket } = useSocket();
  const { chats, setChats, toggleChatArchiveStatus } = useChatStore();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  

  
  useEffect(() => {
    setLoading(true);
    
    
    setChats(hardcodedChats);
    setLoading(false);
  }, [setChats]);

  
  useEffect(() => {
    if (!socket) return;

    const handleChatUpdate = (updatedChat: Chat) => {
      setChats(
        chats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)),
      );
    };

    const handleNewChat = (newChat: Chat) => {
      setChats([newChat, ...chats]);
    };

    socket.on("chat_updated", handleChatUpdate);
    socket.on("new_chat", handleNewChat);

    return () => {
      socket.off("chat_updated", handleChatUpdate);
      socket.off("new_chat", handleNewChat);
    };
  }, [socket, chats, setChats]);

  
  const { activeChats, archivedChats } = useMemo(() => {
    const filtered = chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (chat.lastMessage?.content &&
          chat.lastMessage.content
            .toLowerCase()
            .includes(searchQuery.toLowerCase())),
    );
    return {
      activeChats: filtered.filter((chat) => !chat.isArchived),
      archivedChats: filtered.filter((chat) => chat.isArchived),
    };
  }, [chats, searchQuery]);

  const chatsToDisplay = showArchived ? archivedChats : activeChats;

  
  const listVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05, 
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  const itemVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hidden: { opacity: 0, y: 20 },
  };

  
  

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="p-4 border-b dark:border-gray-800">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input py-2 pl-10 w-full"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Toggle Archived/Active Chats */}
      <div className="px-4 py-2 border-b dark:border-gray-800">
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
            showArchived
              ? "bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-primary-400"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
          )}
        >
          {showArchived ? <Inbox size={16} /> : <Archive size={16} />}
          <span>
            {showArchived
              ? `Inbox (${activeChats.length})`
              : `Archived (${archivedChats.length})`}
          </span>
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {loading ? (
          <div className="space-y-3 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-2 animate-pulse"
              >
                <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
            ))
          </div>
        ) : chatsToDisplay.length > 0 ? (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="overflow-hidden" 
          >
            {chatsToDisplay.map((chat) => (
              <motion.div key={chat.id} variants={itemVariants}>
                {/* Link is now inside ChatListItem to allow button clicks on the item itself */}
                <ChatListItem
                  chat={chat}
                  isActive={chat.id === chatId}
                  onToggleArchive={() => toggleChatArchiveStatus(chat.id)}
                  isArchivedView={showArchived}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? (
              <p>
                No {showArchived ? "archived" : "active"} chats match your
                search
              </p>
            ) : (
              <p>No {showArchived ? "archived" : "active"} conversations yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
