import { BUTTON_VARIANTS } from "./variants";

export interface ButtonProps {
  className?: string;
  variant: BUTTON_VARIANTS;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const buttonClass = `${props.className || ""} ${props.variant} px-6 text-base font-semibold disabled:bg-gray-200 disabled:text-gray-400 font-kbogothicmedium`;

  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
