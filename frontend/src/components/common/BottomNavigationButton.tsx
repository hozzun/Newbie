import { useEffect, useState } from "react";
import CircleButton, { CircleButtonItem } from "./CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "./variants";

export interface BottomNavigationButtonItem {
  nonClickedImg: React.FC<React.SVGProps<SVGSVGElement>>;
  clickedImg: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
}

export interface BottomNavigationButtonProps {
  className?: string;
  item: BottomNavigationButtonItem;
  isClicked: boolean;
  onClick: () => void;
}

const BottomNavigationButton = (props: BottomNavigationButtonProps) => {
  const [isClicked, setIsClicked] = useState(props.isClicked);

  useEffect(() => {
    setIsClicked(props.isClicked);
  }, [props.isClicked]);

  const item: CircleButtonItem = {
    img: isClicked ? props.item.clickedImg : props.item.nonClickedImg,
    title: props.item.title,
    titleSize: 8,
  };

  return (
    <CircleButton
      className="w-12 h-12"
      variant={CIRCLE_BUTTON_VARIANTS.primaryLine}
      item={item}
      onClick={props.onClick}
    ></CircleButton>
  );
};

export default BottomNavigationButton;
