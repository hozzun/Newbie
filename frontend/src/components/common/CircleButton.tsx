import { CIRCLE_BUTTON_VARIANTS } from "./variants";

export interface CircleButtonItem {
  img: React.FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  titleSize?: number;
  color: string;
}

export interface CircleButtonProps {
  className?: string;
  variant: CIRCLE_BUTTON_VARIANTS;
  item: CircleButtonItem;
  disabled?: boolean;
  onClick?: () => void;
}

const CircleButton = (props: CircleButtonProps) => {
  const circleButtonClass = `${props.className || ""} ${props.variant} px-1 py-1 rounded-full items-center justify-center transition-colors`;
  const itemImgClass = props.disabled
    ? `w-[60%] h-[60%] text-gray-400`
    : `w-[60%] h-[60%] text-${props.item.color}`;
  const itemTitleClass = props.disabled
    ? `mt-1 text-gray-400 font-kbogothiclight`
    : `mt-1 text-${props.item.color} font-kbogothiclight`;
  const itemTitleStyle = { fontSize: `${props.item.titleSize}px` };

  return (
    <button className={circleButtonClass} disabled={props.disabled} onClick={props.onClick}>
      <div className="flex flex-col items-center justify-center">
        <props.item.img className={itemImgClass}></props.item.img>
        {props.item.title && (
          <p className={itemTitleClass} style={itemTitleStyle}>
            {props.item.title}
          </p>
        )}
      </div>
    </button>
  );
};

export default CircleButton;
