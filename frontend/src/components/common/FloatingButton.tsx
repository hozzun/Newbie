import { FLOATING_BUTTON_VARIANTS } from "./variants";

type FloatingButtonProps = {
  className?: string;
  variant: FLOATING_BUTTON_VARIANTS;
  children: React.ReactNode;
};

const FloatingButton = (props: FloatingButtonProps) => {
  const floatingButtonClass = `${props.className || ""} ${props.variant} fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors`;

  return <button className={floatingButtonClass}>{props.children}</button>;
};

export default FloatingButton;
