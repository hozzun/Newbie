type TextWithUnderlineButtonProps = {
  className?: string;
  children: React.ReactNode; // 버튼 텍스트
};

const TextWithUnderlineButton = (props: TextWithUnderlineButtonProps) => {
  const textButtonWithUnderlineClass = `${props.className || ""} px-2 py-0.5 text-xs rounded-lg hover:bg-gray-50 font-kbogothiclight underline`;

  return <button className={textButtonWithUnderlineClass}>{props.children}</button>;
};

export default TextWithUnderlineButton;
