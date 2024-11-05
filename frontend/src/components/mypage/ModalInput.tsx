import { useState } from 'react';

interface ModalInputProps {
  memo?: string;
}

const ModalInput = (props: ModalInputProps) => {
  const [write, setWrite] = useState(props.memo || "");
  const maxChars = 100;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= maxChars) {
      setWrite(inputText);
    }
  };

  return (
    <div className="relative flex justify-center items-center mb-5 font-kbogothicmedium">
      <div className="relative w-80">
        <textarea
          className="bg-white text-gray-700 w-full h-36 rounded-2xl p-3 resize-none outline-gray-200"
          value={write}
          placeholder="메모를 입력해주세요"
          onChange={handleChange}
        />

        <span
          className={`absolute bottom-3 right-3 text-sm ${
            write.length === maxChars ? "text-red-500" : "text-gray-400"
          }`}
        >
          {write.length} / {maxChars}
        </span>
      </div>
    </div>
  );
};

export default ModalInput;
