import React from 'react';
import Logo from '../../assets/images/LOGO.png'

interface BoxProps {
  label?: string;
}

const TopBar: React.FC<BoxProps> = () => {

  return (
    <div
      className="flex items-center bg-white font-kbogothiclight border-b border-l border-r border-gray-200"
      style={{
        width: '392px',
        height: '70px',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
      }}
    >
    <img
        src={Logo}
        alt="로고"
        className='ml-3 mt-3'
        style={{width: '56px', height: '56px'}}
      />
    </div>
  );
};

export default TopBar;
