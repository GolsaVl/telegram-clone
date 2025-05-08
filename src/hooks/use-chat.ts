import { useState, useEffect } from "react";
import { useSocket } from "../context/socket-context";
import { useAuth } from "./use-auth";
import { Chat, Message } from "../types/chat";
import { useChatStore } from "../store/chat-store";
import {
  hardcodedChats,
  hardcodedMessages,
  currentUserId,
  currentUsername,
} from "../data/hardcoded-data";

export const useChat = (chatId?: string) => {
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState<string | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const {
    setCurrentChat,
    setMessages,
    addMessage,
    currentChat: storedCurrentChat,
    messages: storedMessages,
  } = useChatStore();

  useEffect(() => {
    if (!chatId) {
      setCurrentChat(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const chat = hardcodedChats.find((c) => c.id === chatId);
    const messagesForChat = hardcodedMessages[chatId] || [];

    if (chat) {
      setCurrentChat(chat);
      setMessages(chatId, messagesForChat);
    } else {
      setError(`Chat with ID ${chatId} not found.`);
      setCurrentChat(null);
      setMessages(chatId, []);
    }
    setLoading(false);
  }, [chatId, setCurrentChat, setMessages]);

  useEffect(() => {
    if (!socket || !isConnected || !chatId) return;

    socket.emit("join_chat", chatId);

    const handleNewMessage = (message: Message) => {
      if (message.chatId === chatId) {
        addMessage(chatId, message);
      }
    };

    const handleTyping = (data: { userId: string; username: string }) => {
      if (data.userId !== user?.id) {
        setTyping(data.username);

        if (typingTimeout) {
          window.clearTimeout(typingTimeout);
        }

        const timeout = window.setTimeout(() => {
          setTyping(null);
        }, 3000);

        setTypingTimeout(Number(timeout));
      }
    };

    socket.on("new_message", handleNewMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.emit("leave_chat", chatId);

      if (typingTimeout) {
        window.clearTimeout(typingTimeout);
      }
    };
  }, [
    socket,
    isConnected,
    chatId,
    user?.id,
    typingTimeout,
    addMessage,
    setTyping,
    setTypingTimeout,
  ]);

  const sendMessage = (
    content: string,
    type: Message["type"] = "text",
    url?: string,
    fileName?: string,
    fileSize?: string | number,
    latitude?: number,
    longitude?: number,
  ) => {
    if (!chatId || !user) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      chatId,
      senderId: currentUserId,
      senderName: currentUsername,
      content,
      type,
      timestamp: new Date().toISOString(),
      status: "sent",
      ...(url && { url }),
      ...(fileName && { fileName }),
      ...(fileSize && { fileSize }),
      ...(latitude && { latitude }),
      ...(longitude && { longitude }),
    };

    addMessage(chatId, newMessage);

    if (storedCurrentChat) {
      const otherParticipants = storedCurrentChat.participants.filter(
        (p) => p.id !== currentUserId,
      );

      if (otherParticipants.length > 0) {
        const respondingParticipant = otherParticipants[0];
        const mockResponseContent = [
          "Got it!",
          "Thanks for the message.",
          "Interesting point.",
          "I'll look into that.",
          "Okay, sounds good.",
          "👍",
          "😄",
        ];
        const randomResponse =
          mockResponseContent[
            Math.floor(Math.random() * mockResponseContent.length)
          ];

        setTimeout(
          () => {
            const responseMessage: Message = {
              id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}-response`,
              chatId,
              senderId: respondingParticipant.id,
              senderName: respondingParticipant.username,
              content: randomResponse,
              type: "text",
              timestamp: new Date().toISOString(),
              status: "read",
            };
            addMessage(chatId, responseMessage);
          },
          Math.random() * 1500 + 500,
        );
      }
    }

    if (socket && isConnected) {
      socket.emit("send_message", {
        chatId: newMessage.chatId,
        senderId: newMessage.senderId,
        senderName: newMessage.senderName,
        content: newMessage.content,
        type: newMessage.type,
        status: newMessage.status,
        url: newMessage.url,
        fileName: newMessage.fileName,
        fileSize: newMessage.fileSize,
        latitude: newMessage.latitude,
        longitude: newMessage.longitude,
      });
    }
  };

  const sendTyping = () => {
    if (!socket || !isConnected || !chatId || !user) return;

    socket.emit("typing", { chatId, userId: user.id, username: user.username });
  };

  return {
    currentChat: storedCurrentChat as Chat | null,
    messages: chatId && storedMessages[chatId] ? storedMessages[chatId] : [],
    loading,
    error,
    typing,
    sendMessage,
    sendTyping,
  };
};
