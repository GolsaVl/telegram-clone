import {
  ArrowLeft,
  MoreVertical,
  Wifi,
  Moon,
  XCircle,
  User as UserIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Chat } from "../../types/chat";
import { User } from "../../types/user";
import { cn } from "../../lib/utils";
import { useAuth } from "../../hooks/use-auth";

interface ChatHeaderProps {
  chat: Chat | null;
}

const getStatusDisplay = (status: User["status"] | undefined) => {
  switch (status) {
    case "online":
      return { text: "Online", color: "text-green-500", Icon: Wifi };
    case "away":
      return { text: "Away", color: "text-yellow-500", Icon: Moon };
    case "offline":
      return { text: "Offline", color: "text-gray-500", Icon: XCircle };
    default:
      return { text: "Unknown", color: "text-gray-400", Icon: UserIcon };
  }
};

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  if (!chat) {
    return (
      <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-4 bg-white dark:bg-gray-900">
        <p className="font-medium text-gray-900 dark:text-white">
          Loading chat...
        </p>
      </div>
    );
  }

  const recipient =
    chat.type === "private"
      ? chat.participants.find((p) => p.id !== currentUser?.id)
      : null;

  const displayName = recipient ? recipient.username : chat.name;
  const displayAvatar = recipient ? recipient.avatar : chat.avatar;
  const recipientStatus = recipient ? getStatusDisplay(recipient.status) : null;

  return (
    <div className="glass-effect flex h-16 items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/chats")}
          className="md:hidden p-1 -ml-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          aria-label="Back to chats"
        >
          <ArrowLeft size={20} />
        </button>
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt={displayName}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--muted)] text-sm font-medium uppercase text-[var(--muted-foreground)]">
            {displayName.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="text-sm font-medium text-[var(--foreground)]">
            {displayName}
          </h2>
          {recipientStatus && (
            <div
              className={cn(
                "text-xs flex items-center gap-1",
                recipientStatus.color,
              )}
            >
              <recipientStatus.Icon size={12} />
              <span>{recipientStatus.text}</span>
            </div>
          )}
          {chat.type === "group" && !recipientStatus && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {chat.participants.length} members
            </p>
          )}
        </div>
      </div>
      <button
        className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        aria-label="Chat options"
      >
        <MoreVertical size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
