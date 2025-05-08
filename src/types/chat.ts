export interface Chat {
  id: string;
  name: string;
  type: "private" | "group" | "channel";
  avatar?: string;
  participants: {
    id: string;
    username: string;
    avatar?: string;
    status: "online" | "offline" | "away";
  }[];
  lastMessage?: {
    content: string;
    senderId: string;
    timestamp: string;
    status: "sent" | "delivered" | "read";
  };
  unreadCount: number;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: "text" | "image" | "video" | "audio" | "file" | "location";
  url?: string;
  fileName?: string;
  fileSize?: string | number;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
  status: "sent" | "delivered" | "read";
  replyTo?: string;
  reactions?: {
    userId: string;
    emoji: string;
  }[];
  deletedAt?: string;
  editedAt?: string;
}
