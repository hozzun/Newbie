import { useState } from "react";
import CrossCircle from "../../assets/icons/cross-circle.svg?react";
import Picture from "../../assets/icons/picture-solid.svg?react";

const CommuFreeCreate = () => {
  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 1000) {
      setText(inputText);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file)); // 이미지 미리보기 URL 생성
    }
  };

  return (
    <>
      <div className="relative w-full mx-auto">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={titleValue}
          onChange={handleTitleChange}
          className="w-full pl-2 pr-12 py-4 border-b-2 font-kbogothiclight border-gray-100 focus:outline-none focus:border-green-900"
        />
        <CrossCircle
          className={`absolute h-4 w-4 right-2 top-1/2 transform -translate-y-1/2 ${
            titleValue ? "text-gray-500" : "text-gray-200"
          }`}
        />
      </div>

      <div className="relative w-full mx-auto">
        <input
          type="text"
          placeholder="태그를 입력해주세요"
          value={tagValue}
          onChange={handleTagChange}
          className="w-full pl-2 pr-12 py-6 border-b-2 font-kbogothiclight border-gray-100 focus:outline-none focus:border-green-900"
        />
        <span className="absolute left-2 bottom-2 text-[9px] text-gray-400">
          태그를 입력 후, 엔터를 입력하면 등록됩니다.
        </span>
        <CrossCircle
          className={`absolute h-4 w-4 right-2 top-1/2 transform -translate-y-1/2 ${
            tagValue ? "text-gray-500" : "text-gray-200"
          }`}
        />
      </div>

      <div className="relative w-full p-4 border-b-2 border-gray-100 flex items-center justify-center mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="text-gray-500 font-kbogothiclight flex items-center border border-dashed rounded-lg justify-center w-20 h-20">
          {image ? (
            <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
          ) : (
            <Picture className="w-20 h-20 p-2 text-gray-500" />
          )}
        </div>
      </div>

      <div className="relative w-full mx-auto">
        <textarea
          name="본문"
          placeholder="본문을 입력해주세요."
          value={text}
          onChange={handleTextChange}
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

export default CommuFreeCreate;
