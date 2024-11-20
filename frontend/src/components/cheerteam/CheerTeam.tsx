import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";

const CheerTeam = () => {

  const nav = useNavigate()

  const onClick = () => {
    nav('/clubrecommend')
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <label className="font-kbogothicbold text-2xl text-gray-600 mb-5">
        어떤 팀을 응원하시나요?
      </label>
      <Button
        className="flex justify-center items-center w-[80%] h-10 mb-5 text-green-900 rounded-full border border-2 border-green-300"
        variant={BUTTON_VARIANTS.primaryWhite}
        children="나에게 맞는 팀 찾기"
        onClick={onClick}
      />
    </div>
  );
};

export default CheerTeam;
