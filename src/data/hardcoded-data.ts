import { Chat, Message } from "../types/chat";
import { User } from "../types/user";

export const currentUserId = "usr_abcdef1234567890";
export const currentUsername = "demouser";

export const hardcodedUsers: Record<
  string,
  Omit<User, "email" | "lastSeen" | "bio" | "createdAt">
> = {
  [currentUserId]: {
    id: currentUserId,
    username: currentUsername,
    displayName: "Demo User",
    avatar: "https://i.pravatar.cc/150?u=demouser",
    status: "online",
  },
  "user-alice": {
    id: "user-alice",
    username: "alicew",
    displayName: "Alice Wonderland",
    avatar: "https://i.pravatar.cc/150?u=alice",
    status: "online",
  },
  "user-bob": {
    id: "user-bob",
    username: "bobthebuilder",
    displayName: "Bob Builder",
    avatar: "https://i.pravatar.cc/150?u=bob",
    status: "offline",
  },
  "user-charlie": {
    id: "user-charlie",
    username: "charliec",
    displayName: "Charlie Chaplin",
    avatar: "https://i.pravatar.cc/150?u=charlie",
    status: "away",
  },
};

export const hardcodedChats: Chat[] = [
  {
    id: "chat-1-private",
    name: "Alice Wonderland",
    type: "private",
    avatar: hardcodedUsers["user-alice"].avatar,
    participants: [
      { ...hardcodedUsers[currentUserId] },
      { ...hardcodedUsers["user-alice"] },
    ],
    lastMessage: {
      content: "Oh cool! Let me know if you need help testing.",
      senderId: "user-alice",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      status: "read",
    },
    unreadCount: 1,
    isArchived: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "chat-2-group",
    name: "Project Team",
    type: "group",
    avatar: "https://i.pravatar.cc/150?u=group-project-team",
    participants: [
      { ...hardcodedUsers[currentUserId] },
      { ...hardcodedUsers["user-bob"] },
      { ...hardcodedUsers["user-charlie"] },
    ],
    lastMessage: {
      content: "Great, see you then.",
      senderId: "user-bob",
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      status: "delivered",
    },
    unreadCount: 0,
    isArchived: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: "chat-3-private-no-last-message",
    name: "Bob Builder",
    type: "private",
    avatar: hardcodedUsers["user-bob"].avatar,
    participants: [
      { ...hardcodedUsers[currentUserId] },
      { ...hardcodedUsers["user-bob"] },
    ],
    unreadCount: 0,
    isArchived: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const hardcodedMessages: Record<string, Message[]> = {
  "chat-1-private": [
    {
      id: "msg-1-1",
      chatId: "chat-1-private",
      senderId: "user-alice",
      senderName: hardcodedUsers["user-alice"].displayName,
      content: "Hey there! How's it going?",
      type: "text",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      status: "read",
    },
    {
      id: "msg-1-2",
      chatId: "chat-1-private",
      senderId: currentUserId,
      senderName: hardcodedUsers[currentUserId].displayName,
      content: "Pretty good! Just working on this chat app.",
      type: "text",
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      status: "read",
    },
    {
      id: "msg-1-3",
      chatId: "chat-1-private",
      senderId: "user-alice",
      senderName: hardcodedUsers["user-alice"].displayName,
      content: "Oh cool! Let me know if you need help testing.",
      type: "text",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      status: "read",
    },
  ],
  "chat-2-group": [
    {
      id: "msg-2-1",
      chatId: "chat-2-group",
      senderId: "user-bob",
      senderName: hardcodedUsers["user-bob"].displayName,
      content: "Meeting at 3 PM today?",
      type: "text",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      status: "read",
    },
    {
      id: "msg-2-2",
      chatId: "chat-2-group",
      senderId: "user-charlie",
      senderName: hardcodedUsers["user-charlie"].displayName,
      content: "Works for me!",
      type: "text",
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      status: "read",
    },
    {
      id: "msg-2-3",
      chatId: "chat-2-group",
      senderId: currentUserId,
      senderName: hardcodedUsers[currentUserId].displayName,
      content: "I can make it.",
      type: "text",
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      status: "delivered",
    },
    {
      id: "msg-2-4",
      chatId: "chat-2-group",
      senderId: "user-bob",
      senderName: hardcodedUsers["user-bob"].displayName,
      content: "Great, see you then.",
      type: "text",
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      status: "delivered",
    },
  ],
  "chat-3-private-no-last-message": [],
};
