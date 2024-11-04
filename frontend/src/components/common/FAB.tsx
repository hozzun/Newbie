import CircleButton, { CircleButtonProps } from "./CircleButton";

const FAB = (props: CircleButtonProps) => {
  const circleButtonClass = `${props.variant} fixed bottom-[72px] right-3 w-12 h-12 shadow-md`;

  return (
    <div className="w-full max-w-[600px] min-w-[320px] left-1/2 transform -translate-x-1/2 mx-auto justify-end items-center fixed bottom-0">
      <CircleButton
        className={circleButtonClass}
        variant={props.variant}
        item={props.item}
        onClick={props.onClick}
      ></CircleButton>
    </div>
  );
};

export default FAB;
