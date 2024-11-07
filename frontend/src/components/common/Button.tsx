import { BUTTON_VARIANTS } from "./variants";

export interface ButtonProps {
  className?: string;
  variant: BUTTON_VARIANTS; // 버튼 종류
  children: React.ReactNode; // 버튼 텍스트
  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const buttonClass = `${props.className || ""} ${props.variant} text-base font-semibold disabled:bg-gray-200 disabled:text-gray-400 font-kbogothicmedium`;

  return (
    <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
