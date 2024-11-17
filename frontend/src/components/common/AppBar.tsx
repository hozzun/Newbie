import Logo from "../../assets/images/LOGO.png";
import Chat from "../../assets/icons/chat.svg?react";

const AppBar = () => {
  const onClick = () => {};

  return (
    <div className="max-w-[600px] min-w-[320px] mx-auto flex justify-between items-center bg-white font-kbogothiclight border-b border-gray-200/50 w-full">
      <img src={Logo} alt="로고" className="ml-3 mt-3 w-14 h-14" />
      <Chat className="w-6 h-6 text-green-900 mr-3 mt-3" onClick={onClick} />
    </div>
  );
};

export default AppBar;
