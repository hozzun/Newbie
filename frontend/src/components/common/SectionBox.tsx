import AngleLeft from "../../assets/icons/angle-left.svg?react";
import CircleButton, { CircleButtonProps } from "./CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "./variants";

interface SectionBoxProps {
  label?: string;
  onBackClick?: () => void;
  rightButton?: CircleButtonProps;
}

const SectionBox = (props: SectionBoxProps) => {
  return (
    <div className="max-w-[600px] min-w-[320px] mx-auto flex flex-row justify-between items-center bg-white text-gray-700 font-kbogothicmedium w-full h-14">
      <CircleButton
        className="w-9 h-9"
        variant={CIRCLE_BUTTON_VARIANTS.grayLine}
        item={{ img: AngleLeft }}
        onClick={props.onBackClick}
      />
      <label className="text-center">{props.label}</label>
      {props.rightButton ? <CircleButton {...props.rightButton} /> : <div className="w-9 h-9" />}
    </div>
  );
};

export default SectionBox;
