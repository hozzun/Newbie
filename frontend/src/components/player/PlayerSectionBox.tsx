import AngleLeft from "../../assets/icons/angle-left.svg?react";
import Heart from "../../assets/icons/heart-solid.svg?react";
import CircleButton from "../common/CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "../common/variants";

interface SectionBoxProps {
  label?: string;
  onClick?: () => void;
}

const PlayerSectionBox = ({ label, onClick }: SectionBoxProps) => {
  return (
    <div className="max-w-[600px] min-w-[320px] mx-auto flex items-center bg-white text-gray-700 font-kbogothicmedium w-full h-14">
      <AngleLeft className="w-5 h-5 text-gray-700 ml-3" onClick={onClick} />
      <label className="flex-grow text-center mr-3">{label}</label>
      <CircleButton
        className="w-9 h-9"
        variant={CIRCLE_BUTTON_VARIANTS.errorLine}
        item={{ img: Heart }}
      />
    </div>
  );
};

export default PlayerSectionBox;
