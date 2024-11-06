import { useState } from 'react';
import Pencil from "../../assets/icons/pencil-solid.svg?react";

interface MemoInputProps {
  memo?: string;
}

const MemoInput = (props: MemoInputProps) => {
  const [write, setWrite] = useState(props.memo || "");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const maxChars = 100;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    // 최대 글자 제한 (100자)
    if (inputText.length <= maxChars) {
      setWrite(inputText);
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <div className="relative w-80">
        <textarea
          className={`bg-gray-100 text-gray-700 font-kbogothicmedium w-full h-36 rounded-2xl p-3 resize-none ${isDisabled ? 'outline-none' : 'outline-gray-200'}`}
          value={write}
          placeholder="메모를 입력해주세요"
          onChange={handleChange}
          disabled={isDisabled}
        />
        <Pencil
          className="absolute w-6 h-6 bottom-3 right-3 cursor-pointer"
          onClick={() => setIsDisabled(!isDisabled)}
        />

        <span
          className={`absolute bottom-3 right-12 text-sm ${
            write.length === maxChars ? "text-red-500" : "text-gray-400"
          }`}
        >
          {write.length} / {maxChars}
        </span>
      </div>
    </div>
  );
};

export default MemoInput;
