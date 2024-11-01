import Logo from '../../assets/images/LOGO.png'

const AppBar = () => {

  return (
    <div className="flex items-center bg-white font-kbogothiclight border-b border-l border-r border-gray-200 rounded-b-2xl w-full h-16">
    <img
        src={Logo}
        alt="로고"
        className='ml-3 mt-3 w-14 h-14'
      />
    </div>
  );
};

export default AppBar;
