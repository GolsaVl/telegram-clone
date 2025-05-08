import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function ChatsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4"
    >
      <div className="text-center">
        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-2xl font-bold mb-2">Welcome to Chats</h1>
        <p className="text-muted-foreground">
          Select a chat from the sidebar or start a new conversation
        </p>
      </div>
    </motion.div>
  );
}