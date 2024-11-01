import { BUTTON_VARIANTS } from "./variants";

export interface ButtonProps {
  className?: string;
  variant: BUTTON_VARIANTS;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const buttonClass = `${props.className || ""} ${props.variant} px-6 py-4 text-base font-semibold rounded-lg disabled:bg-gray-200 disabled:text-gray-400 font-kbogothicmedium`;

  return <button className={buttonClass}>{props.children}</button>;
};

export default Button;