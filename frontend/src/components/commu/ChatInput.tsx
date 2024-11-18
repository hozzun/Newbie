import CircleButton, { CircleButtonItem } from "../common/CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "../common/variants";
import ArrowSmallUp from "../../assets/icons/arrow-small-up.svg?react";
import axiosInstance from "../../util/axiosInstance";
import { useState } from 'react';

interface ChatInputProps {
  boardId?: number;
}

const ChatInput = ({ boardId }: ChatInputProps) => {
  const [comment, setComment] = useState<string>("")

  const buttonItem: CircleButtonItem = {
    img: ArrowSmallUp,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const postComment = async () => {

    const commentBody = {
      boardId: boardId,
      content: comment
    };

    try {
      const response = await axiosInstance.post(`/api/v1/board/general-comment/${boardId}`, commentBody);
      return response.data
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div
      className="bg-white font-kbogothiclight rounded-t-2xl shadow-md w-full p-4 pb-8 fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[600px] min-w-[320px]"
      style={{
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={comment}
          onChange={handleChange}
          className="bg-gray-100 text-gray-700 font-kbogothiclight placeholder-gray-300 text-sm pl-3 h-10 outline-none rounded-2xl flex-1"
          placeholder="댓글을 입력하세요"
        />
        <CircleButton
          className="ml-3 w-10 h-10"
          variant={CIRCLE_BUTTON_VARIANTS.primarySolid}
          item={buttonItem}
          onClick={() => postComment()}
        />
      </div>
    </div>
  );
};

export default ChatInput;
