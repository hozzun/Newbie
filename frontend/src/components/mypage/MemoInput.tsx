import { useState } from 'react';
import Pencil from "../../assets/icons/pencil-solid.svg?react";

interface MemoInputProps {
  memo?: string;
}

const MemoInput = (props: MemoInputProps) => {

  const [write, setWrite] = useState(props.memo)
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  // TODO: 메모 수정 시 수정 요청

  return (
    <div className="relative flex justify-center items-center">
      <div className="relative w-80">
        <input
          type="text"
          className="bg-gray-100 text-gray-700 font-kbogothicmedium w-full h-32 outline-none rounded-2xl p-3 pr-10 text-start align-top pt-3"
          value={write}
          onChange={(e) => setWrite(e.target.value)}
          disabled={isDisabled}
        />
        <Pencil
          className="absolute w-6 h-6 bottom-3 right-3 cursor-pointer" // input 안 오른쪽 하단에 위치
          onClick={() => setIsDisabled(!isDisabled)} // 클릭하면 input 활성화/비활성화 전환
        />
      </div>
    </div>
  );
};

export default MemoInput;
