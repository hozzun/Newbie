import { useState } from 'react';

interface NameBoxProps {
  label?: string;
}

const NameBox = ({ label }: NameBoxProps) => {
  const [name, setName] = useState('');

  return (
    <div className='flex flex-col justify-center m-3'>
      <label 
      className='text-gray-500 font-kbogothicmedium text-sm mb-1 ml-2'>{label}</label>
      <input
        type="text"
        className="text-gray-700 font-kbogothiclight text-sm border border-green-900 pl-3 rounded-lg outline-none w-full h-14"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default NameBox;
