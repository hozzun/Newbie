import { useRef, useEffect } from "react";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  roomId: string;
  timestamp: string;
  type: "CHAT" | "JOIN" | "LEAVE";
  profileImageUrl?: string;
}

interface TeamChatMessagesProps {
  messages: ChatMessage[];
  currentNickname: string;
  userImage?: string;
}

const TeamChatMessages = ({ messages, currentNickname, userImage }: TeamChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-4">
      {messages.map((msg, index) => {
        if (msg.type === "JOIN" || msg.type === "LEAVE") {
          return (
            <div key={msg.id || index} className="text-center text-gray-500 text-sm">
              {msg.message}
            </div>
          );
        }

        const isCurrentUser = msg.sender === currentNickname;

        return (
          <div
            key={msg.id || index}
            className={`flex items-center gap-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
          >
            {isCurrentUser ? (
              <>
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${msg.profileImageUrl || userImage || "/default-profile.png"})`,
                  }}
                />
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl font-kbogothiclight break-words ${
                    isCurrentUser ? "bg-green-900 text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {msg.message}
                </div>
                <div className="text-xs font-kbogothiclight text-gray-300 self-center">
                  {formatTimestamp(msg.timestamp)}
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${msg.profileImageUrl || userImage || "/default-profile.png"})`,
                  }}
                />
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl break-words ${
                    isCurrentUser ? "bg-green-900 text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {msg.message}
                </div>
                <div className="text-xs text-gray-300 self-center">
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

export default TeamChatMessages;
