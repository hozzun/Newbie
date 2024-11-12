import { useState } from "react";
import CrossCircle from "../../assets/icons/cross-circle.svg?react";

const CommuFreeCreate = () => {
  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [text, setText] = useState("");
  const [imageName, setImageName] = useState("");

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
      setImageName(e.target.files[0].name);
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

      <div className="relative w-full border-dashed border-2 border-gray-300 p-4 rounded-md flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <span className="text-gray-500 font-kbogothiclight">
          {imageName || "이미지를 첨부하려면 클릭하세요"}
        </span>
      </div>

      <div className="relative w-full mx-auto">
        <textarea
          name="본문"
          placeholder="본문을 입력해주세요."
          value={text}
          onChange={handleTextChange}
          className="w-full p-2 pb-14 border border-none font-kbogothiclight focus:outline-none focus:border-green-900 resize-none"
          rows={10} // 적절한 행 수 설정
        />
        {/* 글자 수 표시 */}
        <div className="absolute bottom-4 font-kbogothiclight right-6 text-xs text-gray-400">
          ( {text.length} / 1000 )
        </div>
      </div>
    </>
  );
};

export default CommuFreeCreate;
