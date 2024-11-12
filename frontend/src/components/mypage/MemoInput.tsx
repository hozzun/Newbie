import { useState } from 'react';

interface MemoInputProps {
  memo?: string;
  onModifyChange: (modified: boolean) => void;
}

const MemoInput = (props: MemoInputProps) => {
  const [write, setWrite] = useState(props.memo || "");
  const maxChars = 100;

  // 텍스트 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= maxChars) {
      setWrite(inputText);
      props.onModifyChange(true);
    }
  };


  return (
    <>
      <div className="relative flex justify-center items-center">
        <div className="relative w-80">
          <textarea
            className="bg-gray-100 text-gray-600 font-kbogothicmedium w-full h-36 rounded-2xl p-3 resize-none"
            value={write}
            placeholder="메모를 입력해주세요"
            onChange={handleChange}
          />
          <span
            className={`absolute bottom-3 right-3 text-sm ${
              write.length === maxChars ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {write.length} / {maxChars}
          </span>
        </div>
      </div>
    </>
  );
};

export default MemoInput;
