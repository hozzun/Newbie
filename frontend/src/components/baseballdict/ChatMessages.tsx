import React, { useRef, useEffect } from "react";

interface Message {
  message: string;
  roomId: string | null;
  timestamp: number;
  content?: string;
  sender?: string;
}

interface ChatMessagesProps {
  messages: Message[];
  userImage?: string;
  aiImage?: string;
  sender?: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, userImage, aiImage }) => {
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
  const getMessage = (msg: Message) => {
    return msg.content || msg.message || "";
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-4">
      {messages.map((msg, index) => {
        const isUser = msg.sender !== "AI";

        return (
          <div
            key={index}
            className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {isUser ? (
              <>
                {/* Timestamp for user messages */}
                <div className="font-kbogothiclight text-xs text-gray-400 self-end mb-2">
                  {formatTimestamp(msg.timestamp)}
                </div>

                {/* Message bubble */}
                <div
                  className={`font-kbogothiclight max-w-[70%] px-4 py-2 rounded-2xl break-words ${
                    isUser ? "bg-green-900 text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {getMessage(msg)}
                </div>

                {/* Profile image */}
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: userImage ? `url(${userImage})` : "none",
                  }}
                />
              </>
            ) : (
              <>
                {/* Profile image */}
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: aiImage ? `url(${aiImage})` : "none",
                  }}
                />

                {/* Message bubble */}
                <div
                  className={`font-kbogothiclight max-w-[70%] px-4 py-2 rounded-2xl break-words ${
                    isUser ? "bg-green-900 text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {getMessage(msg)}
                </div>

                {/* Timestamp for AI messages */}
                <div className="font-kbogothiclight text-xs text-gray-400 self-end mb-2">
                  {formatTimestamp(msg.timestamp)}
                </div>
              </>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
