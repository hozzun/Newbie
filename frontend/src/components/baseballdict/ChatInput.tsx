import React from "react";
import CircleButton, { CircleButtonItem } from "../common/CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "../common/variants";
import ArrowSmallUp from "../../assets/icons/arrow-small-up.svg?react";

interface ChatInputProps {
  onSendMessage: () => void;
  comment: string;
  setComment: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  comment,
  setComment,
  placeholder = "Type your message...",
  disabled = false,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const buttonItem: CircleButtonItem = {
    img: ArrowSmallUp,
  };

  return (
    <div
      className="bg-white font-kbogothiclight rounded-t-2xl shadow-md w-full p-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[600px] min-w-[320px]"
      style={{
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="bg-gray-100 text-gray-700 font-kbogothiclight placeholder-gray-300 text-sm pl-3 h-10 outline-none rounded-2xl flex-1"
          placeholder={placeholder}
          value={comment}
          onChange={e => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        <CircleButton
          className="ml-3 w-10 h-10"
          variant={CIRCLE_BUTTON_VARIANTS.primarySolid}
          item={buttonItem}
          onClick={onSendMessage}
          disabled={!comment || disabled}
        />
      </div>
    </div>
  );
};

export default ChatInput;
