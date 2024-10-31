import React from 'react';

interface BoxProps {
  label?: string;
}

const SectionBox: React.FC<BoxProps> = ({ label }) => {

  return (
    <div
      className="flex items-center justify-center bg-white text-gray-700 font-kbogothicmedium"
      style={{width: '390px', height: '56px'}}
    >
    {label}
    </div>
  );
};

export default SectionBox;
