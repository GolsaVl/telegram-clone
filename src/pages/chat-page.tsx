import { useParams } from "react-router-dom";
import { memo, useEffect, useRef } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { useChat } from "../hooks/use-chat";
import { currentUserId } from "../data/hardcoded-data";
import { Message } from "../types/chat";
import { Paperclip, ImageIcon, FileText, Film, Mic, MapPin } from "lucide-react"; 
import ChatHeader from "../components/chat/chat-header"; 


const MessageContent = memo(({ message }: { message: Message }) => {
  switch (message.type) {
    case "image":
      return (
        <img
          src={message.url || "https://via.placeholder.com/150"} 
          alt={message.content || "Image"}
          className="rounded-lg max-w-xs max-h-64 object-cover"
          onLoad={(e) => (e.target as HTMLImageElement).style.opacity = '1'}
          style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
        />
      );
    case "video":
      return (
        <div className="max-w-xs">
          <video controls src={message.url} className="rounded-lg w-full">
            Your browser does not support the video tag.
          </video>
          {message.content && <p className="text-sm mt-1">{message.content}</p>}
        </div>
      );
    case "audio":
       return (
        <div className="my-1">
          <audio controls src={message.url} className="w-full max-w-xs">
            Your browser does not support the audio element.
          </audio>
          {message.content && <p className="text-sm mt-1">{message.content}</p>}
        </div>
      );
    case "file":
      return (
        <a
          href={message.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <FileText size={24} className="text-gray-600 dark:text-gray-400" />
          <div>
            <p className="font-medium text-sm">{message.fileName || message.content || "Attachment"}</p>
            {message.fileSize && <p className="text-xs text-gray-500 dark:text-gray-400">{message.fileSize}</p>}
          </div>
        </a>
      );
    case "location":
      return (
        <a
          href={`https://www.openstreetmap.org/?mlat=${message.latitude}&mlon=${message.longitude}#map=16/${message.latitude}/${message.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-start gap-1 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={18} className="text-red-500" />
            <span className="font-medium text-sm">
              {message.content || "Shared Location"}
            </span>
          </div>
          <img
            src={`https://static-maps.yandex.ru/1.x/?ll=${message.longitude},${message.latitude}&z=16&l=map&size=280,150&pt=${message.longitude},${message.latitude},pm2rdl`} 
            alt="Map preview"
            className="rounded max-w-[280px] h-[150px] object-cover border dark:border-gray-600"
            onError={(e) => (e.currentTarget.style.display = 'none')} 
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 hover:underline">
            View on OpenStreetMap
          </span>
        </a>
      );
    case "text":
    default:
      return <>{message.content}</>;
  }
});

export default function ChatPage() {
  const { chatId } = useParams();
  const { currentChat, messages, sendMessage } = useChat(chatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat) {
    return (
      <div className="flex items-center justify-center h-full">
        Chat not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950">
      <ChatHeader chat={currentChat} />
      <div className="flex-1 overflow-y-auto p-4"> {/* Removed space-y-4 for AnimatePresence direct children */}
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: index * 0.02 
              }}
              className={`flex mb-4 ${ 
              message.senderId === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 shadow-md ${ 
                message.senderId === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              } ${message.type !== 'text' ? (message.senderId === currentUserId ? '!bg-blue-500' : '!bg-gray-200 dark:!bg-gray-700') : ''}`}
            >
              <MessageContent message={message} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} /> {/* For auto-scrolling */}
    </div>

    <div className="border-t p-4 bg-white dark:bg-gray-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const inputElement = form.elements.namedItem("message") as HTMLInputElement;
            const messageText = inputElement.value.trim();

            if (messageText) {
              sendMessage(messageText, "text");
              inputElement.value = "";
            }
          }}
          className="flex items-center gap-2"
        >
          {/* Media Buttons - for demonstration */}
          <button
            type="button"
            onClick={() => sendMessage("Look at this cool image!", "image", "https://picsum.photos/seed/風景/300/200", "landscape.jpg", "150 KB")}
            className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            title="Send Image"
          >
            <ImageIcon size={20} />
          </button>
          <button
            type="button"
            onClick={() => sendMessage("Check out this document.", "file", "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "report.pdf", "2 MB")}
            className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            title="Send File"
          >
            <Paperclip size={20} />
          </button>
           <button
            type="button"
            onClick={() => sendMessage("Important video.", "video", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "bunny.mp4", "10 MB")}
            className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            title="Send Video"
          >
            <Film size={20} />
          </button>
           <button
            type="button"
            onClick={() => sendMessage("Listen to this.", "audio", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "song.mp3", "4 MB")}
            className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            title="Send Audio"
          >
            <Mic size={20} />
          </button>
          <button
            type="button"
            onClick={() => sendMessage("Our meeting spot", "location", undefined, undefined, undefined, 34.0522, -118.2437)} 
            className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            title="Send Location"
          >
            <MapPin size={20} />
          </button>

          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="flex-1 rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
