import React, { useState } from 'react';
import { BUTTON_VARIANTS } from '../../components/common/variants'
import Button from "../../components/common/Button";
import SectionBox from "../../components/common/SectionBox";

interface InputMbtiProps {
  onOkClick: () => void;
}

const MBTI_TYPES = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 
  'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];

function InputMbti(props: InputMbtiProps) {

  const [mbti, setMbti] = useState('');
  const [isFocused, setIsFocused] = useState(false)
  const [okButtonVariant, setOkButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMbti(value);

    // 입력값이 비어있지 않고 MBTI 유형 배열에 포함되어 있는지 확인
    const isValidMbti = MBTI_TYPES.includes(value);
    setIsOkButtonDisabled(value.trim() === '' || !isValidMbti);
    setOkButtonVariant(BUTTON_VARIANTS.primary)
  };

  return (
    <>
      <SectionBox label="구단 추천" />
      <div className="flex justify-center items-center">
        <div className="flex-col">
          <div className="flex-row mt-10 mb-10">
            <label className="font-kbogothicbold text-2xl text-green-900">
              MBTI
            </label>
            <label className="font-kbogothiclight text-2xl text-gray-700">
              를 입력해주세요
            </label>
          </div>
          <input
            type="text"
            value={mbti}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            placeholder="대문자로 입력해주세요"
            className={`text-gray-700 font-kbogothiclight text-sm bg-white border ${isFocused ? 'border-green-900' : 'border-gray-300'} rounded px-2 h-10 ml-4 outline-none`} />
        </div>
        <Button className="flex justify-center items-center w-40 h-10 fixed bottom-10" variant={okButtonVariant} children="확인" onClick={props.onOkClick} disabled={isOkButtonDisabled} />
      </div>
    </>
  );
}

export default InputMbti;