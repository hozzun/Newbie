import CircleButton, { CircleButtonProps } from "./CircleButton";

const FAB = (props: CircleButtonProps) => {
  const circleButtonClass = `${props.variant} fixed bottom-6 right-6 w-16 h-16 shadow-lg`;

  return (
    <CircleButton
      className={circleButtonClass}
      variant={props.variant}
      item={props.item}
      onClick={props.onClick}
    ></CircleButton>
  );
};

export default FAB;
