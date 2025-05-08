import { useEffect, useState, memo, MouseEvent } from "react";
import { Check, CheckCheck, Archive, Inbox } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "../../lib/utils";
import { Chat } from "../../types/chat";
import { useAuth } from "../../hooks/use-auth";


dayjs.extend(relativeTime);

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onToggleArchive: () => void;
  isArchivedView: boolean;
}

const ChatListItem = memo(
  ({ chat, isActive, onToggleArchive, isArchivedView }: ChatListItemProps) => {
    const { user } = useAuth();
    const [recipient, setRecipient] = useState<Chat["participants"][0] | null>(
      null,
    );

    
    useEffect(() => {
      if (chat.type === "private" && user) {
        const otherUser = chat.participants.find((p) => p.id !== user.id);
        if (otherUser) {
          setRecipient(otherUser);
        }
      }
    }, [chat, user]);

    
    const isLastMessageFromMe =
      chat.lastMessage && user && chat.lastMessage.senderId === user.id;

    
    const formattedTime = chat.lastMessage?.timestamp
      ? dayjs(chat.lastMessage.timestamp).fromNow(true)
      : "";

    
    const displayName =
      chat.type === "private" && recipient ? recipient.username : chat.name;

    
    const recipientStatus = chat.type === "private" ? recipient?.status : null;

    const handleToggleArchive = (e: MouseEvent) => {
      e.preventDefault(); 
      e.stopPropagation(); 
      onToggleArchive();
    };

    const getStatusColor = (status: "online" | "offline" | "away" | null) => {
      if (!status) return "";
      switch (status) {
        case "online":
          return "bg-green-500";
        case "away":
          return "bg-yellow-500";
        case "offline":
          return "bg-gray-400";
        default:
          return "";
      }
    };

    return (
      <div
        className={cn(
          "group flex items-center justify-between p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800", 
          isActive &&
            "bg-primary-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-800",
        )}
      >
        <Link
          to={`/chats/${chat.id}`}
          className="flex items-center min-w-0 flex-1"
        >
          {/* Avatar */}
          <div className="relative mr-3">
            {chat.avatar ? (
              <img
                src={chat.avatar}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="avatar">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Status indicator */}
            {recipientStatus &&
              recipientStatus !== "offline" && ( 
                <span
                  className={cn(
                    "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white dark:border-gray-900",
                    getStatusColor(recipientStatus),
                  )}
                />
              )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-baseline">
              <h3
                className={cn(
                  "truncate text-sm font-medium",
                  isActive
                    ? "text-primary-700 dark:text-primary-400"
                    : "text-gray-900 dark:text-white",
                )}
              >
                {displayName}
              </h3>
              {chat.lastMessage && (
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {formattedTime}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              {/* Last message */}
              <p
                className={cn(
                  "truncate text-xs",
                  chat.unreadCount > 0 && !isLastMessageFromMe
                    ? "font-medium text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400",
                )}
              >
                {isLastMessageFromMe && (
                  <span className="mr-1 inline-flex text-gray-400 dark:text-gray-500">
                    {chat.lastMessage?.status === "read" ? (
                      <CheckCheck size={14} />
                    ) : (
                      <Check size={14} />
                    )}
                  </span>
                )}
                {chat.lastMessage?.content || "No messages yet"}
              </p>

              {/* Unread badge */}
              {chat.unreadCount > 0 && !isLastMessageFromMe && (
                <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                  {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        </Link>
        <button
          onClick={handleToggleArchive}
          title={isArchivedView ? "Unarchive Chat" : "Archive Chat"}
          className="ml-2 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          aria-label={isArchivedView ? "Unarchive Chat" : "Archive Chat"}
        >
          {isArchivedView ? <Inbox size={18} /> : <Archive size={18} />}
        </button>
      </div>
    );
  },
);

export default ChatListItem;
