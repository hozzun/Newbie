import React, { useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  userId: number;
  sender: string;
  message: string;
  roomId: string;
  timestamp: string;
  type: "CHAT" | "JOIN" | "LEAVE";
  profileImageUrl?: string;
}

interface TeamChatMessagesProps {
  messages: ChatMessage[];
  currentUserId: number;
  userImage?: string;
}

const TeamChatMessages: React.FC<TeamChatMessagesProps> = ({
  messages,
  currentUserId,
  userImage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;

    return `${ampm} ${formattedHours}:${minutes}`;
  };

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg, index) => {
        if (msg.type === "JOIN" || msg.type === "LEAVE") {
          return (
            <div key={index} className="text-center text-gray-500 text-sm">
              <span>
                {msg.sender}
                {msg.message}
              </span>
            </div>
          );
        }

        const isCurrentUser = msg.userId === currentUserId;

        return (
          <div
            key={index}
            className={`flex items-end space-x-2 ${
              isCurrentUser ? "flex-row-reverse space-x-reverse" : "flex-row"
            }`}
          >
            {!isCurrentUser && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={userImage || "/default-profile.png"}
                  alt={msg.sender}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xs text-gray-500">{msg.sender}</span>
              </div>
            )}

            <div className="flex items-center">
              <div
                className={`font-kbogothiclight px-4 py-2 mx-1 rounded-2xl max-w-xs lg:max-w-md break-words ${
                  isCurrentUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
              <span
                className={`text-xs font-kbogothiclight text-gray-400 ${
                  isCurrentUser ? "text-right" : "text-left"
                }`}
              >
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default TeamChatMessages;
