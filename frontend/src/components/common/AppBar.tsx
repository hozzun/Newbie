import Logo from "../../assets/images/LOGO.png";
import Bell from "../../assets/icons/bell.svg?react";

const AppBar = () => {
  const onClick = () => {};

  return (
    <div className="max-w-[600px] min-w-[320px] mx-auto flex justify-between items-center bg-white font-kbogothiclight border-b border-l border-r border-gray-200 rounded-b-2xl w-full h-16">
      <img src={Logo} alt="로고" className="ml-3 mt-3 w-14 h-14" />
      <Bell className="w-6 h-6 text-green-900 mr-3 mt-3" onClick={onClick} />
    </div>
  );
};

export default AppBar;
