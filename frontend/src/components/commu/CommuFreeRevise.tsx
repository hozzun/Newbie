import React, { ChangeEvent } from "react";
import CrossCircle from "../../assets/icons/cross-circle.svg?react";

interface CommuFreeReviseProps {
  titleValue: string;
  tagValue: string;
  text: string;
  tags: string[]
  image: string;
  errorMessage: string | null;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTagChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTagKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onTagRemove: (tag: string) => void;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClearTitle: () => void;
  onClearTag: () => void;
}

const CommuFreeRevise: React.FC<CommuFreeReviseProps> = ({
  titleValue,
  tagValue,
  text,
  tags,
  image,
  errorMessage,
  onTitleChange,
  onTagChange,
  onTagKeyPress,
  onTagRemove,
  onTextChange,
  onClearTitle,
  onClearTag,
}) => {

  return (
    <>
      {/* 제목 입력 */}
      <div className="relative w-full mx-auto">
        <input
          type="text"
          value={titleValue}
          onChange={onTitleChange}
          className="w-full pl-2 pr-12 py-4 border-b-2 font-kbogothiclight border-gray-100 focus:outline-none focus:border-green-900"
        />
        <CrossCircle
          onClick={onClearTitle}
          className={`absolute h-4 w-4 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
            titleValue ? "text-gray-500" : "text-gray-200"
          }`}
        />
      </div>

      {/* 태그 입력 및 보여주기 */}
      <div className="relative w-full mx-auto mb-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {tags && tags.map((tag: string, index: number) => (
            <span
              key={index}
              onClick={() => onTagRemove(tag)}
              className="inline-block px-2 py-1 text-sm font-kbogothiclight bg-gray-500 text-white rounded-lg cursor-pointer"
            >
              {tag}
              <CrossCircle className="ml-2 w-4 h-4 inline cursor-pointer" />
            </span>
          ))}
        </div>

        <div className="flex items-center w-full border-b-2 border-gray-100 focus-within:border-green-900">
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            value={tagValue}
            onKeyDown={onTagKeyPress}
            onChange={onTagChange}
            className="flex-1 pl-2 py-4 font-kbogothiclight focus:outline-none"
          />
          <CrossCircle
            onClick={onClearTag}
            className={`h-4 w-4 mr-2 cursor-pointer ${
              tagValue ? "text-gray-500" : "text-gray-200"
            }`}
          />
        </div>
        <span
          className={`absolute left-2 bottom-1 text-[9px] font-kbogothiclight ${errorMessage ? "text-red-400" : "text-gray-400"}`}
        >
          {errorMessage || "태그를 입력 후, 엔터를 입력하면 등록됩니다."}
        </span>
      </div>

      {/* 이미지 */}
      <div className="relative w-full p-4 border-b-2 border-gray-100 flex items-center justify-center mb-4">
        <div className="text-gray-500 font-kbogothiclight flex items-center border border-dashed rounded-lg justify-center w-20 h-20">
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      {/* 본문 입력 */}
      <div className="relative w-full mx-auto">
        <textarea
          name="본문"
          value={text}
          onChange={onTextChange}
          className="w-full p-2 pb-14 border border-none font-kbogothiclight focus:outline-none focus:border-green-900 resize-none"
          rows={10}
        />
        <div className="absolute bottom-4 font-kbogothiclight right-6 text-xs text-gray-400">
          ( {text.length} / 1000 )
        </div>
      </div>
    </>
  );
};

export default CommuFreeRevise;
