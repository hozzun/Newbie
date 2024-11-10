import { useState } from 'react';
import { BUTTON_VARIANTS } from '../../components/common/variants';
import Button from "../../components/common/Button";

interface InputMbtiProps {
  onOkClick: (writeMbti: string) => void;
}

const MBTI_OPTIONS = [
  ['E', 'I'],
  ['S', 'N'],
  ['F', 'T'],
  ['J', 'P']
];

function InputMbti(props: InputMbtiProps) {
  const [selectedOptions, setSelectedOptions] = useState<{ E: string; S: string; F: string; J: string }>({ E: '', S: '', F: '', J: '' });
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState(true);

  const handleOptionClick = (category: keyof typeof selectedOptions, option: string) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [category]: option };
      const isAllSelected = Object.values(updatedOptions).every(value => value);
      setIsOkButtonDisabled(!isAllSelected); // 모든 항목이 선택되면 버튼 활성화
      return updatedOptions;
    });
  };

  const OkClick = () => {
    const mbti = Object.values(selectedOptions).join('');
    if (mbti.length === 4) {
      props.onOkClick(mbti);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex-col mb-6">
        <div className="flex-row mx-10 my-10">
          <label className="font-kbogothicbold text-2xl text-green-900">
            MBTI
          </label>
          <label className="font-kbogothiclight text-2xl text-gray-700">
            를 선택해주세요
          </label>
        </div>

        {MBTI_OPTIONS.map((options, index) => (
          <div key={index} className="flex justify-center mb-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(options[0] as keyof typeof selectedOptions, option)}
                className={`px-4 py-2 mx-2 rounded-2xl w-32 font-kbogothicmedium ${
                  selectedOptions[options[0] as keyof typeof selectedOptions] === option
                    ? 'bg-green-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>

      <Button
        className="flex justify-center items-center w-40 h-10 fixed bottom-10"
        variant={isOkButtonDisabled ? BUTTON_VARIANTS.second : BUTTON_VARIANTS.primary}
        children="확인"
        onClick={OkClick}
        disabled={isOkButtonDisabled}
      />
    </div>
  );
}

export default InputMbti;
