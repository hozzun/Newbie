import React, { ChangeEvent } from "react";
import CrossCircle from "../../assets/icons/cross-circle.svg?react";
import Picture from "../../assets/icons/picture-solid.svg?react";

interface CommuTradeCreateProps {
  titleValue: string;
  priceValue: number | null;
  tagValue: string;
  tags: string[];
  text: string;
  images: File[];
  errorMessage: string | null;
  region: string;

  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTagChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTagKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onTagRemove: (tag: string) => void;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRegionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearTitle: () => void;
  onClearPrice: () => void;
  onClearTag: () => void;
  onImageRemove: (index: number) => void;
  onClearRegion: () => void;
}

const CommuTradeCreate: React.FC<CommuTradeCreateProps> = ({
  titleValue,
  priceValue,
  tagValue,
  tags,
  text,
  images,
  errorMessage,
  region,
  onTitleChange,
  onPriceChange,
  onTagChange,
  onTagKeyPress,
  onTagRemove,
  onTextChange,
  onImageChange,
  onClearTitle,
  onClearPrice,
  onClearTag,
  onImageRemove,
  onRegionChange,
  onClearRegion,
}) => {
  return (
    <>
      <div className="relative w-full mx-auto">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
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
      <div className="relative w-full mx-auto">
        <input
          type="number"
          placeholder="가격을 입력해주세요"
          value={priceValue !== null ? priceValue : ""}
          onChange={onPriceChange}
          className="w-full pl-2 pr-12 py-4 border-b-2 font-kbogothiclight border-gray-100 focus:outline-none focus:border-green-900"
        />
        <CrossCircle
          onClick={onClearPrice}
          className={`absolute h-4 w-4 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
            priceValue ? "text-gray-500" : "text-gray-200"
          }`}
        />
      </div>

      <div className="relative w-full mx-auto">
        <input
          type="text"
          placeholder="지역을 입력해주세요"
          value={region}
          onChange={onRegionChange}
          className="w-full pl-2 pr-12 py-4 border-b-2 font-kbogothiclight border-gray-100 focus:outline-none focus:border-green-900 mb-2"
        />
        <CrossCircle
          onClick={onClearRegion}
          className={`absolute h-4 w-4 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
            region ? "text-gray-500" : "text-gray-200"
          }`}
        />
      </div>

      <div className="relative w-full mx-auto mb-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              onClick={() => onTagRemove(tag)}
              className="inline-block px-2 py-1 text-sm font-kbogothiclight bg-gray-500 text-white rounded-lg"
            >
              {tag}
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
          className={`absolute left-2 bottom-1 text-[9px] ${errorMessage ? "text-red-400" : "text-gray-400"}`}
        >
          {errorMessage || "태그를 입력 후, 엔터를 입력하면 등록됩니다."}
        </span>
      </div>

      <div className="flex space-x-2 border-b-2 border-gray-100 pb-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <CrossCircle
              onClick={() => onImageRemove(index)}
              className="absolute w-6 h-6 top-1 right-1 bg-gray-700 text-white rounded-lg p-1"
            />
          </div>
        ))}
        <label className="w-20 h-20 border border-dashed border-gray-300 flex items-center justify-center cursor-pointer rounded-md">
          <Picture className="h-12 w-12 text-gray-500" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="relative w-full mx-auto">
        <textarea
          name="본문"
          placeholder="본문을 입력해주세요."
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

export default CommuTradeCreate;
