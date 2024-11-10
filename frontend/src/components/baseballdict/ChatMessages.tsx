import React, { useRef, useEffect } from "react";

interface Message {
  userId: number;
  message: string;
  roomId: string | null;
  timestamp: number;
}

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: number;
  userImage?: string;
  aiImage?: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  currentUserId,
  userImage,
  aiImage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // messages가 변경될 때마다 스크롤을 제일 아래로 이동
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => {
        const isUser = msg.userId === currentUserId;
        return (
          <div
            key={index}
            className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: isUser
                  ? userImage
                    ? `url(${userImage})`
                    : "none"
                  : aiImage
                    ? `url(${aiImage})`
                    : "none",
              }}
            />
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl break-words ${
                isUser ? "bg-green-900 text-white" : "bg-gray-100 text-black"
              }`}
            >
              {msg.message}
            </div>
            <div className={`text-xs text-gray-300 self-center ${isUser ? "mr-1" : "ml-1"}`}>
              {formatTimestamp(msg.timestamp)}
            </div>
          </div>
        );
      })}
      {/* 스크롤 목표 위치를 위한 빈 div */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
