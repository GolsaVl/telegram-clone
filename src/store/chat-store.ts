import { create } from "zustand";
import { Chat, Message } from "../types/chat";

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  currentChat: Chat | null;
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  setMessages: (chatId: string, messages: Message[]) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateMessageStatus: (
    chatId: string,
    messageId: string,
    status: Message["status"],
  ) => void;
  setCurrentChat: (chat: Chat | null) => void;
  toggleChatArchiveStatus: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  messages: {},
  currentChat: null,
  setChats: (chats) => set({ chats }),
  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats],
    })),
  setMessages: (chatId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [chatId]: messages },
    })),
  addMessage: (chatId, message) =>
    set((state) => {
      const chatMessages = state.messages[chatId] || [];
      return {
        messages: {
          ...state.messages,
          [chatId]: [...chatMessages, message],
        },
      };
    }),
  updateMessageStatus: (chatId, messageId, status) =>
    set((state) => {
      const chatMessages = state.messages[chatId] || [];
      const updatedMessages = chatMessages.map((message) =>
        message.id === messageId ? { ...message, status } : message,
      );
      return {
        messages: {
          ...state.messages,
          [chatId]: updatedMessages,
        },
      };
    }),
  setCurrentChat: (chat) => set({ currentChat: chat }),
  toggleChatArchiveStatus: (chatId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, isArchived: !chat.isArchived } : chat,
      ),
    })),
}));
