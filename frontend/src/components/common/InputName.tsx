import React, { useState } from 'react';

interface BoxProps {
  label?: string;
}

const NameBox: React.FC<BoxProps> = ({ label }) => {
  const [name, setName] = useState('');

  return (
    <div className='flex flex-col'>
      <label 
      className='text-gray-500 font-kbogothicmedium text-sm mb-1 ml-2'>{label}</label>
      <input
        type="text"
        className="text-gray-700 font-kbogothiclight text-sm border border-green-900 pl-3"
        style={{width: '342px', height: '60px', borderRadius: '16px', outline: 'none'}}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default NameBox;
