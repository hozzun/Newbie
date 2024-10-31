type TextButtonWithUnderlineProps = {
  className?: string;
  children: React.ReactNode;
};

const TextButtonWithUnderline = (props: TextButtonWithUnderlineProps) => {
  const textButtonWithUnderlineClass = `${props.className || ""} px-2 py-0.5 text-xs rounded-lg hover:bg-gray-50 font-kbogothiclight underline`;

  return <button className={textButtonWithUnderlineClass}>{props.children}</button>;
};

export default TextButtonWithUnderline;
