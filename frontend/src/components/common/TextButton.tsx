type TextButtonProps = {
  className?: string;
  children: React.ReactNode; // 버튼 텍스트
  onClick: () => void;
};

const TextButton = (props: TextButtonProps) => {
  const textButtonWithUnderlineClass = `${props.className || ""} px-2 py-0.5 text-xs rounded-lg hover:bg-gray-50 font-kbogothiclight`;

  return (
    <button className={textButtonWithUnderlineClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default TextButton;
