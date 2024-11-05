import { useState } from 'react';
import Pencil from "../../assets/icons/pencil-solid.svg?react";

interface MemoInputProps {
  memo?: string;
}

const MemoInput = (props: MemoInputProps) => {
  const [write, setWrite] = useState(props.memo);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  return (
    <div className="relative flex justify-center items-center">
      <div className="relative w-80">
        <textarea
          className={`bg-gray-100 text-gray-700 font-kbogothicmedium w-full h-32 rounded-2xl p-3 resize-none ${isDisabled ? 'outline-none' : 'outline-gray-200'}`}
          value={write}
          placeholder='메모를 입력해주세요'
          onChange={(e) => setWrite(e.target.value)}
          disabled={isDisabled}
        />
        <Pencil
          className="absolute w-6 h-6 bottom-3 right-3 cursor-pointer"
          onClick={() => setIsDisabled(!isDisabled)} // 클릭 시 활성화/비활성화 전환
        />
      </div>
    </div>
  );
};

export default MemoInput;
