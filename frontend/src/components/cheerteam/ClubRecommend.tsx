import { useState } from "react";
import { BUTTON_VARIANTS } from "../../components/common/variants";
import Button from "../../components/common/Button";
import { Subway } from "../../util/ClubRecommendQuestion";

interface ClubRecommendProps {
  subway: Subway;
  onOkClick: () => void;
}

function ClubRecommend(props: ClubRecommendProps) {
  const [firstButtonVariant, setFirstButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [secondButtonVariant, setSecondButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [okButtonVariant, setOkButtonVariant] = useState(BUTTON_VARIANTS.second);
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState(true);

  // 첫 번째 선택지 클릭
  const handleFirstButtonClick = () => {
    setFirstButtonVariant(BUTTON_VARIANTS.primary); // 첫 번째 버튼을 primary로 변경
    setSecondButtonVariant(BUTTON_VARIANTS.second); // 두 번째 버튼은 second로 유지
    setOkButtonVariant(BUTTON_VARIANTS.primary);
    setIsOkButtonDisabled(false);
  };

  // 두 번째 선택지 클릭
  const handleSecondButtonClick = () => {
    setFirstButtonVariant(BUTTON_VARIANTS.second); // 첫 번째 버튼을 second로 유지
    setSecondButtonVariant(BUTTON_VARIANTS.primary); // 두 번째 버튼을 primary로 변경
    setOkButtonVariant(BUTTON_VARIANTS.primary);
    setIsOkButtonDisabled(false);
  };

  const handleOkButtonClick = () => {
    // 버튼 초기화
    setFirstButtonVariant(BUTTON_VARIANTS.second);
    setSecondButtonVariant(BUTTON_VARIANTS.second);
    setOkButtonVariant(BUTTON_VARIANTS.second);
    setIsOkButtonDisabled(false);
    props.onOkClick();
  };

  return (
    <>
      <label className="flex justify-center items-center font-kbogothicbold w-full text-2xl mt-10 mb-10">
        {props.subway.question}
      </label>
      <div className="flex flex-col justify-center items-center">
        <Button
          className="w-80 h-14 m-3"
          variant={firstButtonVariant}
          children={props.subway.select1}
          onClick={handleFirstButtonClick}
        />
        <Button
          className="w-80 h-14 m-3"
          variant={secondButtonVariant}
          children={props.subway.select2}
          onClick={handleSecondButtonClick}
        />
        <Button
          className="flex justify-center items-center w-40 h-10 fixed bottom-10"
          variant={okButtonVariant}
          children="확인"
          onClick={handleOkButtonClick}
          disabled={isOkButtonDisabled}
        />
      </div>
    </>
  );
}

export default ClubRecommend;
