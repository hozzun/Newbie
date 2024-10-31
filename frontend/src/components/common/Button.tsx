import { BUTTON_VARIANTS } from "./variants";

type ButtonProps = {
  className?: string;
  variant: BUTTON_VARIANTS;
  children: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  const buttonClass = `${props.className || ""} ${props.variant} text-base font-semibold rounded-lg disabled:bg-gray-200 disabled:text-gray-400 font-kbogothicmedium`;

  return <button className={buttonClass}>{props.children}</button>;
};

export default Button;
