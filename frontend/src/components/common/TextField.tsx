import { useState } from 'react';
import UserSolid from "../../assets/icons/user-solid.svg?react";

interface NameBoxProps {
  label?: string;
}

const NameBox = ({ label }: NameBoxProps) => {

  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col justify-center m-3">
      {label && (
        <label className="text-gray-500 font-kbogothicmedium text-sm mb-1 ml-2">{label}</label>
      )}
      <div className={`flex items-center border ${isFocused ? 'border-green-900' : 'border-gray-300'} rounded-lg w-full h-14`}>
        <UserSolid className={`w-6 h-6 ${isFocused ? 'text-green-900' : 'text-gray-300'} ml-3`} />
        <input
          type="text"
          className="text-gray-700 font-kbogothiclight text-sm pl-3 outline-none w-full h-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)} 
          placeholder="이름을 입력해주세요"
        />
      </div>
    </div>
  );
};

export default NameBox;
