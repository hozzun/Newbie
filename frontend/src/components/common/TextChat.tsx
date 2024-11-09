import { Dispatch, SetStateAction } from "react";
import ArrowSmallUp from "../../assets/icons/arrow-small-up.svg?react";
import CircleButton, { CircleButtonItem } from "./CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "./variants";

interface Message {
  userId: number;
  message: string;
  roomId: string | null;
  timestamp: number;
}

interface TextChatProps {
  label?: string;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  messages: Message[];
  currentUserId: number;
  isLoading: boolean;
  error: string | null;
  connected: boolean;
}

const TextChat = ({
  label,
  onSendMessage,
  onKeyPress,
  comment,
  setComment,
  messages,
  currentUserId,
  isLoading,
  error,
  connected,
}: TextChatProps) => {
  const item: CircleButtonItem = {
    img: ArrowSmallUp,
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Connection Status */}
      <div
        className={`text-center text-sm py-1 ${connected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {connected ? "Connected" : "Disconnected"}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.userId === currentUserId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.userId === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="break-words">{msg.message}</div>
              <div
                className={`text-xs mt-1 ${
                  msg.userId === currentUserId ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {formatTimestamp(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white font-kbogothiclight rounded-t-2xl shadow-md w-full p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="bg-gray-100 text-gray-700 font-kbogothiclight placeholder-gray-300 text-sm pl-3 h-10 outline-none rounded-2xl flex-1"
            placeholder={label}
            value={comment}
            onChange={e => setComment(e.target.value)}
            onKeyPress={onKeyPress}
          />
          <CircleButton
            className="ml-3 w-10 h-10"
            variant={CIRCLE_BUTTON_VARIANTS.primarySolid}
            item={item}
            onClick={onSendMessage}
            disabled={!comment || !connected}
          />
        </div>
      </div>
    </div>
  );
};

export default TextChat;
