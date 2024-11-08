import { useState, useEffect } from "react";
import ReviseBox from "../../components/mypage/ReviseBox";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";

const ReviseInfo = () => {
  const INITIAL_NAME = "김미량";
  const INITIAL_ADDRESS = { si: "충청북도", gun: "청주시 서원구" };

  const [name, setName] = useState<string>(INITIAL_NAME);
  const [address, setAddress] = useState<{ si: string; gun: string }>(INITIAL_ADDRESS);
  const [disabled, setDisabled] = useState<boolean>(true);

  // 닉네임 변경 함수
  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  // 시, 구 변경 함수
  const handleSelectionChange = (si: string, gun: string) => {
    setAddress({ si, gun });
  };

  useEffect(() => {
    // 초기값과 다른지 확인 및 추가 조건 확인
    const isNameChanged = name && name !== INITIAL_NAME;
    const isAddressChanged = address.si && address.gun && (address.si !== INITIAL_ADDRESS.si || address.gun !== INITIAL_ADDRESS.gun);
    
    // 닉네임과 주소 둘 중 하나라도 변경되었을 경우 버튼 활성화
    setDisabled(!(isNameChanged || isAddressChanged));
  }, [name, address]);

  return (
    <>
      <ReviseBox
        onNameChange={handleNameChange}
        onSelectionChange={handleSelectionChange}
        name={INITIAL_NAME}
        placeholder1={INITIAL_ADDRESS.si}
        placeholder2={INITIAL_ADDRESS.gun}
      />
      <div className="flex justify-center items-center m-3">
        <Button
          className="w-[100%] mt-5"
          variant={BUTTON_VARIANTS.primary}
          children="저장하기"
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default ReviseInfo;
